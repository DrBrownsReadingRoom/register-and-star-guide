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
- Site chrome (Header, SubscribeBand, Footer) is rendered once in `src/routes/__root.tsx` RootShell — so every page, including 404, gets it.
- Brand tokens live in `src/styles.css` (`--rr-*` vars mapped to Tailwind colors/fonts; radius forced to 0) — Tailwind v4 has no config file.
- External URLs only in `src/config/site.ts`; essays only in `src/content/essays.ts`; David's supplied biography wording only in `src/content/bio.ts`; David's supplied homepage letter wording only in `src/content/letter.ts` — single source for content edits.
- Page styling is ported from the client's reference kit into `src/kit.css` (plain class names inside `@layer components`) — keeps pages matching the approved reference; books live in `src/content/books.ts`.
