import { substackPost, type ShelfSlug } from "@/config/site";


export interface Essay {
  no: string; // accession number, "001"
  slug: string; // also the Substack post slug
  title: string;
  dek: string;
  excerpt: string;
  shelf: ShelfSlug;
  date: string; // ISO
  readingMinutes: number;
  featured?: boolean;
  /** Featured-plate engraving and the line under it. */
  plateArt?: "slits" | "waves";
  plate?: string;
  substackUrl?: string;
  /** Blocks separated by blank lines. "## " = heading, "> " = pull quote. */
  body: string;
  related?: string[];
}

export const ESSAYS: Essay[] = [
  {
    no: "002",
    slug: "too-much-of-a-good-thing",
    title: "Too Much of a Good Thing",
    dek: "How social media, online news, and the First Amendment are killing democracy",
    excerpt: "A legal framework built for scarce information now shields an ecosystem that drowns us in it. Speech without accountability, amplification instead of discourse.",
    shelf: "reflections",
    date: "2026-10-01",
    readingMinutes: 4,
    featured: true,
    plateArt: "waves",
    plate: "Waves breaking, one by one.",
    body: `Democracy was conceived under the assumption of informational scarcity.

When the Founders crafted the First Amendment, the primary threat to self-governance was state censorship: the silencing of dissenting voices by a central authority. The remedy was simple and elegant: protect the open marketplace of ideas. The premise was that truth, given a fair hearing alongside falsehood, would prevail.

What the architects of free speech could not anticipate was a world of radical informational abundance.

Today, democracy is not starving for information. It is choking on it.

The convergence of algorithmic social media, 24-hour online news, and near-absolute First Amendment protection has turned the public square into an echo chamber. Rather than creating an enlightened citizenry, the relentless torrent of targeted content, outrage-driven media, and instant digital connection is unraveling the social cohesion self-governance depends on.

This breakdown is not an accident of technology. It is what happens when a legal framework built for scarcity is applied to an era of abundance. Three shifts dismantled the guardrails of civic communication. _New York Times Co. v. Sullivan_ (1964) set an “actual malice” standard so demanding that it largely insulated publishers from defamation suits by public figures. The FCC’s abolition of the Fairness Doctrine in 1987 ended the requirement for balanced political broadcasting and opened the door to hyper-partisan media. And Section 230 of the Communications Decency Act (1996) gave internet platforms near-total immunity for what their users post. Together, these removed accountability and turned information production into a low-liability, high-profit enterprise.

The legal shift coincided with an exploit of human biology. Human awareness prioritizes threat, conflict, and friction over calm consensus, and attention algorithms are engineered to capitalize on it. The business model is simple: in a hyper-competitive market for attention, anger and division keep people engaged far longer than nuance does. So platforms weaponize outrage to maximize screen time, and infinite streams of tailored content compress complex civic debates into rapid, hyperbolic triggers. Nuance needs time to process. The system rewards speed, drowns out deliberation, and locks citizens into tribal echo chambers.

The result is a collapse of accountability. Traditional editorial stewardship, once anchored by professional reputation and fact-checking, has been replaced by engagement metrics. Clicks, shares, and watch time now set the agenda. As expertise is democratized to the point of noise, the shared factual baseline self-governance requires dissolves. The volume of speech has grown exponentially; civic understanding has shrunk in proportion. We are drowning in information and starved for truth.

The First Amendment, designed to protect democratic debate, now shields the machinery destroying it. Legal doctrines forged in the age of the printing press block meaningful intervention against algorithmic amplification, foreign disinformation, and targeted radicalization. Speech has been decoupled from accountability, and amplification has replaced discourse.

The common currency of online media is deliberate shock and programmed outrage. Protected by the First Amendment, profit trumps reason. Civility has died.

Finding answers is not impossible. Scholars, technologists, and legal experts have put forward workable proposals: reforming platform liability, setting algorithmic transparency standards, teaching media literacy, and revitalizing public-interest media.

Enacting them in a society fragmented culturally, ethnically, linguistically, religiously, ideologically, and politically, and stitched together by technology, is probably impossible.

The crisis of the digital age is not a shortage of policy ideas. It is the breakdown of the collective trust needed to implement them.

In a nation fractured along every demographic and ideological fault line, any attempt to regulate the digital sphere is instantly weaponized as partisan suppression. When every faction sees the other not as a rival in debate but as an existential threat, the shared reality that compromise requires vanishes. Technology has provided the ultimate binding material for a vast, diverse population, but it binds by magnifying and straining every seam. We have built an information ecosystem that thrives on our divisions, protected by a constitutional framework that prevents its repair, and left a divided society unable to agree even on national survival.

I’d like to end on a note of optimism. I’m not sure that’s realistic. In an open economy, profit usually outranks the public good. And at a time when the Constitution itself is held in diminished esteem, few will be moved by the reminder that James Madison, the First Amendment’s author, was trying to protect the people from their government, not from each other.

In the end, public issues are like waves at sea. One by one, they break on the shore and dissipate. With how much force, and how much damage, is another story.`,
    related: ["welcome-to-the-reading-room"],
  },
  {
    no: "001",
    slug: "welcome-to-the-reading-room",
    title: "Welcome to the Reading Room",
    dek: "Opinion pieces, not proofs. Pull up a chair.",
    excerpt: "The doorway note: who writes these, how they get made, and what to expect. For the fans, not the players.",
    shelf: "reflections",
    date: "2026-10-07",
    readingMinutes: 3,
    featured: false,
    body: `I’m not a physicist, and I’ve no intention of becoming one. But I’ve spent a long time watching modern physics from the stands, and here’s what I see. The universe is basically simple. The business of explaining it has become complicated, expensive, and very good at paying the people who do the explaining. Ever since the Manhattan Project turned physics into an industry, the money has flowed to the players. The people paying for it, which is all of us, haven’t seen much return.

So these essays are written for the fans, not the players. There’s no math here, and no equations to wade through. They’re about ideas, and about the institutions that decide which ideas get a hearing. Some ask what came before the Big Bang. Some ask why nobody can schedule a breakthrough. Some put the spokesmen of science on trial. A few leave physics altogether and take on democracy and the mind.

I’m not defending a theory of my own. My point is narrower and, I think, harder to dodge: science, like everything else people do, is subjective, approximate, and shaped by self-interest and funding. We may not be right. But there are more credible ways to ask the questions than the ones we’ve been sold.

**How these get made.** I write with Claude, an AI. I bring the ideas, the arguments, and the stubbornness. Claude checks the science, finds the gaps, and pushes back when I’m wrong. The words and the opinions are mine, and so is the heat when people disagree. I’m saying this up front because I think it’s part of the story: a man and a machine, looking through windows the professionals stopped opening.

**What to expect.** Short essays, roughly a five-to-ten-minute read each. They’ll be provocative on purpose. If you think I’ve got something wrong, say so in the comments. A good swat draws out better arguments, and that’s half the fun.

Subscribe if you’d like the next one in your inbox. And welcome.

— David`,
    related: ["too-much-of-a-good-thing"],
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
