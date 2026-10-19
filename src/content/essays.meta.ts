import type { EssayMeta } from "@/lib/essays.sync";

/**
 * Filing overrides for the live catalogue.
 *
 * The essays themselves are read from Substack. This file holds only what
 * Substack cannot tell us: which shelf a piece sits on, its accession number,
 * the teaser shown in the catalogue, whether it is the featured piece, and the
 * engraving kept for it. Anything left out falls back to a sensible default
 * (see src/lib/essays.sync.ts).
 *
 * A new post appears on the site the moment David publishes it; adding an entry
 * here is how it gets tidied up afterwards.
 */
export const ESSAY_META: Record<string, EssayMeta> = {
  "too-much-of-a-good-thing": {
    no: "002",
    shelf: "reflections",
    dek: "How social media, online news, and the First Amendment are killing democracy",
    excerpt:
      "A legal framework built for scarce information now shields an ecosystem that drowns us in it. Speech without accountability, amplification instead of discourse.",
    readingMinutes: 4,
    featured: true,
    plateArt: "waves",
    plate: "Waves breaking, one by one.",
    related: ["welcome-to-the-reading-room"],
  },
  "welcome-to-the-reading-room": {
    no: "001",
    shelf: "reflections",
    dek: "Opinion pieces, not proofs. Pull up a chair.",
    excerpt: "The doorway note: who writes these, how they get made, and what to expect. For the fans, not the players.",
    readingMinutes: 3,
    related: ["too-much-of-a-good-thing"],
  },
};

/** Where an essay goes until someone files it somewhere better. */
export const DEFAULT_SHELF = "reflections" as const;


export type { EssayMeta };
