import { createFileRoute } from "@tanstack/react-router";
import { BOOKS } from "@/content/books";
import { SITE, substackSubscribe } from "@/config/site";
import { Emblem } from "@/components/site/Emblem";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "The Bindery — Books by David Rees Brown" },
      { name: "description", content: "The Reading Room: Collected Essays, Volume One, by David Rees Brown with Claude. Available on Amazon in paperback and Kindle." },
      { property: "og:title", content: "The Bindery — Books by David Rees Brown" },
      { property: "og:description", content: "Collected essays from The Reading Room, now on Amazon." },
    ],
  }),
  component: BooksPage,
});

const ext = { target: "_blank", rel: "noopener" } as const;

function BooksPage() {
  const available = BOOKS.filter((b) => b.status === "available");
  const workshop = BOOKS.filter((b) => b.status !== "available");
  return (
    <div className="wrap">
      {available.map((b, i) => (
        <div key={b.title} className="bindery">
          <div className="book3d">
            <div className="book" aria-hidden="true">
              <div className="spine-face" />
              {b.coverImage ? (
                <img className="cover" src={b.coverImage} alt="" style={{ padding: 0, objectFit: "cover" }} />
              ) : (
                <div className="cover">
                  <Emblem className="h-[54px] w-16" />
                  <div><div className="ti">{b.title}</div><div className="su">{b.subtitle.replace(", ", " · ")}</div></div>
                  <div className="au">DAVID REES BROWN<i>with Claude</i></div>
                </div>
              )}
              <div className="pages" />
            </div>
          </div>
          <div className="book-info">
            <p className="label gold">The Bindery · Now on Amazon</p>
            {i === 0 ? <h1>{b.title}</h1> : <h2 className="text-[48px] font-medium">{b.title}</h2>}
            <p className="su">{b.subtitle}</p>
            <p className="desc">{b.description}</p>
            <dl className="specs">
              <div><dt>Formats</dt><dd>{b.formats.join(" · ")}</dd></div>
              <div><dt>Published</dt><dd className="tnum">{b.year}</dd></div>
              <div><dt>Publisher</dt><dd>{b.publisher}</dd></div>
            </dl>
            <div className="actions">
              {b.amazonUrl && <a href={b.amazonUrl} {...ext} className="btn btn-primary">Buy on Amazon <span aria-hidden="true">↗</span></a>}
              {b.kindleUrl && <a href={b.kindleUrl} {...ext} className="btn btn-secondary">Kindle edition <span aria-hidden="true">↗</span></a>}
            </div>
            <p className="meta mt-4">Or see every title on <a href={SITE.amazonAuthor} {...ext}>David’s Amazon author page</a>.</p>
          </div>
        </div>
      ))}
      {workshop.map((b) => (
        <section key={b.title} className="workshop" aria-label={b.title}>
          <p className="label gold">In the workshop</p>
          <div>
            <span className="status">{b.status === "forthcoming" ? "Forthcoming" : "In preparation"}</span>
            <h2 style={{ marginTop: 18 }}>{b.title}</h2>
            <p>{b.description}</p>
            <p className="meta" style={{ marginTop: 18 }}>
              Subscribe on Substack to hear when it is ready. <a href={substackSubscribe} {...ext}>Subscribe ↗</a>
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
