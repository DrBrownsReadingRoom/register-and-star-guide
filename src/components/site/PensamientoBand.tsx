import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { dailyPensamiento } from "@/content/pensamientos";

export function PensamientoBand({ initialDate }: { initialDate: string }) {
  const [line, setLine] = useState(() => dailyPensamiento(new Date(initialDate)));

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      const now = new Date();
      setLine(dailyPensamiento(now));
      const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
      timer = setTimeout(refresh, midnight - now.getTime() + 100);
    };
    refresh();
    return () => clearTimeout(timer);
  }, [initialDate]);

  if (!line) return null;
  return (
    <section className="pensamiento-band" aria-labelledby="pensamiento-label">
      <div className="wrap pensamiento-band-in">
        <div>
          <h2 id="pensamiento-label" className="label gold">Pensamientos</h2>
          <p className="pensamiento-no tnum">P · {line.no}</p>
        </div>
        <p className="pensamiento-daily">{line.text}</p>
        <Link to="/pensamientos" className="pensamiento-link">All of them →</Link>
      </div>
    </section>
  );
}