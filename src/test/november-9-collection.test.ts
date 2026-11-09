import { describe, expect, it } from "vitest";
import library from "@/content/library/essays.json";
import { PENSAMIENTOS } from "@/content/pensamientos";

describe("November 9 collection additions", () => {
  it.each([
    ["physics-didnt-do-it", "100", "philosophy"],
    ["its-not-the-economy-stupid-its-the-money", "101", "reflections"],
    ["nobody-chose-the-serpent", "102", "science"],
  ])("adds %s with a stable accession and shelf", (slug, no, shelf) => {
    const essay = library.find((entry) => entry.slug === slug);
    expect(essay?.no).toBe(no);
    expect(essay?.shelf).toBe(shelf);
    expect(essay?.body.length).toBeGreaterThan(2500);
  });

  it("adds five lines without duplicating or renumbering existing entries", () => {
    expect(PENSAMIENTOS.filter((line) => line.added === "2026-11-09").map((line) => line.no)).toEqual(["177", "178", "179", "180", "181"]);
    expect(new Set(PENSAMIENTOS.map((line) => line.no)).size).toBe(181);
    for (const no of ["177", "178", "181"]) {
      const line = PENSAMIENTOS.find((entry) => entry.no === no);
      expect(library.some((essay) => essay.slug === line?.essaySlug)).toBe(true);
    }
  });
});