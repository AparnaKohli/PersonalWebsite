import { SectionHeading } from "@/app/components/section-heading";
import { profile } from "@/lib/profile";

export function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="03 · Education"
        title="Credential stack — clinical, computational, commercial."
        subtitle="The through-line: comfort with rigor, uncertainty, and translation between experts and users."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {profile.education.map((entry) => (
          <article
            key={`${entry.school}-${entry.years}`}
            className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-7"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                {entry.years}
              </p>
              <h3 className="mt-4 font-serif text-2xl text-foreground">
                {entry.school}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {entry.degree}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
