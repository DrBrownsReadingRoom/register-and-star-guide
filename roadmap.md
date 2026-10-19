# Roadmap

- [x] Replace sample essays and placeholder links with the real content from David's Substack (https://davidrbrown1.substack.com/) — titles, dates, excerpts, archive link, and any real Amazon links surfaced there.
- [x] Match the site to what is live on Substack today (2026-10-12): David is releasing his work slowly, so only "Too Much of a Good Thing" (001, featured) and "Welcome to the Reading Room" (002) are listed. The four withdrawn posts are kept in `src/content/essays.unpublished.md` and their text removed from the catalogue, homepage and further-reading links. Shelves with nothing on them read "Coming soon" and are no longer links.

- [x] David's portrait photograph is live on the About page (src/assets/david-rees-brown.jpg.asset.json), replacing the placeholder note.
- [x] Homepage doorway (2026-10-19, at Mia's request): the labels above the headline read "Science · Philosophy · Reflections" and the headline reads "A private corner of the library". Search/social summary uses the same words.

## Still waiting on David
- Real Amazon links: `SITE.amazonBook`, `SITE.amazonKindle`, `SITE.amazonAuthor` in src/config/site.ts are still placeholders.
- A real description for the book on /books — it still ends "Placeholder description."
- Title and description for the second (in-preparation) book. Its "In the workshop" section was removed from /books on 2026-10-09 at Mia's request; re-add it to `BOOKS` in src/content/books.ts and the workshop block in src/routes/books.tsx when the details are confirmed.
- Whether the Substack tagline "Essays on physics, power, and the money behind both. For the fans, not the players." should be used anywhere on the site.
- Whether the "Recent reading" card row should reappear on the homepage as more essays arrive (it is hidden while only two posts are live), and whether the welcome note should ever appear there.
