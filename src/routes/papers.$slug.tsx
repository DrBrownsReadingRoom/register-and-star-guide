import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findIn, fmtMonth } from "@/content/essays";
import { findPaper } from "@/content/papers";
import { SHELVES } from "@/config/site";
import { StarRule } from "@/components/site/Marks";
import { inline, Prose } from "@/components/site/Prose";
import { essaysQuery, paperTextQuery } from "@/lib/essays.query";

export const Route = createFileRoute("/papers/$slug")({
  loader: async ({ params, context }) => {
    const paper = findPaper(params.slug);
    if (!paper) throw notFound();
    const [, text] = await Promise.all([
      context.queryClient.ensureQueryData(essaysQuery),
      context.queryClient.ensureQueryData(paperTextQuery(params.slug)),
    ]);
    if (!text) throw notFound();
    return { paper };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — The Reading Room" }, { name: "robots", content: "noindex" }] };
    const { paper } = loaderData;
    return {
      meta: [
        { title: `${paper.title} · Papers · The Reading Room` },
        { name: "description", content: paper.abstract },
        { property: "og:title", content: paper.title },
        { property: "og:description", content: paper.subtitle ?? paper.abstract },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PaperPage,
});

function PaperPage() {
  const { slug } = Route.useParams();
  const paper = findPaper(slug)!;
  const { data: essays } = useSuspenseQuery(essaysQuery);
  const { data: text } = useSuspenseQuery(paperTextQuery(slug));
  const backs = (paper.essaySlugs ?? []).map((s) => findIn(essays, s)).filter((e) => !!e);
  return (
    <article>
      <header className="essay-head">
        <p className="crumbs">
          <Link to="/papers">Papers</Link>
          <span aria-hidden="true">/</span>
          <span className="tnum">Paper {Number(paper.no)}</span>
        </p>
        <h1>{paper.title}</h1>
        {paper.subtitle && <p className="dek">{paper.subtitle}</p>}
        {paper.credit && <p className="paper-credit">{paper.credit}</p>}
        {paper.note && <p className="paper-line">{inline(paper.note)}</p>}
        <div className="facts meta tnum">
          {paper.kind && <span>{paper.kind}</span>}
          <span>{fmtMonth(paper.date, true)}</span>
          {paper.readingMinutes && <span>{paper.readingMinutes} min read</span>}
        </div>
      </header>
      <div className="wrap" style={{ maxWidth: "var(--reading-width)" }}><StarRule /></div>
      <div className="essay-body" style={{ marginTop: 48 }}>
        <Prose text={text ?? ""} quoteCite="From the paper" />
      </div>
      <section className="further" id="short-versions" aria-labelledby="sv-h">
        <h2 id="sv-h">{backs.length ? (backs.length === 1 ? "The short version" : "The short versions") : "More papers"}</h2>
        <ol>
          {backs.map((e) => (
            <li key={e.slug}>
              <Link to="/essays/$slug" params={{ slug: e.slug }}>{e.title}</Link>
              <span className="meta">{SHELVES.find((s) => s.slug === e.shelf)?.name}</span>
            </li>
          ))}
          <li>
            <Link to="/papers">All the papers</Link>
            <span className="meta">Papers</span>
          </li>
        </ol>
      </section>
    </article>
  );
}
