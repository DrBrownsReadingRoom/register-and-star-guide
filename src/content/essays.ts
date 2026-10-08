import { substackPost, type ShelfSlug } from "@/config/site";

export type Register = "evidence" | "inference" | "speculation";

export interface Essay {
  no: string; // accession number, "001"
  slug: string; // also the Substack post slug
  title: string;
  dek: string;
  excerpt: string;
  shelf: ShelfSlug;
  date: string; // ISO
  readingMinutes: number;
  register: Register[];
  featured?: boolean;
  sample?: boolean;
  substackUrl?: string;
  /** Blocks separated by blank lines. "## " = heading, "> " = pull quote,
   *  a leading [evidence] / [inference] / [speculation] adds a margin mark. */
  body: string;
  related?: string[];
}

export const ESSAYS: Essay[] = [
  {
    no: "001",
    slug: "a-quantum-conundrum",
    title: "A Quantum Conundrum",
    dek: "If matter is not material, what exactly is holding up the table?",
    excerpt: "If matter is not material, what exactly is holding up the table? A plain question about a complicated answer.",
    shelf: "science",
    date: "2026-10-08",
    readingMinutes: 9,
    register: ["evidence", "inference", "speculation"],
    featured: true,
    body: `[evidence] Ask a physicist what a chair is made of and you will be walked, politely, down a staircase. Wood becomes molecules, molecules become atoms, atoms become a nucleus and a cloud of electrons, and somewhere near the bottom step the word “particle” quietly turns into the word “field.” Sample text: replace with the essay.

[inference] At that point we are told that what we call solid is mostly empty, and that the emptiness is not empty either, but humming with probability. Each step is defended. The trouble is the destination. If every layer of the explanation is less material than the one above it, then the account we end up with does not describe stuff at all.

> You cannot build a table out of a probability, and nobody at the pub believes you can.

## The staircase and the floor

[speculation] Perhaps the problem is not the world but the staircase. A description can be useful, predictive, even beautiful, and still be a map that has forgotten the territory. That is the possibility this essay wants to sit with for a while.

None of this needs mathematics to follow. It needs a willingness to ask the plain question twice, and to notice when the answer changes the subject.`,
    related: ["who-paid-for-the-atom", "the-next-person-steps-to-the-line", "simple-things"],
  },
  {
    no: "002",
    slug: "who-paid-for-the-atom",
    title: "Who Paid for the Atom?",
    dek: "How the money shaped the questions. (sample)",
    excerpt: "How a wartime project turned physics into an industry, and what that did to the questions it was allowed to ask.",
    shelf: "philosophy",
    date: "2026-10-05",
    readingMinutes: 11,
    register: ["evidence", "inference"],
    sample: true,
    body: "Sample essay. The full text will be added here.",
  },
  {
    no: "003",
    slug: "the-next-person-steps-to-the-line",
    title: "The Next Person Steps to the Line",
    dek: "On the limits of a single life. (sample)",
    excerpt: "On the limits of a single life, and why that is the best reason there is to keep asking.",
    shelf: "reflections",
    date: "2026-09-20",
    readingMinutes: 6,
    register: ["inference", "speculation"],
    sample: true,
    body: "Sample essay. The full text will be added here.",
  },
  {
    no: "004",
    slug: "simple-things",
    title: "Reality Is Probably Simple",
    dek: "Complexity may belong to the explanation. (sample)",
    excerpt: "A case that complexity is often a property of the explanation, and sometimes of the people giving it.",
    shelf: "philosophy",
    date: "2026-09-08",
    readingMinutes: 8,
    register: ["inference", "speculation"],
    sample: true,
    body: "Sample essay. The full text will be added here.",
  },
  {
    no: "005",
    slug: "the-shape-of-nothing",
    title: "The Shape of Nothing",
    dek: "Is empty space really full? (sample)",
    excerpt: "Empty space is said to be full of activity. What would it take to believe that, and what would it take to doubt it?",
    shelf: "science",
    date: "2026-08-22",
    readingMinutes: 10,
    register: ["evidence", "speculation"],
    sample: true,
    body: "Sample essay. The full text will be added here.",
  },
  {
    no: "006",
    slug: "old-giants",
    title: "Standing on Old Giants",
    dek: "A note of thanks, and of warning. (sample)",
    excerpt: "Every new idea is built on someone else’s life’s work. A short note of thanks, and a short note of warning.",
    shelf: "reflections",
    date: "2026-08-10",
    readingMinutes: 7,
    register: ["evidence", "inference"],
    sample: true,
    body: "Sample essay. The full text will be added here.",
  },
];

export const byNewest = [...ESSAYS].sort((a, b) => b.date.localeCompare(a.date));
export const findEssay = (slug: string) => ESSAYS.find((e) => e.slug === slug);
export const featuredEssay = () => (ESSAYS.find((e) => e.featured) ?? byNewest[0])!;
export const essayUrl = (e: Essay) => e.substackUrl ?? substackPost(e.slug);
export const countOn = (shelf: ShelfSlug) => ESSAYS.filter((e) => e.shelf === shelf).length;
export const fmtMonth = (iso: string, long = false) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { month: long ? "long" : "short", year: "numeric", timeZone: "UTC" });

export function relatedTo(e: Essay): Essay[] {
  const picked = (e.related ?? []).map(findEssay).filter((x): x is Essay => !!x);
  const rest = byNewest.filter((x) => x.slug !== e.slug && !picked.includes(x));
  rest.sort((a, b) => Number(b.shelf === e.shelf) - Number(a.shelf === e.shelf));
  return [...picked, ...rest].slice(0, 3);
}
