import { createServerFn } from "@tanstack/react-start";
import { ESSAYS, type Essay } from "@/content/essays";
import { DEFAULT_SHELF, ESSAY_META } from "@/content/essays.meta";
import { buildCatalogue } from "./essays.sync";
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
        const essays = buildCatalogue(await fetchFeed(), ESSAY_META, DEFAULT_SHELF);
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

/**
 * The catalogue the site shows: whatever is live on Substack right now, filed
 * with the overrides in src/content/essays.meta.ts. Falls back to the last good
 * read, and only then to the snapshot kept in src/content/essays.ts.
 */
export const getEssays = createServerFn({ method: "GET" }).handler(async (): Promise<Essay[]> => {
  try {
    return await loadEssays();
  } catch (err) {
    console.error("The Reading Room: Substack could not be read; serving the offline catalogue.", err);
    return ESSAYS;
  }
});
