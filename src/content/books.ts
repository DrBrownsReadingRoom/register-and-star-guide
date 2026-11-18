export interface Book {
  title: string;
  subtitle: string;
  description: string;
  formats: string[];
  year: string;
  publisher: string;
  status: "available" | "forthcoming" | "in-preparation";
  statusLabel?: string;
  amazonUrl?: string;
  kindleUrl?: string;
  coverImage?: string;
}

export const BOOKS: Book[] = [
  {
    title: "A Shoreline Without a Chart",
    subtitle: "David Rees Brown",
    description: "David Rees Brown. On its way to Amazon.",
    formats: [],
    year: "",
    publisher: "",
    status: "in-preparation",
    statusLabel: "Coming soon",
  },
  {
    title: "A Compass for the Voyage",
    subtitle: "An Explanation of Everything, for Everyone, by a Storyteller and a Helper",
    description: "The collected essays.",
    formats: [],
    year: "",
    publisher: "",
    status: "in-preparation",
    statusLabel: "In preparation",
  },
  {
    title: "A Binary View of Reality",
    subtitle: "The Candle and the Bonfire",
    description: "The Candle and the Bonfire, with the papers that led to it.",
    formats: [],
    year: "2027",
    publisher: "",
    status: "in-preparation",
    statusLabel: "Spring 2027",
  },
  {
    title: "The War Without End",
    subtitle: "Conflict as a Condition",
    description: "A series of essays, from Eden to America.",
    formats: [],
    year: "",
    publisher: "",
    status: "in-preparation",
    statusLabel: "In the works",
  },
];
