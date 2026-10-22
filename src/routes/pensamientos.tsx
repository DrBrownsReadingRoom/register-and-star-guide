import { createFileRoute, Link } from "@tanstack/react-router";
import { newestPensamientos } from "@/content/pensamientos";

export const Route = createFileRoute("/pensamientos")({
  head: () => ({
    meta: [
      { title: "Pensamientos — The Reading Room" },
      { name: "description", content: "David Rees Brown’s Pensamientos: lines worth keeping. Things to consider, not things to accept." },
      { property: "og:title", content: "Pensamientos — The Reading Room" },
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
        <p className="label gold">Pensamientos</p>
        <h1>Pensamientos</h1>
        <p>Lines worth keeping. Things to consider, not things to accept.</p>
      </div>
      <ol className="pensamientos-list">
        {newestPensamientos().map((line) => (
          <li key={line.no} className="pensamiento-row">
            <span className="pensamiento-no tnum">P · {line.no}</span>
            <div>
              <p className="pensamiento-text">{line.text}</p>
              {line.essaySlug && <Link to="/essays/$slug" params={{ slug: line.essaySlug }} className="pensamiento-link pensamiento-source">From the essay →</Link>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}