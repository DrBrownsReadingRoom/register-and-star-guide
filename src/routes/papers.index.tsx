import { createFileRoute, Link } from "@tanstack/react-router";
import { PAPERS, paperHref, type Paper } from "@/content/papers";
import { fmtMonth } from "@/content/essays";

export const Route = createFileRoute("/papers")({
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
  return (
    <li className="row has-no">
      <span className="no tnum">{p.no}</span>
      <div style={{ minWidth: 0 }}>
        <h2 className="row-title">{href ? <a href={href} {...ext}>{p.title}</a> : p.title}</h2>
        <p className="ex">{p.abstract}</p>
        <div className="links">
          {href && <a href={href} {...ext}>Read the paper ↗</a>}
          {p.essaySlug && <Link to="/essays/$slug" params={{ slug: p.essaySlug }}>The short version →</Link>}
        </div>
      </div>
      <div className="side">
        <span className="tnum">{fmtMonth(p.date)}</span>
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
      <div className="wrap">
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
