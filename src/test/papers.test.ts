import { describe, expect, it } from "vitest";
import { PAPERS, doiLabel, findPaper, paperForEssay, paperHref, papersForEssay, type Paper } from "@/content/papers";
import library from "@/content/library/papers.json";

const base = { no: "001", slug: "t", title: "T", abstract: "A", date: "2026-10-01" };

describe("papers", () => {
  it("holds all 22 papers from David's collection, numbered 001 to 022", () => {
    expect(PAPERS).toHaveLength(22);
    expect(PAPERS.map((p) => p.no)).toEqual(Array.from({ length: 22 }, (_, i) => String(i + 1).padStart(3, "0")));
    expect(PAPERS[0]!.title).toBe("Reality Exists, Knowledge Is Authored");
    expect(PAPERS[21]!.title).toBe("Nothing to Understand");
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

  it("carries the Zenodo DOIs David registered, on papers 17, 19 and 21 only", () => {
    expect(PAPERS.filter((p) => p.doi).map((p) => p.no)).toEqual(["017", "019", "021"]);
    expect(findPaper("the-candle-and-the-bonfire")?.doi).toBe("https://doi.org/10.5281/zenodo.24056631");
    expect(findPaper("the-density-dial")?.doi).toBe("https://doi.org/10.5281/zenodo.24021491");
    expect(findPaper("danger-lurks-in-empty-spaces")?.doi).toBe("https://doi.org/10.5281/zenodo.24021618");
    expect(doiLabel("https://doi.org/10.5281/zenodo.24056631")).toBe("10.5281/zenodo.24056631");
  });

  it("links an essay to every paper that backs it", () => {
    expect(papersForEssay("beyond-the-big-bang-a-point-in-time").map((p) => p.no)).toEqual(["002", "003", "006"]);
    expect(paperForEssay("the-accidental-eye")?.no).toBe("001");
    expect(paperForEssay("welcome-to-the-reading-room")).toBeUndefined();
  });
});
