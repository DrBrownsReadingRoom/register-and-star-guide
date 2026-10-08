import { SITE } from "@/config/site";

export interface Book {
  title: string;
  subtitle: string;
  description: string;
  formats: string[];
  year: string;
  publisher: string;
  status: "available" | "forthcoming" | "in-preparation";
  amazonUrl?: string;
  kindleUrl?: string;
  coverImage?: string;
}

export const BOOKS: Book[] = [
  {
    title: "The Reading Room",
    subtitle: "Collected Essays, Volume One",
    description:
      "The essays from these shelves, gathered and revised into a single volume for readers who would rather turn pages. Short chapters, no mathematics, and plenty of questions to take to the pub. Placeholder description.",
    formats: ["Paperback", "Kindle"],
    year: "2026",
    publisher: "Independent",
    status: "available",
    amazonUrl: SITE.amazonBook,
    kindleUrl: SITE.amazonKindle,
  },
  {
    title: "A general-readership science book",
    subtitle: "",
    description:
      "A longer project built from the essays and a great deal of unpublished material: history at its heart, credit given to the giants whose ideas we inherited, and an argument that looking through different windows can still produce new science. Written by David, with Claude filling in the science.",
    formats: [],
    year: "",
    publisher: "",
    status: "in-preparation",
  },
];
