export const SITE = {
  substack: "https://davidrbrown1.substack.com",
  amazonBook: "https://www.amazon.com/dp/YOUR-ASIN",
  amazonKindle: "https://www.amazon.com/dp/YOUR-KINDLE-ASIN",
  amazonAuthor: "https://www.amazon.com/author/YOUR-AUTHOR-ID",
};

export const substackPost = (slug: string) => `${SITE.substack}/p/${slug}`;
export const substackArchive = `${SITE.substack}/archive`;
export const substackSubscribe = `${SITE.substack}/subscribe`;
export const subscribeUrl = (email: string) =>
  `${substackSubscribe}?email=${encodeURIComponent(email)}`;

export const SHELVES = [
  { slug: "science", name: "Science" },
  { slug: "philosophy", name: "Philosophy" },
  { slug: "reflections", name: "Reflections" },
] as const;

export type ShelfSlug = (typeof SHELVES)[number]["slug"];
