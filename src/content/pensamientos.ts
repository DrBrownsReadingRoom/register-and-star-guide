export interface Pensamiento {
  no: string;
  text: string;
  added: string;
  essaySlug?: string;
}

export const PENSAMIENTOS: Pensamiento[] = [
  { no: "001", text: "We fight, we lose, we die, and the next person steps to the line.", added: "2026-10-20" },
  { no: "002", text: "Reality doesn't have a choice. We do.", added: "2026-10-20" },
  { no: "003", text: "Always is not a word in science.", added: "2026-10-20" },
  { no: "004", text: "Prediction does not equal truth.", added: "2026-10-20" },
  { no: "005", text: "What works at one scale does not ipso facto work at all scales.", added: "2026-10-20" },
  { no: "006", text: "You can't know before you feel.", added: "2026-10-20" },
  { no: "007", text: "The chart is only our description of the ocean, not the ocean itself.", added: "2026-10-20" },
  { no: "008", text: "Four theaters, one movie.", added: "2026-10-20" },
];

/** One-based day of year, using UTC so every visitor sees the same line. */
export function dailyPensamiento(date: Date, lines: readonly Pensamiento[] = PENSAMIENTOS): Pensamiento | undefined {
  const day = Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - Date.UTC(date.getUTCFullYear(), 0, 0)) / 86_400_000);
  return lines.length ? lines[day % lines.length] : undefined;
}

export function newestPensamientos(lines: readonly Pensamiento[] = PENSAMIENTOS): Pensamiento[] {
  return [...lines].sort((a, b) => b.added.localeCompare(a.added) || Number(b.no) - Number(a.no));
}