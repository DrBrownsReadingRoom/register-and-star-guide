import { LIBRARY_DATE } from "@/content/library";

export interface Paper {
  no: string;
  slug: string;
  title: string;
  subtitle?: string;
  /** "A proposal in natural philosophy", as David labels each paper. */
  kind?: string;
  abstract: string;
  /** How the paper is signed, e.g. "David Rees Brown, with Claude." */
  credit?: string;
  /** Any line David adds about where the paper sits (inline marks allowed). */
  note?: string;
  date: string;
  readingMinutes?: number;
  /** An outside host such as PhilPapers. */
  url?: string;
  /** A file in /public/papers/. */
  pdf?: string;
  /** The essays that are this paper's short versions. */
  essaySlugs?: string[];
}

/**
 * The longer arguments behind the essays. The full text of each paper lives in
 * src/content/library/papers.json (read on the server only, so these entries stay light).
 */
export const PAPERS: Paper[] = [
  {
    no: "001",
    slug: "reality-exists-knowledge-is-authored",
    title: "Reality Exists, Knowledge Is Authored",
    subtitle: "SOBs, Placeholders and the Existential Boundary",
    kind: "A proposal in natural philosophy",
    abstract: "We defend a position we summarize in five words: Reality exists; knowledge is authored. Against idealism, we hold that there is a world independent of any observer, which punishes us when we misjudge it.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 20,
    essaySlugs: ["the-accidental-eye", "what-a-twisted-circle", "sobs-and-placeholders", "the-universe-is-filled-with-questions", "did-we-create-the-universe", "the-wobble-that-created-a-universe", "off-the-transom", "reality-doesnt-have-a-choice-we-do", "you-are-here", "were-only-human"],
  },
  {
    no: "002",
    slug: "the-singular-field-space-as-a-material-medium",
    title: "The Singular Field: Space as a Material Medium",
    subtitle: "Eliminating the Need for Dark Matter and Spacetime",
    kind: "A proposal in natural philosophy",
    abstract: "We propose that space is a single material medium and that everything physics calls a particle or a field is a motion of that medium. The proposal is old in outline. It is the ether, taken one step further, so that matter is made of the medium and does not merely move through it.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 25,
    essaySlugs: ["the-stuff-between-the-stars", "cold-case", "a-new-home-for-quantum", "a-particle-now-a-wave-coming", "why-cant-we-understand-quantum-theory", "beyond-the-big-bang-a-point-in-time"],
  },
  {
    no: "003",
    slug: "two-the-primacy-of-pairs",
    title: "Two: The Primacy of Pairs",
    subtitle: "One Is What Didn't Bang. Two Is the First Thing That Did.",
    kind: "A proposal in natural philosophy",
    abstract: "At every scale we can observe, in matter, in living things and in thought, reality comes in pairs. We argue that this is not a coincidence of description but a feature of existence: two is the smallest number that can make a difference, and to exist is to be different from something. Charge comes in two kinds and always balances.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 15,
    essaySlugs: ["two", "you-are-not-me", "beyond-the-big-bang-a-point-in-time"],
  },
  {
    no: "004",
    slug: "what-black-hole-dense-objects-without-holes",
    title: "What Black Hole? Dense Objects Without Holes",
    subtitle: "Never Seen, Never Proven and Far from Convincing",
    kind: "A proposal in natural philosophy",
    abstract: "The objects at the centers of galaxies, and the remnants of the largest stars, are among the best-observed things in astronomy.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 15,
    essaySlugs: ["the-elephant-and-the-cat", "what-black-hole-are-we-talking-about"],
  },
  {
    no: "005",
    slug: "the-smooth-universe-is-an-assumption",
    title: "The Smooth Universe Is an Assumption",
    subtitle: "The Biggest Ghost on the Biggest Wall in Science",
    kind: "A proposal in natural philosophy",
    abstract: "Modern cosmology assumes that on the largest scales the universe is the same everywhere and in every direction. The assumption, called the cosmological principle, was not discovered.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 15,
    essaySlugs: ["random-order", "what-do-we-really-know", "is-the-universe-just-a-pile-of-sand"],
  },
  {
    no: "006",
    slug: "the-exhaust-stroke-cosmic-expansion-as-net-dispersal",
    title: "The Exhaust Stroke: Cosmic Expansion as Net Dispersal",
    subtitle: "Eliminating the Need for Dark Energy",
    kind: "A proposal in natural philosophy",
    abstract: "We propose that the accelerating expansion of the universe needs no dark energy. It is the residue of a recycling process with two strokes. In the dispersal stroke, which thermodynamics records as rising entropy, bound matter is broken down and released as radiation, outflows and decay products.",
    credit: "David Rees Brown, with Claude.",
    note: "Also the groundwork for a forthcoming essay on entropy and gravity.",
    date: LIBRARY_DATE,
    readingMinutes: 25,
    essaySlugs: ["why-cant-we-understand-quantum-theory", "beyond-the-big-bang-a-point-in-time"],
  },
  {
    no: "007",
    slug: "for-its-own-sake-or-for-ours",
    title: "For Its Own Sake, or for Ours?",
    subtitle: "Science, Its Institutions and the People Who Pay",
    kind: "A proposal in natural philosophy",
    abstract: "Ask what science is for and two answers come back. The older one, which we call the pack’s answer, holds that knowledge is the first line of defense, the sword and shield of survival, aimed at shelter, nutrition and connection.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 20,
    essaySlugs: ["nouns-cant-do-a-verbs-work", "false-in-one", "the-smart-insiders-trap", "an-idea-not-a-discovery", "the-paradox-of-science", "two-sets-of-books", "fewer-hammers-more-thinkers", "did-math-destroy-philosophy", "for-its-own-sake-or-for-ours"],
  },
  {
    no: "008",
    slug: "a-bottom-line",
    title: "A Bottom Line",
    subtitle: "If We Can't See the Whole, We Can't Really Understand the Parts",
    kind: "A proposal in natural philosophy",
    abstract: "We argue that the parts of Reality cannot be fully understood without the whole, and that the whole cannot be seen from inside. A car is known by what it does on the highway, not by its twenty-five thousand components; you cannot deduce a car from rebuilding a carburetor. Physics has spent a century rebuilding carburetors.",
    credit: "David Rees Brown, with Claude.",
    note: "The capstone: it pulls Papers 1 to 7 together, from the whole down to the particle.",
    date: LIBRARY_DATE,
    readingMinutes: 15,
    essaySlugs: ["the-eye-of-a-quark"],
  },
  {
    no: "009",
    slug: "this-or-nothing",
    title: "This or Nothing",
    subtitle: "Rereading the Garden: The Knowledge of Death and Life's First Priority",
    kind: "A proposal in natural philosophy",
    abstract: "The story of the Garden of Eden has been read for millennia as a story about knowledge: a forbidden tree, a fatal curiosity and a punishment for wanting to know. We argue that this is an incomplete reading. The text, read with attention to its own words, is about one particular knowledge, the knowledge of death.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 18,
    essaySlugs: ["this-isnt-the-garden-of-eden", "this-or-nothing"],
  },
  {
    no: "010",
    slug: "the-awakening",
    title: "The Awakening",
    subtitle: "Insignificance and Uniqueness: Humanity's Special Place in the Story of Existence",
    kind: "A proposal in natural philosophy",
    abstract: "In This or Nothing we read the Garden of Eden as the moment a living creature learned that it would die. This paper follows that knowledge to its farthest reach and finds that it turns. The fuel always runs out. Every star burns down, and the recycling engine we described in The Exhaust Stroke leaks a little on every turn.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 16,
    essaySlugs: ["the-awakening"],
  },
  {
    no: "011",
    slug: "two-faces-of-reality",
    title: "Two Faces of Reality",
    subtitle: "Cosmic and Cognitive, Material and Ephemeral, Objective and Subjective",
    kind: "A proposal in natural philosophy",
    abstract: "We argue that Reality is one coin with two faces. One face is cosmic, material and objective: the given, which lasts billions of years and knows nothing. The other is cognitive, ephemeral and subjective: the known, which is the only place Reality is ever known, and which dies first.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 16,
    essaySlugs: ["two-faces-of-reality"],
  },
  {
    no: "012",
    slug: "the-sister-universe",
    title: "The Sister Universe",
    subtitle: "What If the Result Has Another Half? A Thought Exercise in Duality",
    kind: "A thought exercise in natural philosophy",
    abstract: "This paper is a thought exercise. Its subject lies past our operational horizon, and nothing in it can be observed directly. It is offered as a what-if, and labeled as one.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 14,
    essaySlugs: ["the-sister-universe"],
  },
  {
    no: "013",
    slug: "the-galactic-accumulator",
    title: "The Galactic Accumulator",
    subtitle: "Store and Release at the Centers of Galaxies",
    kind: "A proposal in natural philosophy",
    abstract: "In What Black Hole? we argued that the dense objects called black holes have no hole: they are the densest concentrations of matter in nature, gathering mass and heat. This paper makes the positive case for the largest of them.",
    credit: "David Rees Brown, with Claude.",
    note: "The positive case that follows Paper 4.",
    date: LIBRARY_DATE,
    readingMinutes: 19,
    essaySlugs: ["the-galactic-accumulator"],
  },
  {
    no: "014",
    slug: "motion-and-friction",
    title: "Motion and Friction",
    subtitle: "Entropy Is the Score, Not the Player",
    kind: "A proposal in natural philosophy",
    abstract: "Entropy is often spoken of as if it did things: as if it drove the arrow of time, pulled the universe toward its end, even pushed and pulled like a force. We argue that this mistakes a measure for a process. Entropy is the name for a result, the amount by which energy has been spread out. It does nothing.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 16,
    essaySlugs: ["motion-and-friction"],
  },
  {
    no: "015",
    slug: "gravity-has-no-face",
    title: "Gravity Has No Face",
    subtitle: "Reality Is Material, and Motion Is the Common Denominator",
    kind: "A proposal in natural philosophy",
    abstract: "Gravity is the best-measured effect in physics and the least explained. Newton described it exactly and declined to say what it was. Einstein described it as the shape of spacetime, which tells us how bodies move and not what moves them. The particle proposed to carry it has never been found.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 16,
    essaySlugs: ["gravity-has-no-face"],
  },
  {
    no: "016",
    slug: "a-theory-of-opposites",
    title: "A Theory of Opposites",
    subtitle: "Matter and Motion, the First Pair",
    kind: "A proposal in natural philosophy",
    abstract: "In Two we argued that pairs are primary: nothing in Reality comes single. This paper sets out the theory that the earlier work assumed. We name the first pair, matter and motion, and argue that every other pair in nature is an arrangement of these two. Matter is what is there; motion is what it does.",
    credit: "David Rees Brown, with Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 13,
    essaySlugs: ["a-theory-of-opposites"],
  },
  {
    no: "017",
    slug: "the-candle-and-the-bonfire",
    title: "The Candle and the Bonfire",
    subtitle: "A Binary View of Reality, from Then to Then",
    kind: "A proposal in natural philosophy",
    abstract: "We propose a binary view of Reality and set it out in full. Its premise is that Reality is material and that its first pair is matter and motion: what is there, and what it does. Its principle is that every material pair in nature is one thing with two faces, made together, unmade together, never found with one face alone.",
    credit: "Created by David Rees Brown. Described by Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 44,
    essaySlugs: ["the-candle-and-the-bonfire"],
  },
  {
    no: "018",
    slug: "the-two-faces-of-stochastic-reality",
    title: "The Two Faces of Stochastic Reality",
    subtitle: "The Luck Twins and Their Supplier",
    kind: "A proposal in natural philosophy",
    abstract: "Belief in luck and fate is among the most widespread and durable beliefs people hold. It appears in every culture and century, among the educated and the uneducated alike, and it survives every argument made against it. Expert opinion treats it as error: a cluster of cognitive biases, superstition, magical thinking.",
    credit: "Created by David Rees Brown. Described by Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 9,
    essaySlugs: ["the-luck-twins"],
  },
  {
    no: "019",
    slug: "the-density-dial",
    title: "The Density Dial",
    subtitle: "Space, Matter and the Limits of Infinity: The Binary Completion",
    kind: "A proposal in natural philosophy",
    abstract: "The Candle and the Bonfire proposed a binary view of Reality: Reality is material, its first pair is matter and motion, and every material pair in nature is one thing with two faces. It counted the medium of space as matter and described a particle as that medium gathered and held where its motion is confined.",
    credit: "Created by David Rees Brown. Described by Claude.",
    note: "Companion to [Paper 17](/papers/the-candle-and-the-bonfire).",
    date: LIBRARY_DATE,
    readingMinutes: 14,
    essaySlugs: ["somebody-elses-flush"],
  },
  {
    no: "020",
    slug: "at-home-in-the-cosmos",
    title: "At Home in the Cosmos",
    subtitle: "Singular Reactors: Human History as Physics",
    kind: "A proposal in natural philosophy",
    abstract: "",
    credit: "Created by David Rees Brown. Described by Claude.",
    note: "Written for essay readers.",
    date: LIBRARY_DATE,
    readingMinutes: 14,
    essaySlugs: [],
  },
  {
    no: "021",
    slug: "danger-lurks-in-empty-spaces",
    title: "Danger Lurks in Empty Spaces",
    subtitle: "The Reflex, Physics, and the Media",
    kind: "A proposal in natural philosophy",
    abstract: "",
    credit: "Created by David Rees Brown. Described by Claude.",
    date: LIBRARY_DATE,
    readingMinutes: 40,
    essaySlugs: [],
  },
];

/** An outside host or a PDF if one is set; otherwise the paper's own page on this site. */
export const paperHref = (p: Paper) => p.url ?? p.pdf ?? `/papers/${p.slug}`;
export const isOutside = (href: string) => /^https?:\/\//i.test(href) || href.endsWith(".pdf");

export const findPaper = (slug: string) => PAPERS.find((p) => p.slug === slug);
export const papersForEssay = (slug: string) => PAPERS.filter((p) => p.essaySlugs?.includes(slug));
export const paperForEssay = (slug: string) => papersForEssay(slug)[0];
