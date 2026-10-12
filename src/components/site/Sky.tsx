import { useEffect, useRef } from "react";

/** Celestial graticule drawn once per size. No animation. */
export function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const draw = () => {
      if (!c.offsetWidth) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = c.offsetWidth, h = c.offsetHeight;
      c.width = w * dpr; c.height = h * dpr;
      const x = c.getContext("2d");
      if (!x) return;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.clearRect(0, 0, w, h);
      const cx = w * 0.86, cy = h * 0.5, R = Math.max(w, h) * 0.62;
      x.lineWidth = 1;
      for (let i = 1; i <= 6; i++) {
        x.strokeStyle = `rgba(177,139,73,${i === 6 ? 0.38 : 0.16})`;
        x.beginPath(); x.arc(cx, cy, (R * i) / 6, 0, Math.PI * 2); x.stroke();
      }
      for (let hr = 0; hr < 24; hr++) {
        const a = (hr / 24) * Math.PI * 2 - Math.PI / 2;
        x.strokeStyle = `rgba(177,139,73,${hr % 6 === 0 ? 0.28 : 0.12})`;
        x.beginPath(); x.moveTo(cx + (Math.cos(a) * R) / 6, cy + (Math.sin(a) * R) / 6); x.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); x.stroke();
        for (let t = 0; t < 4; t++) {
          const b = a + (t / 4) * ((Math.PI * 2) / 24);
          const l = t ? 5 : 10;
          x.beginPath(); x.moveTo(cx + Math.cos(b) * R, cy + Math.sin(b) * R); x.lineTo(cx + Math.cos(b) * (R - l), cy + Math.sin(b) * (R - l));
          x.strokeStyle = "rgba(177,139,73,.45)"; x.stroke();
        }
        const lx = cx + Math.cos(a) * (R - 24), ly = cy + Math.sin(a) * (R - 24);
        if (lx > 8 && lx < w - 30 && ly > 14 && ly < h - 6) {
          x.fillStyle = "rgba(177,139,73,.7)"; x.font = "600 10px 'Source Sans 3', Arial, sans-serif"; x.fillText(hr + "h", lx - 6, ly + 3);
        }
      }
      x.font = "italic 13px 'Bodoni Moda', Georgia, serif"; x.fillStyle = "rgba(177,139,73,.6)";
      ([["+60°", 1], ["+30°", 3], ["0°", 5]] as const).forEach(([t, i]) => {
        const r = (R * i) / 6; const px = cx - r * 0.94, py = cy - r * 0.34;
        if (px > 10 && py > 16) x.fillText(t, px, py);
      });
      x.setLineDash([3, 5]); x.strokeStyle = "rgba(231,211,168,.28)"; x.beginPath();
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2; const r = R * (0.55 + 0.18 * Math.sin(a + 0.9));
        const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
        if (i) x.lineTo(px, py); else x.moveTo(px, py);
      }
      x.stroke(); x.setLineDash([]);
      let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < 340; i++) {
        const px = rnd() * w, py = rnd() * h, m = Math.pow(rnd(), 3);
        x.fillStyle = `rgba(249,247,240,${0.25 + m * 0.7})`; x.beginPath(); x.arc(px, py, 0.5 + m * 2, 0, Math.PI * 2); x.fill();
      }
      const con: [number, number][] = [[0.62, 0.22], [0.68, 0.3], [0.74, 0.27], [0.79, 0.36], [0.84, 0.33], [0.9, 0.42]];
      x.strokeStyle = "rgba(177,139,73,.55)"; x.beginPath();
      con.forEach(([a, b], i) => (i ? x.lineTo(a * w, b * h) : x.moveTo(a * w, b * h))); x.stroke();
      con.forEach(([a, b]) => { x.fillStyle = "#F9F7F0"; x.beginPath(); x.arc(a * w, b * h, 2.4, 0, Math.PI * 2); x.fill(); });
      const g = x.createLinearGradient(0, 0, w * 0.7, 0);
      g.addColorStop(0, "rgba(7,29,48,.92)"); g.addColorStop(1, "rgba(7,29,48,0)");
      x.fillStyle = g; x.fillRect(0, 0, w, h);
    };
    draw();
    document.fonts?.ready.then(draw);
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 120); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}

export function TwoSlitPlate() {
  const W = 600, H = 420, bx = 250, s1 = 170, s2 = 250, sx = 60, sy = 210, scr = 540;
  const rings = [];
  for (let r = 22; r < 220; r += 18) rings.push(<circle key={r} cx={sx} cy={sy} r={r} />);
  const waves = [];
  for (let r = 16; r < 330; r += 16) waves.push(<circle key={"a" + r} cx={bx} cy={s1} r={r} />, <circle key={"b" + r} cx={bx} cy={s2} r={r} />);
  const fringes = [];
  for (let y = 24; y < H - 24; y += 3) {
    const d1 = Math.hypot(scr - bx, y - s1), d2 = Math.hypot(scr - bx, y - s2);
    const I = Math.pow(Math.cos((Math.PI * (d1 - d2)) / 16), 2) * Math.exp(-Math.pow((y - 210) / 150, 2));
    fringes.push(<line key={y} x1={scr + 4} y1={y} x2={scr + 4 + 4 + I * 30} y2={y} stroke="#B18B49" strokeWidth="1.6" opacity={(0.25 + I * 0.75).toFixed(2)} />);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line engraving of the two-slit experiment: a source, a barrier with two openings, spreading waves and banded light on a screen">
      <defs>
        <clipPath id="rc"><rect x={bx} y="0" width={scr - bx} height={H} /></clipPath>
        <clipPath id="lc"><rect x="0" y="0" width={bx} height={H} /></clipPath>
      </defs>
      <g fill="none" stroke="#071D30" strokeWidth="1" clipPath="url(#lc)" opacity=".55">{rings}</g>
      <circle cx={sx} cy={sy} r="6" fill="#071D30" />
      <g fill="none" stroke="#071D30" strokeWidth=".9" clipPath="url(#rc)" opacity=".5">{waves}</g>
      <g fill="#071D30">
        <rect x={bx - 4} y="20" width="8" height={s1 - 8 - 20} />
        <rect x={bx - 4} y={s1 + 8} width="8" height={s2 - s1 - 16} />
        <rect x={bx - 4} y={s2 + 8} width="8" height={H - 20 - s2 - 8} />
      </g>
      <line x1={scr} y1="20" x2={scr} y2={H - 20} stroke="#071D30" strokeWidth="2" />
      {fringes}
      <g fontFamily="Bodoni Moda, Georgia, serif" fontStyle="italic" fontSize="15" fill="#40515B">
        <text x={sx - 10} y={sy + 40}>a.</text>
        <text x={bx + 12} y={36}>b.</text>
        <text x={scr - 28} y={H - 28}>c.</text>
      </g>
    </svg>
  );
}

/** Line engraving of swells rising, breaking at a mark, and running flat to the shore. */
export function WavePlate() {
  const W = 600, H = 420, shore = 522, brk = 412;
  const swell = [];
  const run = [];
  const crests = [];
  for (let i = 0; i < 14; i++) {
    const y0 = 42 + i * 26, ph = i * 0.85;
    const a: string[] = [], b: string[] = [];
    for (let x = 26; x <= brk; x += 6) {
      const g = (x - 26) / (brk - 26);
      a.push(`${x},${(y0 + Math.sin(x / 30 + ph) * (2 + g * 13)).toFixed(1)}`);
    }
    for (let x = brk; x <= shore; x += 6) {
      const d = 1 - (x - brk) / (shore - brk);
      b.push(`${x},${(y0 + Math.sin(brk / 30 + ph) * 15 * d * d).toFixed(1)}`);
    }
    swell.push(<polyline key={"s" + i} points={a.join(" ")} />);
    run.push(<polyline key={"r" + i} points={b.join(" ")} />);
    crests.push(<circle key={"c" + i} cx={brk} cy={y0 + Math.sin(brk / 30 + ph) * 15} r="2" />);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line engraving of swells rising, breaking at a mark, and running flat to the shore">
      <g fill="none" stroke="#071D30" strokeWidth="1" opacity=".62">{swell}</g>
      <g fill="none" stroke="#071D30" strokeWidth="1" opacity=".3">{run}</g>
      <g fill="#B18B49">{crests}</g>
      <line x1={shore} y1="24" x2={shore} y2={H - 24} stroke="#071D30" strokeWidth="2" />
      <g fontFamily="Bodoni Moda, Georgia, serif" fontStyle="italic" fontSize="15" fill="#40515B">
        <text x="30" y="36">a.</text>
        <text x={brk - 8} y="36">b.</text>
        <text x={shore + 12} y={H - 30}>c.</text>
      </g>
    </svg>
  );
}
