import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/reading-room-logo.png.asset.json";
import { SITE, type ShelfSlug } from "@/config/site";
import { byNewest, countOn, essayUrl, featuredEssay, fmtMonth } from "@/content/essays";
import { LETTER } from "@/content/letter";
import { Star, StarRule } from "@/components/site/Marks";
import { Sky, TwoSlitPlate, WavePlate } from "@/components/site/Sky";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Reading Room — Essays by David Rees Brown" },
      { name: "description", content: "A private corner of the library for curious minds and unconventional questions. Essays on science, philosophy and reflection by David Rees Brown, with Claude." },
      { property: "og:title", content: "The Reading Room — A private corner of the library" },
      { property: "og:description", content: "Essays on science, philosophy and reflection, shelved for the curious reader." },
    ],
  }),
  component: Index,
});

const ext = { target: "_blank", rel: "noopener" } as const;
const plural = (n: number) => `${n} ${n === 1 ? "essay" : "essays"}`;

/** A shelf spine: a link when the shelf holds essays, a quiet marker while it is empty. */
function ShelfSpine({ shelf, cls, star }: { shelf: ShelfSlug; cls: string; star: string }) {
  const n = countOn(shelf);
  const name = shelf.charAt(0).toUpperCase() + shelf.slice(1);
  const inner = (
    <>
      <span className="band" /><Star fill={star} className="em" />
      <span className="t">{name}</span>
      <span className="c tnum">{n ? plural(n) : "Coming soon"}</span>
      <span className="band" />
    </>
  );
  return n ? (
    <Link to="/shelves/$shelf" params={{ shelf }} className={`spine ${cls}`}>{inner}</Link>
  ) : (
    <span className={`spine is-quiet ${cls}`} aria-disabled="true">{inner}</span>
  );
}

function Index() {
  const feat = featuredEssay();
  const recent = byNewest.filter((e) => e.slug !== feat.slug && e.slug !== "welcome-to-the-reading-room").slice(0, 3);
  const shelfName = { science: "Science", philosophy: "Philosophy", reflections: "Reflections" };

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
            <h1>A private corner of the <em>library</em></h1>
            <p className="lede">For curious minds and unconventional questions.</p>
            <div className="actions">
              <Link to="/essays" className="btn btn-primary">Enter the Room <span className="arr" aria-hidden="true">→</span></Link>
              <a href={SITE.substack} {...ext} className="btn btn-ghost">Read on Substack <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>

      <section className="sec wrap" aria-labelledby="feat-h">
        <div className="featured">
          <figure className="plate" style={{ margin: 0 }}>
            <div className="plate-in">{feat.plateArt === "waves" ? <WavePlate /> : <TwoSlitPlate />}</div>
            <figcaption><span>Plate I</span><span>{feat.plate ?? "Two openings, one stubborn question."}</span></figcaption>
          </figure>
          <div className="feat-text">
            <div className="callno">
              <span className="acc tnum">RR · {feat.no}</span>
              <span className="label gold">Featured from the {shelfName[feat.shelf]} shelf</span>
            </div>
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

      <section className="shelves-band" aria-labelledby="shelves-h">
        <div className="wrap sec" style={{ paddingBottom: "clamp(80px,10vw,120px)" }}>
          <div className="sec-head">
            <p className="label gold">The shelves</p>
            <h2 id="shelves-h">Take a volume down</h2>
            <p>Every essay is filed on one shelf. Pull a spine to see what is on it.</p>
          </div>
          <div className="shelf">
            <span className="spine dec d1" aria-hidden="true" />
            <ShelfSpine shelf="science" cls="sp-navy" star="#B18B49" />
            <span className="spine dec d2" aria-hidden="true" />
            <ShelfSpine shelf="philosophy" cls="sp-ivory" star="#B18B49" />
            <ShelfSpine shelf="reflections" cls="sp-slate" star="#E7D3A8" />
            <span className="spine dec d3" aria-hidden="true" />
            <Link to="/books" className="spine sp-gold">
              <span className="band" /><Star fill="#071D30" className="em" /><span className="t">The Books</span><span className="c">On Amazon</span><span className="band" />
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
            {LETTER.runs.map((r) => (
              <p className="run" key={r.lead}>
                <span className="label gold">{r.lead}</span>
                {r.body}
              </p>
            ))}
            <p>{LETTER.close}</p>
            <div className="sig"><span className="n">David Rees Brown</span><span className="w">with Claude</span></div>
          </article>
        </div>
      </section>

      <div className="wrap"><StarRule /></div>

      {recent.length > 0 && (
        <section className="sec wrap" aria-labelledby="recent-h">
          <div className="sec-head">
            <p className="label gold">Recent reading</p>
            <h2 id="recent-h">New in the catalogue</h2>
          </div>
          <div className="cards">
            {recent.map((e) => (
              <Link key={e.slug} to="/essays/$slug" params={{ slug: e.slug }} className="card">
                <span className="top tnum"><span>RR · {e.no}</span><span className="sh">{shelfName[e.shelf]}</span></span>
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

      <div className="wrap" style={{ paddingBottom: "clamp(64px,9vw,112px)" }}>
        <div className="flex justify-center">
          <Link to="/essays" className="btn btn-secondary">Open the full catalogue <span className="arr" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </>
  );
}
