import { createFileRoute, notFound } from "@tanstack/react-router";
import { findEssay } from "@/content/essays";
import { substackPost } from "@/config/site";

export const Route = createFileRoute("/essays/$slug")({
  loader: ({ params }) => {
    const essay = findEssay(params.slug);
    if (!essay) throw notFound();
    return { essay };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — The Reading Room" }, { name: "robots", content: "noindex" }] };
    const { essay } = loaderData;
    return {
      meta: [
        { title: `${essay.title} — The Reading Room` },
        { name: "description", content: essay.dek },
        { property: "og:title", content: essay.title },
        { property: "og:description", content: essay.dek },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: EssayPage,
});

function EssayPage() {
  const { essay } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-[720px] px-6 py-20">
      <p className="rr-label text-goldInk">{essay.accession}</p>
      <h1 className="mt-4 text-[44px] sm:text-[68px]">{essay.title}</h1>
      <div className="mt-6 h-px w-24 bg-gold" aria-hidden="true" />
      <p className="mt-8 text-[21px] italic text-slate">{essay.dek}</p>
      <a href={substackPost(essay.slug)} target="_blank" rel="noopener" className="rr-btn rr-btn-primary mt-10">
        Read on Substack <span className="rr-arrow" aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
