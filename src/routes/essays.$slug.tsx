import type { ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { essayUrl, findIn, fmtMonth, relatedIn } from "@/content/essays";
import { SHELVES, substackSubscribe } from "@/config/site";
import { StarRule } from "@/components/site/Marks";
import { essaysQuery } from "@/lib/essays.query";

export const Route = createFileRoute("/essays/$slug")({
  loader: async ({ params, context }) => {
    const essays = await context.queryClient.ensureQueryData(essaysQuery);
    const essay = findIn(essays, params.slug);
    if (!essay) throw notFound();
    return { essay };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — The Reading Room" }, { name: "robots", content: "noindex" }] };
    const { essay } = loaderData;
    return {
      meta: [
        { title: `${essay.title} · The Reading Room` },
        { name: "description", content: essay.excerpt },
        { property: "og:title", content: essay.title },
        { property: "og:description", content: essay.excerpt },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: essayUrl(essay) }],
    };
  },
  component: EssayPage,
});

const ext = { target: "_blank", rel: "noopener" } as const;

const TOKEN = /\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)\s]+\)/g;

/** Bold, italic and links — the only marks an essay body is allowed to carry. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={at}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("_")) out.push(<em key={at}>{t.slice(1, -1)}</em>);
    else {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(t);
      if (link && /^https?:\/\//i.test(link[2]))
        out.push(
          <a key={at} href={link[2]} target="_blank" rel="noopener noreferrer">
            {link[1]}
          </a>,
        );
      else out.push(link ? link[1] : t);
    }
    last = at + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Body({ text }: { text: string }) {
  let first = true;
  return (
    <>
      {text.split(/\n\s*\n/).map((raw, i) => {
        const b = raw.trim();
        if (b.startsWith("## ")) return <h2 key={i}>{b.slice(3)}</h2>;
        if (b.startsWith("> "))
          return (
            <aside key={i} className="pull">
              “{b.slice(2)}”<cite>From the essay</cite>
            </aside>
          );
        const cls = first ? "first" : undefined;
        first = false;
        return (
          <p key={i} className={cls}>
            {inline(b)}
          </p>
        );
      })}
    </>
  );
}

function EssayPage() {
  const { essay } = Route.useLoaderData();
  const { data: essays } = useSuspenseQuery(essaysQuery);
  const shelf = SHELVES.find((s) => s.slug === essay.shelf)!;
  const further = relatedIn(essays, essay);
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
        <div className="facts meta tnum">
          <span>{fmtMonth(essay.date, true)}</span>
          <span>{essay.readingMinutes} min read</span>
          <span>{shelf.name} shelf</span>
        </div>
      </header>
      <div className="wrap" style={{ maxWidth: "var(--reading-width)" }}><StarRule /></div>
      <div className="essay-body" style={{ marginTop: 48 }}>
        <Body text={essay.body} />
        <div className="ask">
          <p className="label gold">Continue the conversation</p>
          <p>This essay is also published on Substack, where readers leave comments and new essays arrive by email.</p>
          <div className="actions">
            <a href={essayUrl(essay)} {...ext} className="btn btn-primary">Discuss on Substack <span aria-hidden="true">↗</span></a>
            <a href={substackSubscribe} {...ext} className="btn btn-secondary">Subscribe free <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <section className="further" aria-labelledby="fr-h">
        <h2 id="fr-h">Further reading from the shelves</h2>
        <ol>
          {further.map((e) => (
            <li key={e.slug}>
              <span className="label tnum">RR · {e.no}</span>
              <Link to="/essays/$slug" params={{ slug: e.slug }}>{e.title}</Link>
              <span className="meta">{SHELVES.find((s) => s.slug === e.shelf)!.name}</span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
