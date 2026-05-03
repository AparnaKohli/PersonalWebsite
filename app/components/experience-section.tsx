import { SectionHeading } from "@/app/components/section-heading";
import type { Role } from "@/lib/profile";
import { profile } from "@/lib/profile";

function groupByCompany(entries: Role[]) {
  const groups: { company: string; slots: Role[] }[] = [];
  for (const role of entries) {
    const last = groups.at(-1);
    if (last?.company === role.company) {
      last.slots.push(role);
    } else {
      groups.push({ company: role.company, slots: [role] });
    }
  }
  return groups;
}

function Range({ role }: { role: Role }) {
  const end = role.current ? "Present" : (role.end ?? "");
  const range = `${role.start} · ${end}`.trim();
  return (
    <p className="font-mono text-xs uppercase tracking-[0.26em] text-muted">
      {range}
    </p>
  );
}

function BucketRangeSummary({ slots }: { slots: Role[] }) {
  const oldest = slots.at(-1);
  if (!oldest) {
    return null;
  }
  const hasCurrent = slots.some((slot) => slot.current);
  const headlineEnd = hasCurrent ? "Present" : (slots[0]?.end ?? "");
  return (
    <p className="font-mono text-xs uppercase tracking-[0.34em] text-muted">
      {`${oldest.start} — ${headlineEnd}`}
    </p>
  );
}

export function ExperienceSection() {
  const buckets = groupByCompany([...profile.roles]);

  return (
    <section id="experience" className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="02 · Career"
          title="Where I have shipped hardest."
          subtitle="Chronologically honest. Outcome-forward. Confidential dollar figures stay politely redacted, just like on LinkedIn."
        />

        <ol className="space-y-11">
          {buckets.map(({ company, slots }) => (
            <li key={`${company}-${slots[slots.length - 1]?.start ?? slots[0].start}`}>
              <article className="relative overflow-hidden rounded-3xl border border-border bg-background/92 px-8 py-8 sm:px-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-linear-to-b from-accent via-accent-warm to-accent-violet opacity-95"
                />
                <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-serif text-3xl text-foreground">
                      {company}
                    </h3>
                  </div>
                  <BucketRangeSummary slots={slots} />
                </header>

                <div className="mt-9 space-y-10">
                  {slots.map((role) => (
                    <section key={`${company}-${role.title}-${role.start}`}>
                      <div
                        className={
                          company === "Google"
                            ? "flex flex-wrap items-start justify-between gap-y-4"
                            : "flex flex-wrap items-start gap-y-4"
                        }
                      >
                        <div>
                          <p className="font-medium text-[17px] text-foreground">
                            {role.title}
                          </p>
                          {role.location ? (
                            <p className="mt-2 text-sm text-muted">
                              {role.location}
                            </p>
                          ) : null}
                          {role.summary ? (
                            <p className="mt-2 text-sm text-muted">
                              {role.summary}
                            </p>
                          ) : null}
                        </div>
                        {company === "Google" ? (
                          <Range role={role} />
                        ) : null}
                      </div>
                      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
                        {role.highlights.map((item, index) => (
                          <li key={index} className="relative pl-5">
                            <span className="absolute left-1 top-[0.55rem] block size-[5px] rounded-full bg-linear-to-br from-accent to-accent-warm" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
