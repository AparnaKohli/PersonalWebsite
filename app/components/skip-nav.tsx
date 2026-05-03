export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="fixed left-3 top-3 z-[100] -translate-y-28 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-accent shadow-xs outline-none transition-[transform,colors] hover:bg-accent-soft focus-visible:translate-y-0 dark:shadow-black/40"
    >
      Skip to content
    </a>
  );
}
