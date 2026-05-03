import { profile } from "@/lib/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-28 border-t border-border bg-background/65 py-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="font-serif text-lg text-foreground">{profile.name}</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            {profile.shortTitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <a
            className="text-accent underline-offset-4 hover:underline"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
          <a
            className="text-accent underline-offset-4 hover:underline"
            href={profile.linkedIn}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a
            className="text-accent underline-offset-4 hover:underline"
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-5xl px-4 text-center font-mono text-[11px] text-muted sm:px-6 lg:px-8">
        Built with care and too many coffees · {year} · Gemini helps with the commas; judgement is still analog.
      </p>
    </footer>
  );
}
