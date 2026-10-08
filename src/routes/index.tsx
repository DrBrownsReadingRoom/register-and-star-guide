import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/reading-room-logo.png.asset.json";
import { SITE } from "@/config/site";
import { byNewest, countOn, essayUrl, featuredEssay, fmtMonth } from "@/content/essays";
import { Reg, Star, StarRule } from "@/components/site/Marks";
import { Sky, TwoSlitPlate } from "@/components/site/Sky";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Reading Room — Essays by David Rees Brown" },
      { name: "description", content: "Essays from the ragged edges of physics and thought by David Rees Brown, with Claude. Written for curious readers rather than the specialists." },
      { property: "og:title", content: "The Reading Room — The Art of Asking Better Questions" },
      { property: "og:description", content: "Essays on science, philosophy and reflection, shelved for the curious reader." },
    ],
  }),
  component: Index,
});

const ext = { target: "_blank", rel: "noopener" } as const;
const plural = (n: number) => `${n} ${n === 1 ? "essay" : "essays"}`;

function Index() {
  const feat = featuredEssay();
  const recent = byNewest.slice(0, 3);
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
            <p className="eyebrow"><i />Science · Philosophy · Discovery</p>
            <h1>The Art of Asking <em>Better</em> Questions</h1>
            <p className="lede">Essays from the ragged edges of physics and thought, written for curious readers rather than the specialists.</p>
            <div className="actions">
              <Link to="/essays" className="btn btn-primary">Enter the Room <span className="arr" aria-hidden="true">→</span></Link>
              <a href={SITE.substack} {...ext} className="btn btn-ghost">Read on Substack <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <p className="chart-note">
            <b>On the chart behind this page</b>
            The celestial grid is drawn to the old convention: right ascension in hours around the rim, declination in rings toward the pole. Maps like this were how people first asked where they stood.
          </p>
        </div>
      </div>

      <section className="sec wrap" aria-labelledby="feat-h">
        <div className="featured">
          <figure className="plate" style={{ margin: 0 }}>
            <div className="plate-in"><TwoSlitPlate /></div>
            <figcaption><span>Plate I</span><span>Two openings, one stubborn question.</span></figcaption>
          </figure>
          <div className="feat-text">
            <div className="callno">
              <span className="acc tnum">RR · {feat.no}</span>
              <span className="label gold">Featured from the {shelfName[feat.shelf]} shelf</span>
            </div>
            <h2 id="feat-h" className="feat-title">
              <Link to="/essays/$slug" params={{ slug: feat.slug }} style={{ textDecoration: "none" }}>{feat.title}</Link>
            </h2>
            <p className="tease">Physics tells us that the stuff of the world dissolves, on close inspection, into probability and field. This essay asks the plain question nobody at the pub will let go of: if matter is not material, what exactly is holding up the table?</p>
            <p className="byline">David Rees Brown <i>with Claude</i></p>
            <div className="regs" aria-label="Register of this essay">
              {feat.register.map((r) => <Reg key={r} kind={r} />)}
              <span className="meta tnum">· {feat.readingMinutes} min read</span>
            </div>
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
            <Link to="/shelves/$shelf" params={{ shelf: "science" }} className="spine sp-navy">
              <span className="band" /><Star fill="#B18B49" className="em" /><span className="t">Science</span><span className="c tnum">{plural(countOn("science"))}</span><span className="band" />
            </Link>
            <span className="spine dec d2" aria-hidden="true" />
            <Link to="/shelves/$shelf" params={{ shelf: "philosophy" }} className="spine sp-ivory">
              <span className="band" /><Star fill="#B18B49" className="em" /><span className="t">Philosophy</span><span className="c tnum">{plural(countOn("philosophy"))}</span><span className="band" />
            </Link>
            <Link to="/shelves/$shelf" params={{ shelf: "reflections" }} className="spine sp-slate">
              <span className="band" /><Star fill="#E7D3A8" className="em" /><span className="t">Reflections</span><span className="c tnum">{plural(countOn("reflections"))}</span><span className="band" />
            </Link>
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

      <section className="sec wrap" aria-labelledby="note-h">
        <div className="note">
          <div className="side">
            <p className="label gold">A note from David</p>
            <h2 id="note-h">Why this room exists</h2>
          </div>
          <article className="letter">
            <p className="open">Come in, and mind the step.</p>
            <p>I am not a scientist and never will be. I write for the fans, not the players: the people who love the big questions and suspect, as I do, that reality is simpler than the institutions explaining it would like us to think.</p>
            <p>Each essay starts with a thesis I can’t shake. Claude does the groundwork, I push back on every answer, and what survives the argument ends up on these shelves. Some of it will be wrong. All of it is meant to start a conversation.</p>
            <blockquote>We fight, we lose, we die, and the next person steps to the line.</blockquote>
            <p>That is the spirit of the place. Take a seat. Pull down whatever catches your eye.</p>
            <div className="sig"><span className="n">David Rees Brown</span><span className="w">with Claude</span></div>
          </article>
        </div>
      </section>

      <div className="wrap"><StarRule /></div>

      <section className="sec wrap" aria-labelledby="recent-h">
        <div className="sec-head">
          <p className="label gold">Recent reading</p>
          <h2 id="recent-h">New in the catalogue</h2>
          <p>The latest essays, filed as they arrive. Each one is also published and archived on Substack.</p>
        </div>
        <div className="cards">
          {recent.map((e) => (
            <Link key={e.slug} to="/essays/$slug" params={{ slug: e.slug }} className="card">
              <span className="top tnum"><span>RR · {e.no}</span><span className="sh">{shelfName[e.shelf]}</span></span>
              <h3>{e.title}</h3>
              <p>{e.excerpt}</p>
              <span className="foot">
                <span className="meta tnum">{fmtMonth(e.date)} · {e.readingMinutes} min{e.sample ? " · sample" : ""}</span>
                <span className="go">Read →</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link to="/essays" className="btn btn-secondary">Open the full catalogue <span className="arr" aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
