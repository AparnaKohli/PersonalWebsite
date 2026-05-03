import { SectionHeading } from "@/app/components/section-heading";
import { telHref, whatsAppHref } from "@/lib/contact-links";
import { gmailComposeHref } from "@/lib/gmail-links";
import { profile } from "@/lib/profile";

export function ContactSection() {
  const wa = whatsAppHref(profile.phoneWaMe);
  const tel = telHref(profile.phoneDisplay);

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="06 · Contact"
        title="Contact me"
        subtitle="Direct lines for a quick sync — whether you are hiring, partnering, or debating which metric should move first."
      />

      <div className="rounded-3xl border border-border bg-linear-to-br from-accent-soft/40 via-background/95 to-accent-soft-warm/35 p-8 backdrop-blur-sm sm:p-10 dark:from-accent-soft/12 dark:via-background/90 dark:to-accent-soft-warm/12">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
              Mobile
            </dt>
            <dd className="mt-3">
              <a
                href={tel}
                className="font-serif text-2xl text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                {profile.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
              WhatsApp
            </dt>
            <dd className="mt-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border bg-accent-soft-warm/50 px-5 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:border-accent-warm hover:text-accent-warm dark:bg-accent-soft-warm/25"
              >
                Message {profile.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-muted">
                Opens WhatsApp with this number preselected.
              </p>
            </dd>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <dt className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
              Email
            </dt>
            <dd className="mt-3">
              <a
                href={gmailComposeHref(
                  profile.email,
                  "Hello — reached out via your site",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[15px] font-medium text-accent underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
