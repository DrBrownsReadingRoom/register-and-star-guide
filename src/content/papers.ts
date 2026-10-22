export interface Paper {
  no: string;
  title: string;
  abstract: string;
  date: string;
  /** An outside host such as PhilPapers. */
  url?: string;
  /** A file in /public/papers/. */
  pdf?: string;
  /** The essay that is this paper's short version. */
  essaySlug?: string;
}

/** The longer arguments behind the essays. Empty until the first papers arrive. */
export const PAPERS: Paper[] = [];

export const paperHref = (p: Paper) => p.url ?? p.pdf;

export const paperForEssay = (slug: string) => PAPERS.find((p) => p.essaySlug === slug);
