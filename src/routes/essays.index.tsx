import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Catalogue } from "@/components/site/Catalogue";

export const Route = createFileRoute("/essays/")({
  validateSearch: (s: Record<string, unknown>): { focus?: number } => (s.focus ? { focus: 1 } : {}),
  head: () => ({
    meta: [
      { title: "The Catalogue — The Reading Room" },
      { name: "description", content: "Every essay in The Reading Room, searchable by title and shelf." },
      { property: "og:title", content: "The Catalogue — The Reading Room" },
      { property: "og:description", content: "Every essay by David Rees Brown, catalogued and shelved." },
    ],
  }),
  component: EssaysPage,
});

function EssaysPage() {
  const { focus } = Route.useSearch();
  return (
    <>
      <PageIntro label="Essays" title="The Catalogue" />
      <Catalogue focusSearch={!!focus} />
    </>
  );
}
