import { describe, expect, it } from "vitest";
import { PAPERS, paperForEssay, paperHref, papersForEssay, type Paper } from "@/content/papers";
import library from "@/content/library/papers.json";

const base = { no: "001", slug: "t", title: "T", abstract: "A", date: "2026-10-01" };

describe("papers", () => {
  it("holds all 21 papers from David's collection, numbered 001 to 021", () => {
    expect(PAPERS).toHaveLength(21);
    expect(PAPERS.map((p) => p.no)).toEqual(Array.from({ length: 21 }, (_, i) => String(i + 1).padStart(3, "0")));
    expect(PAPERS[0]!.title).toBe("Reality Exists, Knowledge Is Authored");
    expect(PAPERS[20]!.title).toBe("Danger Lurks in Empty Spaces");
  });

  it("has the full text of every listed paper", () => {
    const texts = library as Record<string, string>;
    for (const p of PAPERS) expect(texts[p.slug]?.length ?? 0).toBeGreaterThan(2000);
  });

  it("prefers the outside host, then a local pdf, then the paper's own page", () => {
    expect(paperHref({ ...base, url: "https://philpapers.org/x", pdf: "/papers/t.pdf" })).toBe("https://philpapers.org/x");
    expect(paperHref({ ...base, pdf: "/papers/t.pdf" } as Paper)).toBe("/papers/t.pdf");
    expect(paperHref(base as Paper)).toBe("/papers/t");
  });

  it("links an essay to every paper that backs it", () => {
    expect(papersForEssay("beyond-the-big-bang-a-point-in-time").map((p) => p.no)).toEqual(["002", "003", "006"]);
    expect(paperForEssay("the-accidental-eye")?.no).toBe("001");
    expect(paperForEssay("welcome-to-the-reading-room")).toBeUndefined();
  });
});
