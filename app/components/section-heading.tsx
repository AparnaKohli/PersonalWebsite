export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="bg-linear-to-r from-accent via-accent-warm to-accent-violet bg-clip-text font-mono text-xs uppercase tracking-[0.26em] text-transparent">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
