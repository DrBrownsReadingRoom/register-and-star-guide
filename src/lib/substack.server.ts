import { XMLParser } from "fast-xml-parser";
import { substackFeed } from "@/config/site";
import type { FeedItem } from "./essays.sync";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_", trimValues: true });

/** Feed nodes arrive as text, as an object, or as a list of either. */
function text(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return text(v[0]);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    for (const k of ["#text", "#cdata"]) if (typeof o[k] === "string") return o[k] as string;
    return text(Object.values(o)[0]);
  }
  return "";
}

const slugOf = (link: string) => /\/p\/([^/?#]+)/.exec(link)?.[1] ?? "";
const isoOf = (pub: string) => {
  const d = new Date(pub);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

export function parseFeed(xml: string): FeedItem[] {
  const doc = parser.parse(xml) as Record<string, any>;
  const raw = doc?.["rss"]?.["channel"]?.["item"];
  const items: unknown[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

  const out: FeedItem[] = [];
  for (const value of items) {
    const it = (value ?? {}) as Record<string, unknown>;
    const link = text(it["link"]).trim();
    const slug = slugOf(link);
    const date = isoOf(text(it["pubDate"]));
    if (!slug || !date) continue;
    out.push({
      slug,
      url: link.split("?")[0] ?? link,
      date,
      title: text(it["title"]),
      description: text(it["description"]),
      html: text(it["content:encoded"] ?? it["content"]),
    });
  }
  return out;
}

/** Read David's published list. Server-only: nothing here reaches the browser. */
export async function fetchFeed(): Promise<FeedItem[]> {
  const url = process.env["SUBSTACK_FEED_URL"] || substackFeed;
  const res = await fetch(url, {
    headers: { "user-agent": "TheReadingRoom/1.0 (+https://drbrownsreadingroom.com)", accept: "application/rss+xml, application/xml, text/xml" },
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`Substack responded ${res.status}`);
  return parseFeed(await res.text());
}
