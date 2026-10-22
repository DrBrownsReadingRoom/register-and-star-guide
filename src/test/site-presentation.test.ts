import { describe, expect, it } from "vitest";
import { BOOKS } from "@/content/books";
import { ESSAYS } from "@/content/essays";
import { canPurchaseBook, populatedShelves } from "@/lib/site-presentation";

describe("publication and shelf availability", () => {
  it("keeps the unpublished book in preparation and unavailable for purchase", () => {
    expect(BOOKS[0]?.status).toBe("in-preparation");
    expect(BOOKS.map(canPurchaseBook)).toEqual([false]);
    const book = BOOKS[0];
    if (!book) throw new Error("Expected the Reading Room book");
    expect(canPurchaseBook({ ...book, status: "available" })).toBe(true);
  });

  it("hides any homepage shelf with zero essays", () => {
    expect(populatedShelves([])).toEqual([]);
    expect(populatedShelves(ESSAYS).map((shelf) => shelf.slug)).toEqual(["reflections"]);
    const essay = ESSAYS[0];
    if (!essay) throw new Error("Expected an essay");
    expect(populatedShelves([{ ...essay, shelf: "science" }]).map((shelf) => shelf.slug)).toEqual(["science"]);
  });
});