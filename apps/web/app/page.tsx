import Link from "next/link";

const ctaBtnPrimary =
  "inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const ctaBtnOutline =
  "inline-flex h-10 items-center justify-center rounded-md border-2 border-border bg-background px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function Page() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-8 bg-background px-4 py-10 sm:gap-10 sm:px-6">
      <section
        aria-labelledby="cta-heading"
        className="w-full max-w-xl rounded-2xl border-2 border-primary/25 bg-primary/5 px-5 py-6 text-center shadow-sm sm:px-8 sm:py-7"
      >
        <h2
          id="cta-heading"
          className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          See the difference between services
        </h2>
        <p className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <span className="block rounded-lg border border-primary/35 bg-primary/15 px-4 py-3 text-center text-base font-semibold tracking-tight text-foreground shadow-sm sm:text-lg">
            Each app loads its own theme and tokens.
          </span>
          <span className="block">
            Open{" "}
            <strong className="font-medium text-foreground">
              Services Docs
            </strong>{" "}
            or{" "}
            <strong className="font-medium text-foreground">
              Services Animation
            </strong>{" "}
            — here or from the header — and compare colors, type, and layout.
          </span>
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/docs" className={ctaBtnPrimary}>
            Open Services Docs
          </Link>
          <Link href="/animation" className={ctaBtnOutline}>
            Open Services Animation
          </Link>
        </div>
      </section>

      <div className="w-full max-w-xl rounded-2xl border-2 border-border bg-card px-6 py-10 text-center text-card-foreground shadow-md sm:px-10 sm:py-12">
        <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          You are on the{" "}
          <span className="text-primary underline decoration-primary/30 decoration-2 underline-offset-4">
            Web
          </span>{" "}
          service{" "}
          <span className="font-normal text-muted-foreground">(host app)</span>
        </p>
        <p className="mt-6 font-mono text-base text-foreground sm:text-lg">
          <span className="font-sans font-medium text-muted-foreground">
            Dev:
          </span>{" "}
          port <span className="font-bold text-primary">3000</span> ·{" "}
          <code className="rounded-md border border-border bg-muted px-2 py-1 text-sm sm:text-base">
            http://localhost:3000
          </code>
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
          Other apps in this repo: Docs on port{" "}
          <span className="font-mono font-semibold text-foreground">3001</span>{" "}
          (
          <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-sm">
            localhost:3001/docs
          </code>
          ), Animation on port{" "}
          <span className="font-mono font-semibold text-foreground">3002</span>.
        </p>
        <p className="mt-8 border-t border-border pt-8 text-left text-base leading-7 text-foreground/95 sm:text-lg sm:leading-8">
          This surface uses the host theme from{" "}
          <code className="whitespace-nowrap rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[0.9em]">
            apps/web/app/globals.css
          </code>
          . Open the Docs app to see a different palette and typography — proof
          that each micro-app ships its own design tokens while still sharing{" "}
          <code className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[0.9em]">
            @repo/ui
          </code>{" "}
          components (header, toggles) that follow whatever theme is active.
        </p>
      </div>
    </main>
  );
}
