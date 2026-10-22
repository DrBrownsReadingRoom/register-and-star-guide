import { Link } from "@tanstack/react-router";
import { SITE, substackArchive } from "@/config/site";
import { Emblem } from "./Emblem";

const colLink = "font-ui text-[15px] text-ivory/85 no-underline hover:text-ivory hover:underline hover:decoration-gold underline-offset-4";
const ext = { target: "_blank", rel: "noopener" } as const;

export function Footer() {
  return (
    <footer className="bg-navy text-ivory">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start">
          <Emblem className="mb-4 h-10 w-10" />
          <p className="font-display text-[36px] font-medium leading-none text-ivory">The Reading Room</p>
          <p className="mt-4 flex items-center gap-3 font-display text-[15px] uppercase tracking-[0.22em] text-ivory/90">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            David Rees Brown
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </p>
          <p className="mt-2 font-display text-[15px] italic text-ivory/80">with Claude</p>
        </div>

        <nav aria-label="The Room">
          <h2 className="rr-label mb-5 font-ui! text-gold">The Room</h2>
          <ul className="space-y-3">
            <li><Link to="/" className={colLink}>Home</Link></li>
            <li><Link to="/essays" className={colLink}>Catalogue</Link></li>
            <li><Link to="/about" className={colLink}>About David</Link></li>
          </ul>
        </nav>
        <nav aria-label="Read">
          <h2 className="rr-label mb-5 font-ui! text-gold">Read</h2>
          <ul className="space-y-3">
            <li><a href={SITE.substack} {...ext} className={colLink}>Substack ↗</a></li>
            <li><a href={substackArchive} {...ext} className={colLink}>Essay archive ↗</a></li>
            <li><Link to="/books" className={colLink}>Books</Link></li>
          </ul>
        </nav>
        <nav aria-label="Shelves">
          <h2 className="rr-label mb-5 font-ui! text-gold">Shelves</h2>
          <ul className="space-y-3">
            <li><Link to="/shelves/$shelf" params={{ shelf: "science" }} className={colLink}>Science</Link></li>
            <li><Link to="/shelves/$shelf" params={{ shelf: "philosophy" }} className={colLink}>Philosophy</Link></li>
            <li><Link to="/shelves/$shelf" params={{ shelf: "reflections" }} className={colLink}>Reflections</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-3 px-6 py-6 font-ui text-[14px] text-ivory/75 sm:flex-row">
          <p>© 2026 David Rees Brown. Written with Claude.</p>
          <a href="#top" className="text-ivory/85 no-underline hover:underline hover:decoration-gold underline-offset-4">
            Back to the entrance ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
