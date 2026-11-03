import { Fragment } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { essayUrl, fmtMonth, relatedIn } from "@/content/essays";
import { isOutside, paperHref, papersForEssay, type Paper } from "@/content/papers";
import { SHELVES, substackSubscribe } from "@/config/site";
import { StarRule } from "@/components/site/Marks";
import { Prose } from "@/components/site/Prose";
import { essayQuery, essaysQuery } from "@/lib/essays.query";

export const Route = createFileRoute("/essays/$slug")({
  loader: async ({ params, context }) => {
    const [, essay] = await Promise.all([
      context.queryClient.ensureQueryData(essaysQuery),
      context.queryClient.ensureQueryData(essayQuery(params.slug)),
    ]);
    if (!essay) throw notFound();
    return { essay };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — The Reading Room" }, { name: "robots", content: "noindex" }] };
    const { essay } = loaderData;
    const url = essayUrl(essay);
    return {
      meta: [
        { title: `${essay.title} · The Reading Room` },
        { name: "description", content: essay.excerpt },
        { property: "og:title", content: essay.title },
        { property: "og:description", content: essay.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
    };
  },
  component: EssayPage,
});

const ext = { target: "_blank", rel: "noopener" } as const;

/** A paper on this site opens in place; one hosted elsewhere opens in a new tab. */
function PaperLink({ p, className, children }: { p: Paper; className?: string; children: React.ReactNode }) {
  const href = paperHref(p);
  if (isOutside(href)) return <a href={href} {...ext} className={className}>{children}</a>;
  return <Link to="/papers/$slug" params={{ slug: p.slug }} className={className}>{children}</Link>;
}

function EssayPage() {
  const { slug } = Route.useParams();
  const { data: essays } = useSuspenseQuery(essaysQuery);
  const { data: essay } = useSuspenseQuery(essayQuery(slug));
  if (!essay) throw notFound();
  const shelf = SHELVES.find((s) => s.slug === essay.shelf);
  if (!shelf) throw notFound();
  const further = relatedIn(essays, essay);
  const papers = papersForEssay(essay.slug);
  const substack = essayUrl(essay);
  return (
    <article>
      <header className="essay-head">
        <p className="crumbs">
          <Link to="/essays">Catalogue</Link>
          <span aria-hidden="true">/</span>
          <Link to="/shelves/$shelf" params={{ shelf: shelf.slug }}>{shelf.name}</Link>
          <span aria-hidden="true">/</span>
          <span className="tnum">RR · {essay.no}</span>
        </p>
        <h1>{essay.title}</h1>
        <p className="dek">{essay.dek}</p>
        <div className="credit"><span className="a">David Rees Brown</span><span className="c">with Claude</span></div>
        {papers.length > 0 && (
          <p className="paper-line">
            The full argument:{" "}
            {papers.map((p, i) => (
              <Fragment key={p.slug}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <PaperLink p={p}>{p.title} →</PaperLink>
              </Fragment>
            ))}
          </p>
        )}
        <div className="facts meta tnum">
          <span>{fmtMonth(essay.date, true)}</span>
          <span>{essay.readingMinutes} min read</span>
          <span>{shelf.name} shelf</span>
        </div>
      </header>
      <div className="wrap" style={{ maxWidth: "var(--reading-width)" }}><StarRule /></div>
      <div className="essay-body" style={{ marginTop: 48 }}>
        <Prose text={essay.body} />
        <div className="ask">
          <p className="label gold">Continue the conversation</p>
          <p>
            {substack
              ? "This essay is also published on Substack, where readers leave comments and new essays arrive by email."
              : "New essays are published on Substack, where readers leave comments and new essays arrive by email."}
          </p>
          <div className="actions">
            {substack && <a href={substack} {...ext} className="btn btn-primary">Discuss on Substack <span aria-hidden="true">↗</span></a>}
            <a href={substackSubscribe} {...ext} className={substack ? "btn btn-secondary" : "btn btn-primary"}>Subscribe free <span aria-hidden="true">↗</span></a>
            {papers[0] && (
              <PaperLink p={papers[0]} className="btn btn-secondary">
                Read the full paper <span aria-hidden="true">{isOutside(paperHref(papers[0])) ? "↗" : "→"}</span>
              </PaperLink>
            )}
          </div>
        </div>
      </div>
      <section className="further" aria-labelledby="fr-h">
        <h2 id="fr-h">Further reading from the shelves</h2>
        <ol>
          {further.map((e) => (
            <li key={e.slug}>
              <Link to="/essays/$slug" params={{ slug: e.slug }}>{e.title}</Link>
              <span className="meta">{SHELVES.find((s) => s.slug === e.shelf)?.name}</span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
