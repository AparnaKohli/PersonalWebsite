import Link from "next/link";
import { profile } from "@/lib/profile";

const NAV = [
  { href: "#about", label: "Profile" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#chat", label: "AI Twin" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Previously hard-coded string — now reads from profile so it stays in sync */}
        <Link
          href="#top"
          className="font-serif text-lg tracking-tight text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          {profile.name}
        </Link>
        <nav
          aria-label="Primary"
          className="flex max-w-[70vw] items-center gap-2 overflow-x-auto pb-1 sm:max-w-none sm:justify-end sm:gap-1 sm:pb-0"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-1 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
