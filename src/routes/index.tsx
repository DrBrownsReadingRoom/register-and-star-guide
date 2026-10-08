import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Reading Room — Essays by David Rees Brown" },
      { name: "description", content: "A private reading room of essays on science, philosophy and reflection by David Rees Brown, with Claude." },
      { property: "og:title", content: "The Reading Room — Essays by David Rees Brown" },
      { property: "og:description", content: "Essays on science, philosophy and reflection, shelved for the curious reader." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageIntro label="The Room" title="A quiet room for difficult questions">
      <p>Essays on science, philosophy and the examined life. Take a chair; the shelves are open.</p>
      <Link to="/essays" className="rr-btn rr-btn-primary mt-8">
        Browse the catalogue <span className="rr-arrow" aria-hidden="true">→</span>
      </Link>
    </PageIntro>
  );
}
