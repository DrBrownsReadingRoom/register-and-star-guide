// David's supplied homepage letter wording — single source for content edits.
// Wording is final as supplied; edit here, not in the route.

export const LETTER = {
  open: "I’m not a physicist, and I’ve no intention of becoming one.",
  paras: [
    "But I’ve spent a long time watching modern physics from the stands, and here’s what I see. The universe is basically simple. The business of explaining it has become complicated, expensive, and very good at paying the people who do the explaining. Ever since the Manhattan Project turned physics into an industry, the money has flowed to the players. The people paying for it, which is all of us, haven’t seen much return.",
    "So these essays are written for the fans, not the players. There’s no math here, and no equations to wade through. They’re about ideas, and about the institutions that decide which ideas get a hearing. Some ask what came before the Big Bang. Some ask why nobody can schedule a breakthrough. Some put the spokesmen of science on trial. A few leave physics altogether and take on democracy and the mind.",
    "I’m not defending a theory of my own. My point is narrower and, I think, harder to dodge: science, like everything else people do, is subjective, approximate, and shaped by self-interest and funding. We may not be right. But there are more credible ways to ask the questions than the ones we’ve been sold.",
  ],
  runs: [
    {
      lead: "How these get made.",
      body: "I write with Claude, an AI. I bring the ideas, the arguments, and the stubbornness. Claude checks the science, finds the gaps, and pushes back when I’m wrong. The words and the opinions are mine, and so is the heat when people disagree. I’m saying this up front because I think it’s part of the story: a man and a machine, looking through windows the professionals stopped opening.",
    },
    {
      lead: "What to expect.",
      body: "Short essays, roughly a five-to-ten-minute read each. They’ll be provocative on purpose. If you think I’ve got something wrong, say so in the comments. A good swat draws out better arguments, and that’s half the fun.",
    },
  ],
  close: "Subscribe if you’d like the next one in your inbox. And welcome.",
} as const;
