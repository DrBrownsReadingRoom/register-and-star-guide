import { createFileRoute, Link } from "@tanstack/react-router";
import { newestPensamientos } from "@/content/pensamientos";
import { BRAIN_QUARKS_INTRO } from "@/content/highlights";

export const Route = createFileRoute("/pensamientos")({
  head: () => ({
    meta: [
      { title: "Brain Quarks — The Reading Room" },
      { name: "description", content: "David Rees Brown’s Brain Quarks: thoughts caught one at a time. Things to consider, not things to accept." },
      { property: "og:title", content: "Brain Quarks — The Reading Room" },
      { property: "og:description", content: "Lines worth keeping from David Rees Brown. Things to consider, not things to accept." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PensamientosPage,
});

function PensamientosPage() {
  return (
    <div className="wrap pensamientos-page">
      <div className="page-top">
        <p className="label gold">Brain Quarks</p>
        <h1>Brain Quarks</h1>
        <p>{BRAIN_QUARKS_INTRO}</p>
      </div>
      <ol className="pensamientos-list">
        {newestPensamientos().map((line) => (
          <li key={line.no} className="pensamiento-row">
            <span className="pensamiento-no tnum">P · {line.no}</span>
            <div>
              <p className="pensamiento-text">{line.text}</p>
              {line.essaySlug && <Link to="/essays/$slug" params={{ slug: line.essaySlug }} className="pensamiento-link pensamiento-source">From the essay →</Link>}
              {line.paperSlug && <Link to="/papers/$slug" params={{ slug: line.paperSlug }} className="pensamiento-link pensamiento-source">From the paper →</Link>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}