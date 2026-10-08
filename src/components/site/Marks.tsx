import type { Register } from "@/content/essays";

export const REG_NAME: Record<Register, string> = { evidence: "Evidence", inference: "Inference", speculation: "Speculation" };

export function RegIcon({ kind }: { kind: Register }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      {kind === "evidence" && <circle cx="6" cy="6" r="5" fill="var(--navy)" />}
      {kind === "inference" && (
        <>
          <circle cx="6" cy="6" r="4.5" fill="none" stroke="var(--navy)" strokeWidth="1.3" />
          <path d="M6 1.5 A4.5 4.5 0 0 1 6 10.5Z" fill="var(--navy)" />
        </>
      )}
      {kind === "speculation" && (
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="var(--navy)" strokeWidth="1.3" strokeDasharray="2 1.6" />
      )}
    </svg>
  );
}

export function Reg({ kind, children }: { kind: Register; children?: React.ReactNode }) {
  return (
    <span className="reg">
      <RegIcon kind={kind} />
      {children ?? REG_NAME[kind]}
    </span>
  );
}

export function Star({ fill = "currentColor", className }: { fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill={fill} className={className} aria-hidden="true">
      <path d="M7 0 L8 6 L14 7 L8 8 L7 14 L6 8 L0 7 L6 6Z" />
    </svg>
  );
}

export function StarRule() {
  return (
    <p className="star-rule" aria-hidden="true">
      <Star />
    </p>
  );
}
