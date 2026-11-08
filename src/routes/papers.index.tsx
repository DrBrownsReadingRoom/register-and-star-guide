import { createFileRoute, Link } from "@tanstack/react-router";
import { PAPERS, doiLabel, isOutside, paperHref, type Paper } from "@/content/papers";
import { fmtMonth } from "@/content/essays";

export const Route = createFileRoute("/papers/")({
  head: () => ({
    meta: [
      { title: "Papers — The Reading Room" },
      { name: "description", content: "The full academic papers behind the essays of The Reading Room, for readers who want the whole case." },
      { property: "og:title", content: "Papers — The Reading Room" },
      { property: "og:description", content: "The full academic papers behind the essays of The Reading Room." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PapersPage,
});

const ext = { target: "_blank", rel: "noopener" } as const;

function PaperRow({ p }: { p: Paper }) {
  const href = paperHref(p);
  const outside = isOutside(href);
  const open = (label: React.ReactNode) =>
    outside ? <a href={href} {...ext}>{label}</a> : <Link to="/papers/$slug" params={{ slug: p.slug }}>{label}</Link>;
  const essays = p.essaySlugs ?? [];
  return (
    <li className="row has-no">
      <span className="no tnum">{p.no}</span>
      <div style={{ minWidth: 0 }}>
        <h2 className="row-title">{open(p.title)}</h2>
        {p.subtitle && <p className="row-sub">{p.subtitle}</p>}
        <p className="ex">{p.abstract}</p>
        <div className="links">
          {open(outside ? "Read the paper ↗" : "Read the paper →")}
          {p.doi && (
            <a href={p.doi} {...ext} className="doi">
              DOI {doiLabel(p.doi)} ↗
            </a>
          )}
          {essays.length === 1 && <Link to="/essays/$slug" params={{ slug: essays[0]! }}>The short version →</Link>}
          {essays.length > 1 && (
            <Link to="/papers/$slug" params={{ slug: p.slug }} hash="short-versions">
              The short versions ({essays.length}) →
            </Link>
          )}
        </div>
      </div>
      <div className="side">
        <span className="tnum">{fmtMonth(p.date)}</span>
        {p.readingMinutes && <span className="tnum">{p.readingMinutes} min read</span>}
      </div>
    </li>
  );
}

function PapersPage() {
  return (
    <>
      <div className="wrap page-top">
        <p className="label gold">Papers</p>
        <h1>The longer arguments</h1>
        <p>Each essay starts as a full paper. These are the papers, for readers who want the whole case.</p>
      </div>
      <div className="wrap" style={{ paddingBottom: 96 }}>
        <ol className="ledger">
          {PAPERS.map((p) => (
            <PaperRow key={p.no} p={p} />
          ))}
          {PAPERS.length === 0 && <li className="empty">The first papers are on their way.</li>}
        </ol>
      </div>
    </>
  );
}
