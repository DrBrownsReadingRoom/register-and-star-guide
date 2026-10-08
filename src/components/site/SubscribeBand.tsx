import { useState, type FormEvent } from "react";
import { subscribeUrl } from "@/config/site";

export function SubscribeBand() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    window.open(subscribeUrl(email.trim()), "_blank", "noopener");
  };

  return (
    <section aria-labelledby="subscribe-heading" className="border-t border-navy/14 bg-parchment">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="rr-label text-goldInk">Return to the Room</p>
          <h2 id="subscribe-heading" className="mt-3 text-[34px] sm:text-[42px]">New essays, delivered by Substack</h2>
          <p className="mt-3 text-slate">One letter when a new essay is shelved. Free, and easy to leave.</p>
        </div>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row">
            <label htmlFor="subscribe-email" className="sr-only">Email address</label>
            <input
              id="subscribe-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 border border-navy bg-ivory px-4 py-[13px] font-ui text-[17px] text-navy placeholder:text-slate focus-visible:outline-offset-0 sm:border-r-0"
            />
            <button type="submit" className="rr-btn rr-btn-primary justify-center">
              Subscribe <span className="rr-arrow" aria-hidden="true">→</span>
            </button>
          </form>
          <p className="mt-3 font-ui text-[14px] text-slate">Subscriptions are handled by Substack.</p>
        </div>
      </div>
    </section>
  );
}
