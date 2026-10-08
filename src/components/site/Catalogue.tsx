import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ESSAYS } from "@/content/essays";
import type { ShelfSlug } from "@/config/site";

export function Catalogue({ shelf, focusSearch }: { shelf?: ShelfSlug; focusSearch?: boolean }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusSearch) ref.current?.focus();
  }, [focusSearch]);

  const list = ESSAYS.filter((e) => (!shelf || e.shelf === shelf) && e.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-24">
      <label htmlFor="catalogue-search" className="rr-label text-goldInk">Search the catalogue</label>
      <input
        id="catalogue-search"
        ref={ref}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Title or subject"
        className="mt-3 block w-full max-w-[720px] border border-navy bg-ivory px-4 py-3 font-ui text-[17px] placeholder:text-slate"
      />
      <ul className="mt-10 max-w-[720px] border-t border-navy/14">
        {list.map((e) => (
          <li key={e.slug} className="border-b border-navy/14 py-6">
            <p className="rr-label text-goldInk">{e.accession}</p>
            <Link to="/essays/$slug" params={{ slug: e.slug }} className="rr-link mt-2 block font-display text-[28px]">
              {e.title}
            </Link>
            <p className="mt-2 text-slate">{e.dek}</p>
          </li>
        ))}
        {list.length === 0 && <li className="py-8 text-slate">No essays have been shelved here yet.</li>}
      </ul>
    </section>
  );
}
