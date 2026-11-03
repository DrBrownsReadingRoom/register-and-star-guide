import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

/**
 * The block format every essay and paper body is written in. Blocks are separated
 * by blank lines:
 *   "## " heading, "### " sub-heading, "> " pull quote, "%% " formula,
 *   lines of "- " (list), lines of "1. " (numbered list), lines of "| " (table, first row = header).
 * Inline: **bold**, _italic_, ~subscript~, [label](https://…) or [label](/essays/slug).
 */

const TOKEN = /\*\*[^*]+\*\*|_[^_]+_|~[^~\s]+~|\[[^\]]+\]\([^)\s]+\)/g;

/** A line break inside a block (verse, addresses) stays a line break. */
function lines(text: string, key: string): ReactNode[] {
  return text.split("\n").flatMap((t, i) => (i ? [<br key={`${key}-br${i}`} />, t] : [t]));
}

function link(label: string, href: string, key: string): ReactNode {
  const essay = /^\/essays\/([^/?#]+)$/.exec(href);
  if (essay) return <Link key={key} to="/essays/$slug" params={{ slug: essay[1]! }}>{label}</Link>;
  const paper = /^\/papers\/([^/?#]+)$/.exec(href);
  if (paper) return <Link key={key} to="/papers/$slug" params={{ slug: paper[1]! }}>{label}</Link>;
  if (/^https?:\/\//i.test(href))
    return (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  return label;
}

/** Bold, italic, subscript and links — the only marks a body is allowed to carry. */
export function inline(text: string, k = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    const key = `${k}-${at}`;
    if (at > last) out.push(...lines(text.slice(last, at), `${key}t`));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={key}>{inline(t.slice(2, -2), key)}</strong>);
    else if (t.startsWith("_")) out.push(<em key={key}>{inline(t.slice(1, -1), key)}</em>);
    else if (t.startsWith("~")) out.push(<sub key={key}>{t.slice(1, -1)}</sub>);
    else {
      const l = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(t);
      out.push(link(l?.[1] ?? t, l?.[2] ?? "", key));
    }
    last = at + t.length;
  }
  if (last < text.length) out.push(...lines(text.slice(last), `${k}-end`));
  return out;
}

const every = (rows: string[], re: RegExp) => rows.length > 0 && rows.every((r) => re.test(r));
const cells = (row: string) => row.replace(/^\|\s*/, "").split(" | ");

export function Prose({ text, quoteCite = "From the essay" }: { text: string; quoteCite?: string }) {
  let first = true;
  return (
    <>
      {text.split(/\n\s*\n/).map((raw, i) => {
        const b = raw.trim();
        const rows = b.split("\n");
        const k = `b${i}`;
        if (b.startsWith("### ")) return <h3 key={i}>{inline(b.slice(4), k)}</h3>;
        if (b.startsWith("## ")) return <h2 key={i}>{inline(b.slice(3), k)}</h2>;
        if (b.startsWith("> "))
          return (
            <aside key={i} className="pull">
              “{inline(b.slice(2), k)}”<cite>{quoteCite}</cite>
            </aside>
          );
        if (b.startsWith("%% ")) return <p key={i} className="formula">{inline(b.slice(3), k)}</p>;
        if (every(rows, /^- /))
          return (
            <ul key={i} className="prose-list">
              {rows.map((r, j) => <li key={j}>{inline(r.slice(2), `${k}-${j}`)}</li>)}
            </ul>
          );
        if (every(rows, /^\d+\. /)) {
          const start = Number(/^(\d+)\./.exec(rows[0]!)?.[1] ?? 1);
          return (
            <ol key={i} className="prose-list" start={start}>
              {rows.map((r, j) => <li key={j}>{inline(r.replace(/^\d+\.\s/, ""), `${k}-${j}`)}</li>)}
            </ol>
          );
        }
        if (every(rows, /^\| /)) {
          const [head, ...body] = rows;
          return (
            <div key={i} className="prose-table">
              <table>
                <thead>
                  <tr>{cells(head!).map((c, j) => <th key={j} scope="col">{inline(c, `${k}-h${j}`)}</th>)}</tr>
                </thead>
                <tbody>
                  {body.map((r, j) => (
                    <tr key={j}>{cells(r).map((c, n) => <td key={n}>{inline(c, `${k}-${j}-${n}`)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        // The opening drop capital goes on the first real paragraph, not an italic epigraph.
        const epigraph = /^_[^_]+_$/.test(b);
        const cls = first && !epigraph ? "first" : epigraph ? "epigraph" : undefined;
        if (!epigraph) first = false;
        return (
          <p key={i} className={cls}>
            {inline(b, k)}
          </p>
        );
      })}
    </>
  );
}

export const ProseFragment = Fragment;
