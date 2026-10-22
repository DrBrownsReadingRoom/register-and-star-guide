import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Catalogue, CatalogueTop } from "@/components/site/Catalogue";
import { essaysQuery } from "@/lib/essays.query";

export const Route = createFileRoute("/essays/")({
  validateSearch: (s: Record<string, unknown>): { focus?: number } => (s["focus"] ? { focus: 1 } : {}),
  head: () => ({
    meta: [
      { title: "The Catalogue — The Reading Room" },
      { name: "description", content: "Every essay in The Reading Room, searchable by title and filed by shelf." },
      { property: "og:title", content: "The Catalogue — The Reading Room" },
      { property: "og:description", content: "Every essay by David Rees Brown, catalogued and shelved." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(essaysQuery),
  component: EssaysPage,
});

function EssaysPage() {
  const { focus } = Route.useSearch();
  const { data: essays } = useSuspenseQuery(essaysQuery);
  return (
    <>
      <CatalogueTop />
      <Catalogue essays={essays} focusSearch={!!focus} />
    </>
  );
}
