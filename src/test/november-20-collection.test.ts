import { describe, expect, it } from "vitest";
import libraryJson from "@/content/library/essays.json";
import papersJson from "@/content/library/papers.json";
import type { LibraryEssay } from "@/content/library";
import { findPaper } from "@/content/papers";
import { PENSAMIENTOS } from "@/content/pensamientos";

const library = libraryJson as LibraryEssay[];
const bySlug = new Map(library.map((e) => [e.slug, e]));

describe("David's November 20 file", () => {
  it("adds his Nos. 113–115 as RR 115–117", () => {
    expect(bySlug.get("who-are-we-kidding")?.no).toBe("115");
    expect(bySlug.get("this-is-our-reality-like-it-or-not")?.no).toBe("116");
    expect(bySlug.get("the-great-escape")?.no).toBe("117");
  });
  it("adds Papers 29 and 30 with full texts, each backing its essay", () => {
    expect(findPaper("three-realms-without-escape")?.essaySlugs).toEqual(["this-is-our-reality-like-it-or-not"]);
    expect(findPaper("form-and-understanding")?.essaySlugs).toEqual(["the-great-escape"]);
    const texts = papersJson as Record<string, string>;
    expect(texts["three-realms-without-escape"]).toContain("## Abstract");
    expect(texts["form-and-understanding"]).toContain("## Abstract");
  });
  it("adds six thoughts as P · 209–214", () => {
    expect(PENSAMIENTOS.at(-1)?.no).toBe("214");
    expect(PENSAMIENTOS.find((p) => p.no === "209")?.essaySlug).toBe("who-are-we-kidding");
  });
  it("applies David's revised wording", () => {
    const all = library.map((e) => e.body).join("\n");
    expect(all).toContain("Protests and drones are the new weapons");
    expect(all).not.toContain("Riots and drones");
    expect(all).not.toContain("the surface, superbly");
  });
});
