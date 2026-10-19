import { describe, expect, it } from "vitest";

import { ESSAY_META, DEFAULT_SHELF } from "@/content/essays.meta";
import { parseFeed } from "@/lib/substack.server";
import { buildCatalogue, htmlToBlocks } from "@/lib/essays.sync";

/** Two real posts as Substack publishes them, plus one David has not filed anywhere yet. */
const FEED = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>David R. Brown</title>
<item>
  <title><![CDATA[Welcome to the Reading Room]]></title>
  <description><![CDATA[Opinion pieces, not proofs. Pull up a chair.]]></description>
  <link>https://davidrbrown1.substack.com/p/welcome-to-the-reading-room</link>
  <pubDate>Wed, 07 Oct 2026 13:09:10 GMT</pubDate>
  <content:encoded><![CDATA[<p>Science, like everything else people do, is subjective&#8217;.</p>]]></content:encoded>
</item>
<item>
  <title><![CDATA[Too Much of a Good Thing]]></title>
  <description><![CDATA[How Social Media, Online News, and the First Amendment Are Killing Democracy]]></description>
  <link>https://davidrbrown1.substack.com/p/too-much-of-a-good-thing</link>
  <pubDate>Thu, 01 Oct 2026 17:21:04 GMT</pubDate>
  <content:encoded><![CDATA[<p>Democracy was conceived under scarcity.</p><p>*Writing with AI</p>]]></content:encoded>
</item>
<item>
  <title><![CDATA[What Came Before the Big Bang]]></title>
  <description><![CDATA[The question physics keeps refusing to answer.]]></description>
  <link>https://davidrbrown1.substack.com/p/what-came-before-the-big-bang</link>
  <pubDate>Mon, 19 Oct 2026 09:00:00 GMT</pubDate>
  <content:encoded><![CDATA[<p>The universe had a beginning. <em>Nobody</em> agrees on what came before it. <strong>They will tell you the question is meaningless.</strong></p><h2>The refusal</h2><blockquote><p>A question is not answered by calling it silly.</p></blockquote><figure><img src="https://example.com/hero.png" /></figure><p>Read <a href="https://example.com/source">this account</a> for the detail.</p>]]></content:encoded>
</item>
</channel></rss>`;

describe("the live catalogue read from Substack", () => {
  const essays = buildCatalogue(parseFeed(FEED), ESSAY_META, DEFAULT_SHELF);

  it("keeps the two filed essays on the numbers Mia gave them", () => {
    const bySlug = Object.fromEntries(essays.map((e) => [e.slug, e.no]));
    expect(bySlug["welcome-to-the-reading-room"]).toBe("001");
    expect(bySlug["too-much-of-a-good-thing"]).toBe("002");
  });

  it("shows newest first", () => {
    expect(essays.map((e) => e.date)).toEqual(["2026-10-19", "2026-10-07", "2026-10-01"]);
  });

  it("files an unfiled new post as the next number on the default shelf", () => {
    const fresh = essays.find((e) => e.slug === "what-came-before-the-big-bang")!;
    expect(fresh.no).toBe("003");
    expect(fresh.shelf).toBe("reflections");
    expect(fresh.date).toBe("2026-10-19");
    expect(fresh.readingMinutes).toBe(1);
    expect(fresh.dek).toBe("The question physics keeps refusing to answer.");
    expect(fresh.substackUrl).toBe("https://davidrbrown1.substack.com/p/what-came-before-the-big-bang");
  });

  it("carries the featured flag from the filing overrides only", () => {
    expect(essays.filter((e) => e.featured).map((e) => e.slug)).toEqual(["too-much-of-a-good-thing"]);
  });
});

describe("a post's HTML turned into the essay page's blocks", () => {
  it("keeps bold, italic, headings and pull quotes", () => {
    const body = htmlToBlocks(
      "<p>He said <em>Nobody</em> knew. <strong>They did.</strong></p><h2>The refusal</h2><blockquote><p>Not answered by calling it silly.</p></blockquote>",
    );
    expect(body).toBe(
      "He said _Nobody_ knew. **They did.**\n\n## The refusal\n\n> Not answered by calling it silly.",
    );
  });

  it("keeps a link as text and an address", () => {
    expect(htmlToBlocks('<p>Read <a href="https://example.com/source">this account</a> now.</p>')).toBe(
      "Read [this account](https://example.com/source) now.",
    );
  });

  it("drops pictures and Substack's own closing line", () => {
    const body = htmlToBlocks("<p>Real words.</p><figure><img src='a.png'/></figure><p>*Writing with AI</p>");
    expect(body).toBe("Real words.");
  });

  it("decodes the typographic characters Substack leaves as entities", () => {
    expect(htmlToBlocks("<p>They&#8217;ve no proof&#8217;.</p>")).toBe("They’ve no proof’.");
  });
});
