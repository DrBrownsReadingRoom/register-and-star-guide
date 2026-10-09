import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/config/site";
import { Emblem } from "./Emblem";

type NavItem =
  | { label: string; to: "/" | "/essays" | "/books" | "/about"; exact?: boolean }
  | { label: string; shelf: "science" | "philosophy" };

const NAV: NavItem[] = [
  { label: "The Room", to: "/", exact: true },
  { label: "Essays", to: "/essays", exact: true },
  { label: "Science", shelf: "science" },
  { label: "Philosophy", shelf: "philosophy" },
  { label: "Books", to: "/books" },
  { label: "About David", to: "/about" },
];

const linkBase =
  "font-ui text-[13px] font-semibold uppercase tracking-[0.12em] text-navy no-underline border-b border-transparent pb-1 hover:border-gold/60";
const active = { className: "border-gold!" };

function Magnifier() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

function NavLinks({ onNavigate, row }: { onNavigate?: () => void; row?: boolean }) {
  const cls = row
    ? "block w-full border-b border-navy/14 px-6 py-4 font-ui text-[14px] font-semibold uppercase tracking-[0.12em] text-navy no-underline hover:bg-parchment"
    : linkBase;
  const act = row ? { className: "text-goldInk!" } : active;
  return (
    <>
      {NAV.map((item) => (
        <li key={item.label}>
          {"to" in item ? (
            <Link to={item.to} className={cls} activeProps={act} activeOptions={{ exact: !!item.exact }} onClick={onNavigate}>
              {item.label}
            </Link>
          ) : (
            <Link to="/shelves/$shelf" params={{ shelf: item.shelf }} className={cls} activeProps={act} onClick={onNavigate}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
      <li>
        <Link to="/essays" search={{ focus: 1 }} className={`${cls} inline-flex items-center gap-1.5`} onClick={onNavigate}>
          Search <Magnifier />
        </Link>
      </li>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/14 bg-ivory">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3 text-navy no-underline" aria-label="The Reading Room — home">
          <Emblem className="h-7 w-7" />
          <span className="font-display text-[22px] font-medium leading-none">The Reading Room</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 min-[980px]:flex">
          <ul className="flex items-center gap-6">
            <NavLinks />
          </ul>
          <a href={SITE.substack} target="_blank" rel="noopener" className="rr-btn rr-btn-secondary py-[11px]!">
            Substack <span className="rr-arrow" aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </nav>

        <button
          type="button"
          className="rr-btn rr-btn-secondary py-[11px]! min-[980px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-navy/14 bg-ivory min-[980px]:hidden">
          <ul>
            <NavLinks row onNavigate={() => setOpen(false)} />
            <li>
              <a
                href={SITE.substack}
                target="_blank"
                rel="noopener"
                className="block border-b border-navy/14 px-6 py-4 font-ui text-[14px] font-semibold uppercase tracking-[0.12em] text-navy no-underline hover:bg-parchment"
              >
                Substack ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
