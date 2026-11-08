<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Pensamientos content and pure UTC daily selection live in src/content/pensamientos.ts; the homepage loader supplies the initial selection to keep server and browser rendering consistent.
- Site chrome (Header, SubscribeBand, Footer) is rendered once in `src/routes/__root.tsx` RootShell — so every page, including 404, gets it.
- Brand tokens live in `src/styles.css` (`--rr-*` vars mapped to Tailwind colors/fonts; radius forced to 0) — Tailwind v4 has no config file.
- External URLs only in `src/config/site.ts`; essay filing overrides only in `src/content/essays.meta.ts`; David's supplied biography wording only in `src/content/bio.ts`; David's supplied homepage letter wording only in `src/content/letter.ts` — single source for content edits.
- Page styling is ported from the client's reference kit into `src/kit.css` (plain class names inside `@layer components`) — keeps pages matching the approved reference; books live in `src/content/books.ts`.
- Shelf visibility and book purchase eligibility use the pure rules in `src/lib/site-presentation.ts`, so availability can be tested independently of page markup.
- Paper listings (number, title, abstract, which essays each backs via `essaySlugs`, registered DOI via `doi`) live in `src/content/papers.ts`; full paper texts live in `src/content/library/papers.json` and are served one at a time by a server function — keeps the header and list pages light. The header's Papers link renders only while the list is non-empty.
- The catalogue = live Substack posts (`src/lib/substack.server.ts` → `src/lib/essays.functions.ts`) merged with David's collection in `src/content/library/essays.json` (`buildFullCatalogue` in `src/lib/essays.sync.ts`). A post on Substack is shown from Substack (matched by slug or title, keeping the collection's number and shelf); a collection essay not on Substack is marked `local` and shows no Substack link. The list query carries no essay text; each essay page fetches its own text. `src/content/essays.ts` is only the offline snapshot used when Substack cannot be reached; never add or remove an essay there. Filing overrides go in `src/content/essays.meta.ts`.
- Essay and paper bodies share one block format rendered by `src/components/site/Prose.tsx` (headings, quotes, lists, tables, formulas, internal links) — the collection files were generated from David's HTML in that format.
