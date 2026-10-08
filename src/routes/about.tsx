import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About David Rees Brown — The Reading Room" },
      { name: "description", content: "David Rees Brown writes short essays on the open problems of physics, with Claude doing the groundwork." },
      { property: "og:title", content: "About David Rees Brown" },
      { property: "og:description", content: "An Irishman in America who writes essays on the open problems of physics, with Claude." },
    ],
  }),
  component: AboutPage,
});

const ext = { target: "_blank", rel: "noopener" } as const;

const METHOD = [
  ["A thesis", "David starts with a claim he can’t shake, usually a plain question about a complicated answer."],
  ["The groundwork", "Claude gathers the science, the history and the strongest objections."],
  ["The argument", "Question and answer, with every answer challenged until something holds."],
  ["The essay", "David writes it in his own voice and takes the credit, and the heat."],
];

function AboutPage() {
  return (
    <div className="wrap about">
      <div className="portrait">
        <span>Portrait of David<br />(photograph to come: reading table, natural light)</span>
      </div>
      <div className="about-text">
        <p className="label gold">About David</p>
        <h1>David Rees Brown</h1>
        <p className="lead">An Irishman living in America who deals horses for pleasure and writes short essays on the open problems of physics for anyone who has ever wondered whether the experts are overcomplicating things.</p>
        <p>David describes himself as “pro thought over pro data.” His essays are opinion pieces, not dissertations: they point out that all science, like all life, is approximate, subjective and shaped by who pays for it.</p>
        <h2 style={{ fontSize: 30, fontWeight: 500, marginTop: 44 }}>How the essays are made</h2>
        <ol className="method">
          {METHOD.map(([t, d]) => (
            <li key={t}><div><b>{t}</b><span>{d}</span></div></li>
          ))}
        </ol>
        <div className="about-links">
          <a href={SITE.substack} {...ext} className="btn btn-primary">Follow on Substack <span aria-hidden="true">↗</span></a>
          <a href={SITE.amazonAuthor} {...ext} className="btn btn-secondary">Amazon author page <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}
