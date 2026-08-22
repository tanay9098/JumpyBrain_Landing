"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
      suppressHydrationWarning
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
    >
      {/* Both icons render always; CSS (driven by the .dark class next-themes
          sets before hydration) picks the right one with no client-only
          state, so there's no flash or hydration mismatch to work around. */}
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="hidden h-[18px] w-[18px] dark:block">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </g>
      </svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="block h-[18px] w-[18px] dark:hidden">
        <path d="M12 3.5a8.5 8.5 0 1 0 8.5 9.79A7 7 0 0 1 12 3.5Z" fill="currentColor" />
      </svg>
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
