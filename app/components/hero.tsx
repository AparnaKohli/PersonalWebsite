import { gmailComposeHref } from "@/lib/gmail-links";
import { profile } from "@/lib/profile";

export function Hero() {
  const conversationSubject = "Hello — from your site";

  return (
    <section
      id="top"
      className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-10 shadow-[0_38px_100px_-40px_color-mix(in_oklab,var(--accent-violet)_42%,transparent),0_32px_80px_-50px_color-mix(in_oklab,var(--accent-warm)_38%,transparent)] sm:px-10 sm:py-14 dark:shadow-black/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent-soft)_90%,transparent)_0%,transparent_42%,color-mix(in_oklab,var(--accent-soft-violet)_75%,transparent)_100%)] opacity-95 dark:bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent-soft)_22%,transparent)_0%,transparent_45%,color-mix(in_oklab,var(--accent-soft-violet)_18%,transparent)_100%)]"
        />

        <div className="relative space-y-8">
          <p className="max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-accent sm:text-xs sm:tracking-[0.22em]">
            Applied ML including LLMs · Product · Platforms
          </p>

          <div className="space-y-6">
            <h1
              id="hero-heading"
              className="font-serif text-4xl leading-[1.12] tracking-[-0.02em] text-foreground sm:text-5xl"
            >
              {profile.headline}
            </h1>
            <p className="font-serif italic text-muted">
              Former stethoscope owner. Present-day champion of humane metrics.
            </p>
            <p className="text-lg text-muted">{profile.shortTitle}</p>
            <p className="text-base text-muted">{profile.location}</p>
          </div>

          {/* Full-width row stays inside horizontal padding */}
          <div className="flex w-full max-w-full min-w-0 flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <a
              href={gmailComposeHref(profile.email, conversationSubject)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-violet px-6 py-3 text-center text-[15px] font-medium leading-snug text-white shadow-md ring-1 ring-white/25 transition-opacity hover:opacity-[0.95] sm:w-auto sm:min-w-0 dark:from-accent dark:to-accent-violet dark:text-stone-950 dark:ring-white/15"
            >
              Start a conversation
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full border border-border bg-accent-soft-violet/65 px-6 py-3 text-center text-[15px] font-medium leading-snug text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:w-auto sm:min-w-0 dark:bg-accent-soft-violet/35"
            >
              View LinkedIn profile
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full border border-border bg-accent-soft-warm/60 px-6 py-3 text-center text-[15px] font-medium leading-snug text-foreground backdrop-blur-sm transition-colors hover:border-accent-warm hover:text-accent-warm sm:w-auto sm:min-w-0 dark:bg-accent-soft-warm/35"
            >
              GitHub repositories
            </a>
          </div>
        </div>
      </div>
      <dl className="mt-14 grid gap-10 sm:grid-cols-3">
        {[
          [
            "> $500M+",
            "Revenue surfaced across personalisation, monetisation, and measurement programmes.",
          ],
          ["Global & APAC operators", profile.companies.slice(0, 5).join(" · ")],
          [
            "12+ years",
            "Consumer, commerce, Ads, subscriptions, nonprofit health — stitched with ML.",
          ],
        ].map(([k, v]) => (
          <div key={k as string}>
            <dt className="bg-linear-to-br from-accent to-accent-warm bg-clip-text font-serif text-2xl text-transparent">
              {k}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
