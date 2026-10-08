import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About David Rees Brown — The Reading Room" },
      { name: "description", content: "About David Rees Brown, essayist, and how he writes with Claude." },
      { property: "og:title", content: "About David Rees Brown" },
      { property: "og:description", content: "The essayist behind The Reading Room." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageIntro label="About" title="About David">
      <p>A fuller portrait is being written. In the meantime, his author page is on Amazon.</p>
      <a href={SITE.amazonAuthor} target="_blank" rel="noopener" className="rr-btn rr-btn-secondary mt-8">
        Author page <span className="rr-arrow" aria-hidden="true">↗</span>
      </a>
    </PageIntro>
  );
}
