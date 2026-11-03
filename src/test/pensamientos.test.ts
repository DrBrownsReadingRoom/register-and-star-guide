import { describe, expect, it } from "vitest";
import { dailyPensamiento, newestPensamientos, PENSAMIENTOS } from "@/content/pensamientos";
import { findPaper } from "@/content/papers";

describe("Pensamientos", () => {
  it("holds all 158 lines from David's collection, numbered in the file's order", () => {
    expect(PENSAMIENTOS).toHaveLength(158);
    expect(PENSAMIENTOS[0]?.text).toBe("Intelligence should always be respected, no matter what form it comes in.");
    expect(PENSAMIENTOS[157]?.no).toBe("158");
    expect(PENSAMIENTOS[157]?.text).toBe("Not to be wise. To be made wise.");
  });

  it("points lines taken from a paper at that paper", () => {
    const line = PENSAMIENTOS.find((p) => p.text === "The genius is his. The century isn’t.");
    expect(line?.paperSlug).toBe("at-home-in-the-cosmos");
    expect(findPaper(line!.paperSlug!)).toBeDefined();
  });

  it("uses day of year modulo the collection size, identical throughout a UTC day", () => {
    expect(dailyPensamiento(new Date("2026-11-03T00:00:00Z"))?.no).toBe("150");
    expect(dailyPensamiento(new Date("2026-11-03T23:59:59Z"))?.no).toBe("150");
    expect(dailyPensamiento(new Date("2026-11-04T00:00:00Z"))?.no).toBe("151");
  });

  it("handles leap years and the new year", () => {
    expect(dailyPensamiento(new Date("2028-12-31T12:00:00Z"))?.no).toBe("051");
    expect(dailyPensamiento(new Date("2029-01-01T00:00:00Z"))?.no).toBe("002");
    expect(dailyPensamiento(new Date("2026-10-22"), [])).toBeUndefined();
  });

  it("orders newest first and keeps accession order for equal dates", () => {
    expect(newestPensamientos().slice(0, 3).map((line) => line.no)).toEqual(["158", "157", "156"]);
    const line = PENSAMIENTOS[0]!;
    expect(newestPensamientos([...PENSAMIENTOS, { ...line, no: "159", added: "2026-12-01" }])[0]?.no).toBe("159");
  });
});
