export function Emblem({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="var(--rr-gold)" strokeWidth="1.4">
      <path d="M20 4.5l1.6 3.4 3.7.4-2.8 2.5.8 3.6L20 12.6l-3.3 1.8.8-3.6-2.8-2.5 3.7-.4z" fill="var(--rr-gold)" stroke="none" />
      <path d="M20 20c-4-2.6-9-3.2-14-2.6v16.2c5-.6 10 0 14 2.6 4-2.6 9-3.2 14-2.6V17.4c-5-.6-10 0-14 2.6z" />
      <path d="M20 20v16.2" />
    </svg>
  );
}
