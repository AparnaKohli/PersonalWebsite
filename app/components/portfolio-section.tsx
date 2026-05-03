import { SectionHeading } from "@/app/components/section-heading";
import { gmailComposeHref } from "@/lib/gmail-links";
import { profile } from "@/lib/profile";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 · Portfolio"
          title="Case studies in the oven."
          subtitle="The best stories need charts, partner sign-off, and just a little more sleep. For now, this is a deliberate placeholder — not an accident."
        />
        <div className="rounded-3xl border-2 border-dashed border-accent/45 bg-linear-to-br from-accent-soft/50 via-background/95 to-accent-soft-warm/45 p-10 text-center shadow-sm shadow-accent-violet/10 backdrop-blur-sm sm:p-14 dark:from-accent-soft/15 dark:via-background/90 dark:to-accent-soft-warm/10">
          <p className="font-serif text-2xl text-foreground sm:text-3xl">
            Deep dives on personalisation, emerging-market growth, and measurement
            trust are en route.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted">
            If you are hiring for a role where this blend matters, the portfolio
            will follow the real work — but the résumé above is current, detailed,
            and battle-tested.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={gmailComposeHref(
                profile.email,
                "Portfolio preview request — from site",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-violet px-6 text-[15px] font-medium leading-snug text-white shadow-md ring-1 ring-white/20 transition-opacity hover:opacity-[0.95] dark:text-stone-950 dark:ring-white/10"
            >
              Request a walkthrough
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-[15px] font-medium text-foreground hover:border-accent hover:text-accent"
            >
              See public wins on LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-[15px] font-medium text-foreground hover:border-accent-warm hover:text-accent-warm"
            >
              Browse GitHub
            </a>
          </div>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            Friendly ETA: when NDAs allow bragging
          </p>
        </div>
      </div>
    </section>
  );
}
