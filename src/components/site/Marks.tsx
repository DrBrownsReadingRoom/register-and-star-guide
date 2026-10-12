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
