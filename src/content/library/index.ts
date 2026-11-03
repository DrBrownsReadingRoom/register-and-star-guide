import type { ShelfSlug } from "@/config/site";

/**
 * David's full collection, supplied as one file on 2026-11-03 (The_Reading_Room.html).
 *
 * essays.json holds every essay in that file and papers.json the full text of every
 * paper. Both are read on the server only, so the browser never downloads the whole
 * library at once. An essay that is also live on Substack is shown from Substack.
 */
export const LIBRARY_DATE = "2026-11-03";

export interface LibraryEssay {
  no: string;
  slug: string;
  title: string;
  dek: string;
  excerpt: string;
  shelf: ShelfSlug;
  readingMinutes: number;
  /** Same block format as every essay body (see src/components/site/Prose.tsx). */
  body: string;
}

export const loadLibraryEssays = async (): Promise<LibraryEssay[]> =>
  (await import("./essays.json")).default as LibraryEssay[];

export const loadPaperTexts = async (): Promise<Record<string, string>> =>
  (await import("./papers.json")).default as Record<string, string>;
