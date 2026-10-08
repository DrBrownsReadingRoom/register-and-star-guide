import { createFileRoute, notFound } from "@tanstack/react-router";
import { SHELVES } from "@/config/site";
import { Catalogue, CatalogueTop } from "@/components/site/Catalogue";

export const Route = createFileRoute("/shelves/$shelf")({
  loader: ({ params }) => {
    const shelf = SHELVES.find((s) => s.slug === params.shelf);
    if (!shelf) throw notFound();
    return { shelf };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — The Reading Room" }, { name: "robots", content: "noindex" }] };
    const name = loaderData.shelf.name;
    return {
      meta: [
        { title: `${name} shelf — The Reading Room` },
        { name: "description", content: `Essays filed on the ${name} shelf, by David Rees Brown.` },
        { property: "og:title", content: `The ${name} shelf — The Reading Room` },
        { property: "og:description", content: `Essays shelved under ${name.toLowerCase()}.` },
      ],
    };
  },
  component: ShelfPage,
});

function ShelfPage() {
  const { shelf } = Route.useLoaderData();
  return (
    <>
      <CatalogueTop />
      <Catalogue shelf={shelf.slug} />
    </>
  );
}
