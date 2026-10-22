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
      "The essays from these shelves, gathered and revised into a single volume for readers who would rather turn pages. Short chapters, no mathematics, and plenty of questions to take to the pub.",
    formats: ["Paperback", "Kindle"],
    year: "2026",
    publisher: "Independent",
    status: "in-preparation",
  },
];
