import { describe, expect, it } from "vitest";

import { ESSAY_META, DEFAULT_SHELF } from "@/content/essays.meta";
import { essayUrl } from "@/content/essays";
import { LIBRARY_DATE, type LibraryEssay } from "@/content/library";
import libraryJson from "@/content/library/essays.json";
import { buildFullCatalogue, type FeedItem } from "@/lib/essays.sync";

const library = libraryJson as LibraryEssay[];

const post = (slug: string, title: string, date: string): FeedItem => ({
  slug,
  title,
  date,
  url: `https://davidrbrown1.substack.com/p/${slug}`,
  description: "",
  html: "<p>From Substack.</p>",
});

const FEED = [
  post("welcome-to-the-reading-room", "Welcome to the Reading Room", "2026-10-07"),
  post("too-much-of-a-good-thing", "Too Much of a Good Thing", "2026-10-01"),
];

describe("David's collection on the site", () => {
  const all = buildFullCatalogue(FEED, ESSAY_META, library, DEFAULT_SHELF);
  const bySlug = new Map(all.map((e) => [e.slug, e]));

  it("contains every essay from the file: 92 numbered essays The Road So Far and Nos. 93–97 (RR 095–099)", () => {
    expect(library).toHaveLength(101);
    expect(all).toHaveLength(102); // plus the welcome note from Substack
  });

  it("keeps the welcome note at 001 and Too Much of a Good Thing at 002, so the file's No. n is RR n+1", () => {
    expect(bySlug.get("welcome-to-the-reading-room")?.no).toBe("001");
    expect(bySlug.get("too-much-of-a-good-thing")?.no).toBe("002");
    expect(bySlug.get("the-cosmic-ledger")?.no).toBe("003");
    expect(bySlug.get("dont-get-your-hopes-up-just-yet")?.no).toBe("093");
    expect(bySlug.get("the-road-so-far")?.no).toBe("094");
    expect(new Set(all.map((e) => e.no)).size).toBe(all.length);
  });

  it("shows an essay that is on Substack from Substack, with its Substack link", () => {
    const t = bySlug.get("too-much-of-a-good-thing")!;
    expect(t.local).toBeUndefined();
    expect(t.body).toBe("From Substack.");
    expect(essayUrl(t)).toBe("https://davidrbrown1.substack.com/p/too-much-of-a-good-thing");
  });

  it("gives an essay that is only in the collection no Substack link", () => {
    const e = bySlug.get("the-cosmic-ledger")!;
    expect(e.local).toBe(true);
    expect(e.date).toBe(LIBRARY_DATE);
    expect(essayUrl(e)).toBeUndefined();
  });

  it("files a Substack post with a collection title under that essay's number, without a duplicate", () => {
    const later = buildFullCatalogue([...FEED, post("cosmic-ledger-2", "The Cosmic Ledger", "2026-12-01")], ESSAY_META, library, DEFAULT_SHELF);
    const ledgers = later.filter((e) => e.title === "The Cosmic Ledger");
    expect(ledgers).toHaveLength(1);
    expect(ledgers[0]!.no).toBe("003");
    expect(ledgers[0]!.slug).toBe("cosmic-ledger-2");
  });

  it("numbers a brand-new Substack post after the collection", () => {
    const later = buildFullCatalogue([...FEED, post("brand-new", "Brand New", "2026-12-01")], ESSAY_META, library, DEFAULT_SHELF);
    expect(later.find((e) => e.slug === "brand-new")?.no).toBe("103");
  });

  it("files every essay on one of the three shelves and keeps one featured piece", () => {
    for (const e of all) expect(["science", "philosophy", "reflections"]).toContain(e.shelf);
    expect(all.filter((e) => e.featured).map((e) => e.slug)).toEqual(["back-to-earth"]);
  });
});
