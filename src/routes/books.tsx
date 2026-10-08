import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — The Reading Room" },
      { name: "description", content: "Books by David Rees Brown, available on Amazon in print and Kindle." },
      { property: "og:title", content: "Books by David Rees Brown" },
      { property: "og:description", content: "Print and Kindle editions, available on Amazon." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  return (
    <PageIntro label="Books" title="Bound volumes">
      <p>The longer arguments, gathered between covers.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={SITE.amazonBook} target="_blank" rel="noopener" className="rr-btn rr-btn-primary">
          Paperback on Amazon <span className="rr-arrow" aria-hidden="true">↗</span>
        </a>
        <a href={SITE.amazonKindle} target="_blank" rel="noopener" className="rr-btn rr-btn-secondary">
          Kindle edition <span className="rr-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </PageIntro>
  );
}
