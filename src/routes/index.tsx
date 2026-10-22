import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/reading-room-logo.png.asset.json";
import { SITE, type ShelfSlug } from "@/config/site";
import { byNewestOf, countOnIn, essayUrl, featuredOf, fmtMonth } from "@/content/essays";
import { essaysQuery } from "@/lib/essays.query";
import { LETTER } from "@/content/letter";
import { Star } from "@/components/site/Marks";
import { Sky } from "@/components/site/Sky";
import { populatedShelves } from "@/lib/site-presentation";
import { PensamientoBand } from "@/components/site/PensamientoBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Reading Room — Essays by David Rees Brown" },
      { name: "description", content: "A private corner of the library for curious minds and unconventional questions. Essays on science, philosophy and reflection by David Rees Brown, with Claude." },
      { property: "og:title", content: "The Reading Room — A private corner of the library" },
      { property: "og:description", content: "Essays on science, philosophy and reflection, shelved for the curious reader." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => ({
    essays: await context.queryClient.ensureQueryData(essaysQuery),
    date: new Date().toISOString(),
  }),
  component: Index,
});

const ext = { target: "_blank", rel: "noopener" } as const;
const plural = (n: number) => `${n} ${n === 1 ? "essay" : "essays"}`;

/** Only populated shelves are rendered by the homepage. */
function ShelfSpine({ shelf, cls, star, n }: { shelf: ShelfSlug; cls: string; star: string; n: number }) {
  const name = shelf.charAt(0).toUpperCase() + shelf.slice(1);
  const inner = (
    <>
      <span className="band" /><Star fill={star} className="em" />
      <span className="t">{name}</span>
      <span className="c tnum">{plural(n)}</span>
      <span className="band" />
    </>
  );
  return (
    <Link to="/shelves/$shelf" params={{ shelf }} className={`spine ${cls}`}>{inner}</Link>
  );
}

function Index() {
  const { data: essays } = useSuspenseQuery(essaysQuery);
  const { date } = Route.useLoaderData();
  const feat = featuredOf(essays);
  const recent = byNewestOf(essays).filter((e) => e.slug !== feat.slug && e.slug !== "welcome-to-the-reading-room").slice(0, 3);
  const shelfName = { science: "Science", philosophy: "Philosophy", reflections: "Reflections" };
  const visibleShelves = populatedShelves(essays).map((shelf) => shelf.slug);

  return (
    <>
      <div className="plaque wrap">
        <img src={logo.url} alt="The Reading Room — David Rees Brown, with Claude" width={1000} height={384} />
      </div>

      <div className="door">
        <Sky />
        <div className="wrap door-in">
          <div>
            <p className="eyebrow"><i />Science · Philosophy · Reflections</p>
            <h1>A private corner of the <em>Library</em></h1>
            <p className="lede">For curious minds and unconventional questions.</p>
            <p className="motto">We're storytellers, not scientists. These are ideas, not facts.</p>
            <div className="actions">
              <Link to="/essays" className="btn btn-primary">Enter the Room <span className="arr" aria-hidden="true">→</span></Link>
              <a href={SITE.substack} {...ext} className="btn btn-ghost">Read on Substack <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>

      <section className="sec wrap" aria-labelledby="feat-h">
        <div className="featured is-solo">
          <div className="feat-text">
            <p className="label gold">Featured from the {shelfName[feat.shelf]} shelf</p>
            <h2 id="feat-h" className="feat-title">
              <Link to="/essays/$slug" params={{ slug: feat.slug }} style={{ textDecoration: "none" }}>{feat.title}</Link>
            </h2>
            <p className="tease">{feat.excerpt}</p>
            <p className="byline">David Rees Brown <i>with Claude</i></p>
            <p className="meta tnum" style={{ marginTop: 18 }}>{feat.readingMinutes} min read</p>
            <div className="actions">
              <Link to="/essays/$slug" params={{ slug: feat.slug }} className="btn btn-primary">Read the essay <span className="arr" aria-hidden="true">→</span></Link>
              <a href={essayUrl(feat)} {...ext} className="btn btn-secondary">Discuss on Substack <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <PensamientoBand initialDate={date} />

      <section className="shelves-band" aria-labelledby="shelves-h">
        <div className="wrap sec" style={{ paddingBottom: "clamp(80px,10vw,120px)" }}>
          <div className="sec-head">
            <p className="label gold">The shelves</p>
            <h2 id="shelves-h">Take a volume down</h2>
            <p>Every essay is filed on one shelf. Pull a spine to see what is on it.</p>
          </div>
          <div className="shelf">
            <span className="spine dec d1" aria-hidden="true" />
            {visibleShelves.includes("science") && <ShelfSpine shelf="science" cls="sp-navy" star="#B18B49" n={countOnIn(essays, "science")} />}
            <span className="spine dec d2" aria-hidden="true" />
            {visibleShelves.includes("philosophy") && <ShelfSpine shelf="philosophy" cls="sp-ivory" star="#B18B49" n={countOnIn(essays, "philosophy")} />}
            {visibleShelves.includes("reflections") && <ShelfSpine shelf="reflections" cls="sp-slate" star="#E7D3A8" n={countOnIn(essays, "reflections")} />}
            <span className="spine dec d3" aria-hidden="true" />
            <Link to="/books" className="spine sp-gold">
              <span className="band" /><Star fill="#071D30" className="em" /><span className="t">The Books</span><span className="c">In preparation</span><span className="band" />
            </Link>
            <span className="spine dec d4" aria-hidden="true" />
            <span className="spine dec d5" aria-hidden="true" />
            <div className="bookend">
              <p className="label">How it is shelved</p>
              <p>
                <b className="text-navy">Science</b> asks what the world is made of. <b className="text-navy">Philosophy</b> asks how we came to believe it.{" "}
                <b className="text-navy">Reflections</b> asks what it means for the person asking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec note-band-sec" aria-labelledby="note-h">
        <div className="note note-band">
          <div className="side">
            <p className="label gold">A note from David</p>
            <h2 id="note-h">Why The Reading Room exists</h2>
          </div>
          <article className="letter">
            <p className="open">{LETTER.open}</p>
            {LETTER.paras.map((p) => <p key={p}>{p}</p>)}
            <p>{LETTER.close}</p>
            <div className="sig"><span className="n">David Rees Brown</span><span className="w">with Claude</span></div>
            <p className="mt-6"><Link to="/essays/$slug" params={{ slug: "welcome-to-the-reading-room" }}>Read the welcome note →</Link></p>
          </article>
        </div>
      </section>


      {recent.length > 0 && (
        <section className="sec wrap" aria-labelledby="recent-h">
          <div className="sec-head">
            <p className="label gold">Recent reading</p>
            <h2 id="recent-h">New in the catalogue</h2>
          </div>
          <div className="cards">
            {recent.map((e) => (
              <Link key={e.slug} to="/essays/$slug" params={{ slug: e.slug }} className="card">
                <span className="top"><span className="sh">{shelfName[e.shelf]}</span></span>
                <h3>{e.title}</h3>
                <p>{e.excerpt}</p>
                <span className="foot">
                  <span className="meta tnum">{fmtMonth(e.date)} · {e.readingMinutes} min</span>
                  <span className="go">Read →</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
