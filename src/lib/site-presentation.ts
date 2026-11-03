import { SHELVES } from "@/config/site";
import type { EssayCard } from "@/content/essays";
import type { Book } from "@/content/books";

export const populatedShelves = (essays: EssayCard[]) =>
  SHELVES.filter((shelf) => essays.some((essay) => essay.shelf === shelf.slug));

export const canPurchaseBook = (book: Book) => book.status === "available";