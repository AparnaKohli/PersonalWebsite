import { SectionHeading } from "@/app/components/section-heading";
import { profile } from "@/lib/profile";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="01 · Perspective"
        title="What I optimise for."
        subtitle="Clarity between models and markets — with the judgement that comes from having held both a scalpel and a sprint board."
      />
      <div className="space-y-6 text-[17px] leading-[1.7] text-muted">
        {profile.summary.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-12 rounded-3xl border border-border bg-linear-to-br from-accent-soft/35 via-background/92 to-accent-soft-violet/30 p-8 backdrop-blur-sm sm:flex sm:flex-wrap sm:items-start sm:gap-14 dark:from-accent-soft/12 dark:via-background/88 dark:to-accent-soft-violet/12">
        <div className="sm:w-[48%]">
          <p className="bg-linear-to-r from-accent to-accent-warm bg-clip-text font-mono text-xs uppercase tracking-[0.28em] text-transparent">
            Core competencies
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {profile.skills.map((skill, index) => {
              const dot =
                index % 3 === 0
                  ? "text-accent"
                  : index % 3 === 1
                    ? "text-accent-warm"
                    : "text-accent-violet";
              return (
                <li key={skill} className="flex gap-2">
                  <span className={dot} aria-hidden>
                    ●
                  </span>
                  {skill}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-10 grid gap-10 sm:mt-0 sm:flex-1 sm:grid-cols-2">
          <div>
            <p className="bg-linear-to-r from-accent-warm to-accent-violet bg-clip-text font-mono text-xs uppercase tracking-[0.28em] text-transparent">
              Certifications
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {profile.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="bg-linear-to-r from-accent-violet to-accent bg-clip-text font-mono text-xs uppercase tracking-[0.28em] text-transparent">
              Languages
            </p>
            <p className="mt-4 text-sm text-muted">
              {profile.languages.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
