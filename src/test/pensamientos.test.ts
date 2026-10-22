import { describe, expect, it } from "vitest";
import { dailyPensamiento, newestPensamientos, PENSAMIENTOS } from "@/content/pensamientos";

describe("Pensamientos selection", () => {
  it("uses day of year modulo eight, identical throughout a UTC day", () => {
    expect(dailyPensamiento(new Date("2026-10-22T00:00:00Z"))?.no).toBe("008");
    expect(dailyPensamiento(new Date("2026-10-22T23:59:59Z"))?.no).toBe("008");
    expect(dailyPensamiento(new Date("2026-10-23T00:00:00Z"))?.no).toBe("001");
  });
  it("handles leap years and the new year", () => {
    expect(dailyPensamiento(new Date("2028-12-31T12:00:00Z"))?.no).toBe("007");
    expect(dailyPensamiento(new Date("2029-01-01T00:00:00Z"))?.no).toBe("002");
    expect(dailyPensamiento(new Date("2026-10-22"), [])).toBeUndefined();
  });
  it("orders newest first and preserves accession order for equal dates", () => {
    expect(newestPensamientos().map((line) => line.no)).toEqual(["008", "007", "006", "005", "004", "003", "002", "001"]);
    const line = PENSAMIENTOS[0];
    if (!line) throw new Error("Missing first pensamiento");
    expect(newestPensamientos([...PENSAMIENTOS, { ...line, no: "009", added: "2026-10-21" }])[0]?.no).toBe("009");
  });
});