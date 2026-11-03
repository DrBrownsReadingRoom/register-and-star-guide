import { createServerFn } from "@tanstack/react-start";
import { ESSAYS, type Essay, type EssayCard } from "@/content/essays";
import { DEFAULT_SHELF, ESSAY_META } from "@/content/essays.meta";
import { loadLibraryEssays, loadPaperTexts } from "@/content/library";
import { buildFullCatalogue, libraryFiling, mergeLibrary } from "./essays.sync";
import { fetchFeed } from "./substack.server";

/** A post is worth re-reading within this window; after it, ask Substack again. */
const TTL = 5 * 60_000;

let cache: { at: number; essays: Essay[] } | null = null;
let inflight: Promise<Essay[]> | null = null;

async function loadEssays(): Promise<Essay[]> {
  if (cache && Date.now() - cache.at < TTL) return cache.essays;
  if (!inflight) {
    inflight = (async () => {
      try {
        const library = await loadLibraryEssays();
        const essays = buildFullCatalogue(await fetchFeed(), ESSAY_META, library, DEFAULT_SHELF);
        if (!essays.length) throw new Error("Substack's list held no posts");
        cache = { at: Date.now(), essays };
        return essays;
      } catch (err) {
        if (cache) return cache.essays; // a stale shelf beats an empty one
        throw err;
      } finally {
        inflight = null;
      }
    })();
  }
  return inflight;
}

/** Substack unreachable: the offline snapshot plus the whole collection. */
async function offline(): Promise<Essay[]> {
  const library = await loadLibraryEssays();
  return mergeLibrary(ESSAYS, library, libraryFiling([], ESSAY_META, library));
}

async function everyEssay(): Promise<Essay[]> {
  try {
    return await loadEssays();
  } catch (err) {
    console.error("The Reading Room: Substack could not be read; serving the offline catalogue.", err);
    return offline();
  }
}

const slugInput = (d: unknown) => {
  const slug = (d as { slug?: unknown } | null)?.slug;
  if (typeof slug !== "string" || !slug || slug.length > 200) throw new Error("A slug is required");
  return { slug };
};

/**
 * The catalogue the site shows: whatever is live on Substack right now plus David's
 * collection, filed with the overrides in src/content/essays.meta.ts. The text of each
 * essay is left out here and fetched one essay at a time by getEssay.
 */
export const getEssays = createServerFn({ method: "GET" }).handler(async (): Promise<EssayCard[]> =>
  (await everyEssay()).map(({ body: _body, ...card }) => card),
);

/** One essay with its text, or null if there is no such essay. */
export const getEssay = createServerFn({ method: "GET" })
  .validator(slugInput)
  .handler(async ({ data }): Promise<Essay | null> => (await everyEssay()).find((e) => e.slug === data.slug) ?? null);

/** The full text of one paper, or null if there is none. */
export const getPaperText = createServerFn({ method: "GET" })
  .validator(slugInput)
  .handler(async ({ data }): Promise<string | null> => (await loadPaperTexts())[data.slug] ?? null);
