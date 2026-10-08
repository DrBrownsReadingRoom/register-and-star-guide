import type { ShelfSlug } from "@/config/site";

export type Essay = {
  slug: string;
  title: string;
  shelf: ShelfSlug;
  accession: string;
  date: string;
  dek: string;
};

// Essays are added here. Left empty until the real catalogue is supplied.
export const ESSAYS: Essay[] = [];

export const findEssay = (slug: string) => ESSAYS.find((e) => e.slug === slug);
