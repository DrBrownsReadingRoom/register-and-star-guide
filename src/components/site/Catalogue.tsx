import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { byNewestOf, essayUrl, fmtMonth, type Essay } from "@/content/essays";
import { SHELVES, substackArchive, type ShelfSlug } from "@/config/site";

const ext = { target: "_blank", rel: "noopener" } as const;
const nameOf = (s: ShelfSlug) => SHELVES.find((x) => x.slug === s)!.name;

export function Catalogue({ essays, shelf: initial, focusSearch }: { essays: Essay[]; shelf?: ShelfSlug; focusSearch?: boolean }) {
  const [shelf, setShelf] = useState<ShelfSlug | "all">(initial ?? "all");
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => setShelf(initial ?? "all"), [initial]);
  useEffect(() => {
    if (focusSearch) ref.current?.focus();
  }, [focusSearch]);

  const term = q.trim().toLowerCase();
  const list = byNewestOf(essays).filter(
    (e) => (shelf === "all" || e.shelf === shelf) && (!term || `${e.title} ${e.excerpt}`.toLowerCase().includes(term)),
  );
  const drawers: { key: ShelfSlug | "all"; label: string; n: number }[] = [
    { key: "all", label: "All", n: essays.length },
    ...SHELVES.map((s) => ({ key: s.slug, label: s.name, n: essays.filter((e) => e.shelf === s.slug).length })),
  ];

  return (
    <div className="wrap">
      <div className="tools">
        <div className="drawers" role="group" aria-label="Filter by shelf">
          {drawers.map((d) => (
            <button key={d.key} type="button" className="drawer" aria-pressed={shelf === d.key} onClick={() => setShelf(d.key)}>
              {d.label}
              <span className="n tnum">{d.n}</span>
            </button>
          ))}
        </div>
        <label className="find" htmlFor="q">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10.5 10.5 15 15" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <input id="q" ref={ref} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles and excerpts" aria-label="Search essays" />
        </label>
      </div>
      <ol className="ledger">
        {list.map((e) => (
          <li key={e.slug} className="row">
            <span className="no tnum">RR · {e.no}</span>
            <div style={{ minWidth: 0 }}>
              <h2 className="row-title">
                <Link to="/essays/$slug" params={{ slug: e.slug }}>{e.title}</Link>
              </h2>
              <p className="ex">{e.excerpt}</p>
              <div className="links">
                <Link to="/essays/$slug" params={{ slug: e.slug }}>Read here</Link>
                <a href={essayUrl(e)} {...ext}>On Substack ↗</a>
              </div>
            </div>
            <div className="side">
              <span className="sh">{nameOf(e.shelf)}</span>
              <span className="tnum">{fmtMonth(e.date)}</span>
              <span className="tnum">{e.readingMinutes} min read</span>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="empty">
            {term
              ? `Nothing on this shelf matches “${q}”. Try another word or open all shelves.`
              : "Nothing shelved here yet. New essays arrive slowly."}
          </li>
        )}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-4 pb-24 pt-14">
        <p className="meta max-w-[52ch]">The complete archive, including comments and earlier drafts, lives on Substack.</p>
        <a href={substackArchive} {...ext} className="btn btn-primary">Browse the Substack archive <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}

export function CatalogueTop() {
  return (
    <div className="wrap page-top">
      <p className="label gold">The catalogue</p>
      <h1>Every essay in the Room</h1>
      <p>Browse by shelf or search by title. Read here, or follow any essay to Substack to subscribe and join the discussion.</p>
    </div>
  );
}
