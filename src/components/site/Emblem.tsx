export function Emblem({ className = "h-7 w-[34px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <path d="M24 0 L25.3 9.2 L32 10.5 L25.3 11.8 L24 21 L22.7 11.8 L16 10.5 L22.7 9.2Z" fill="var(--rr-gold)" />
      <path
        d="M23 34 C17 29.5 10 28.6 4.5 29.6 L8 22.6 C13.5 21.6 19.5 23.4 23 27.8Z M25 34 C31 29.5 38 28.6 43.5 29.6 L40 22.6 C34.5 21.6 28.5 23.4 25 27.8Z"
        fill="none"
        stroke="var(--rr-gold)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M2 35.5 H22 L24 37 L26 35.5 H46" fill="none" stroke="var(--rr-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
