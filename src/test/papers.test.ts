import { describe, expect, it } from "vitest";
import { PAPERS, paperForEssay, paperHref, type Paper } from "@/content/papers";

describe("papers", () => {
  it("starts empty, so the header link stays hidden and the page shows its empty state", () => {
    expect(PAPERS).toEqual([]);
  });

  it("prefers the outside host over a local pdf", () => {
    const p: Paper = { no: "001", title: "T", abstract: "A", date: "2026-10-01", url: "https://philpapers.org/x", pdf: "/papers/t.pdf" };
    expect(paperHref(p)).toBe("https://philpapers.org/x");
    expect(paperHref({ ...p, url: undefined })).toBe("/papers/t.pdf");
    expect(paperHref({ ...p, url: undefined, pdf: undefined })).toBeUndefined();
  });

  it("finds the paper behind an essay by slug only", () => {
    expect(paperForEssay("welcome-to-the-reading-room")).toBeUndefined();
  });
});
