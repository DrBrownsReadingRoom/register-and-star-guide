import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SubscribeBand } from "@/components/site/SubscribeBand";

function NotFoundComponent() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-28 text-center">
      <p className="rr-label text-goldInk">Not on the shelves</p>
      <h1 className="mt-4 text-[44px] sm:text-[60px]">This volume cannot be found</h1>
      <div className="mx-auto mt-6 h-px w-24 bg-gold" aria-hidden="true" />
      <p className="mt-8 text-slate">It may have been moved, renamed, or never catalogued at all.</p>
      <Link to="/" className="rr-btn rr-btn-primary mt-10">
        Return to the Room <span className="rr-arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="mx-auto max-w-[720px] px-6 py-28 text-center">
      <h1 className="text-[40px]">This page didn't load</h1>
      <p className="mt-6 text-slate">Something went wrong on our end. Try again, or return to the Room.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rr-btn rr-btn-primary"
        >
          Try again
        </button>
        <a href="/" className="rr-btn rr-btn-secondary">Return to the Room</a>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Reading Room — David Rees Brown" },
      { name: "description", content: "Essays and books by David Rees Brown, written with Claude." },
      { name: "author", content: "David Rees Brown" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Source+Sans+3:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body id="top">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:p-3 font-ui">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <SubscribeBand />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
