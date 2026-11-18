import { describe, expect, it } from "vitest";
import library from "@/content/library/essays.json";
import { PAPERS, papersForEssay } from "@/content/papers";
import { PENSAMIENTOS } from "@/content/pensamientos";
import { HIGHLIGHTS } from "@/content/highlights";
import { BOOKS } from "@/content/books";

describe("David's November 17 additions", () => {
  it("adds twelve essays without changing existing accession numbers", () => {
    expect(library.filter((e) => Number(e.no) >= 103).map((e) => e.no)).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i + 103)),
    );
    expect(library.find((e) => e.slug === "back-to-earth")?.no).toBe("092");
    expect(library.find((e) => e.slug === "the-emperors-old-clothes")?.no).toBe("114");
  });

  it("keeps Paper 25 omitted, as David confirmed", () => {
    expect(PAPERS.find((p) => p.no === "025")).toBeUndefined();
    expect(PAPERS.filter((p) => Number(p.no) > 22).map((p) => p.no)).toEqual(["023", "024", "026", "027", "028"]);
  });

  it("connects the new arguments to their short versions", () => {
    expect(papersForEssay("cest-la-vie").map((p) => p.no)).toEqual(["026"]);
    expect(papersForEssay("reality-always-wins").map((p) => p.no)).toEqual(["027"]);
    expect(papersForEssay("in-an-unfinished-universe").map((p) => p.no)).toEqual(["028"]);
  });

  it("adds 27 unique thoughts with valid source essays", () => {
    const added = PENSAMIENTOS.filter((p) => p.added === "2026-11-17");
    expect(added).toHaveLength(27);
    expect(new Set(PENSAMIENTOS.map((p) => p.text)).size).toBe(208);
    for (const line of added) {
      if (line.essaySlug) expect(library.some((e) => e.slug === line.essaySlug)).toBe(true);
    }
  });

  it("files each of the nine supplied highlights under a real essay", () => {
    expect(HIGHLIGHTS).toHaveLength(9);
    for (const entry of HIGHLIGHTS) expect(library.some((e) => e.slug === entry.slug)).toBe(true);
  });

  it("keeps all four proposed books unpublished", () => {
    expect(BOOKS.map((b) => b.title)).toEqual(["A Shoreline Without a Chart", "A Compass for the Voyage", "A Binary View of Reality", "The War Without End"]);
    expect(BOOKS.map((b) => b.status)).toEqual(Array(4).fill("in-preparation"));
    expect(BOOKS[2]?.statusLabel).toBe("Spring 2027");
  });
});