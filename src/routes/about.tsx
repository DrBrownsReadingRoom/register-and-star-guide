import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { BIO_ASK_LEAD, BIO_BODY, BIO_LEAD, BIO_QUESTION, BIO_SHORT } from "@/content/bio";
import portraitAsset from "@/assets/david-rees-brown.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About David Rees Brown — The Reading Room" },
      { name: "description", content: BIO_SHORT },
      { property: "og:title", content: "About David Rees Brown" },
      { property: "og:description", content: BIO_SHORT },
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
      <figure className="portrait">
        <img src={portraitAsset.url} alt="David Rees Brown" width={550} height={688} />
      </figure>
      <div className="about-text">
        <p className="label gold">About David</p>
        <h1>David Rees Brown</h1>
        <p className="lead">{BIO_LEAD}</p>
        {BIO_BODY.map((para) => <p key={para.slice(0, 28)}>{para}</p>)}
        <p className="bio-ask">{BIO_ASK_LEAD}</p>
        <blockquote className="pull">{BIO_QUESTION}</blockquote>
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
