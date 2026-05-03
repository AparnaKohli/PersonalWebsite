import { profile } from "@/lib/profile";

export function BrandStrip() {
  return (
    <section
      className="border-y border-border bg-linear-to-r from-accent-soft/40 via-accent-soft-warm/35 to-accent-soft-violet/40 py-12"
      aria-label="Organizations"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          Teams scaling with me lately
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-xl font-semibold tracking-tight sm:text-2xl md:gap-x-14">
          {profile.companies.map((name, index) => {
            const tone =
              index % 3 === 0
                ? "text-accent"
                : index % 3 === 1
                  ? "text-accent-warm"
                  : "text-accent-violet";
            return (
              <span key={name} className={`select-none ${tone}`}>
                {name}
              </span>
            );
          })}
          <span className="rounded-full bg-accent-soft-violet/65 px-4 py-1 text-[15px] font-semibold text-accent-violet backdrop-blur-sm dark:bg-accent-soft-violet/40">
            …
          </span>
        </div>
      </div>
    </section>
  );
}
