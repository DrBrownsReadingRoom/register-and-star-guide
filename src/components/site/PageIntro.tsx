import type { ReactNode } from "react";

export function PageIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-12 pt-20">
      <p className="rr-label text-goldInk">{label}</p>
      <h1 className="mt-4 max-w-[18ch] text-[44px] sm:text-[64px]">{title}</h1>
      <div className="mt-6 h-px w-24 bg-gold" aria-hidden="true" />
      {children && <div className="mt-8 max-w-[720px] text-slate">{children}</div>}
    </section>
  );
}
