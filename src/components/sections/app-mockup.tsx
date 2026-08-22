import { cn } from "@/lib/cn";

/**
 * A faithful, hand-built recreation of the JumpyBrain "Today" dashboard,
 * used across the marketing site instead of raster screenshots so it stays
 * crisp at any size and adapts automatically to the site's light/dark theme.
 */
export function AppMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="JumpyBrain dashboard showing today's focus task, an energy check-in, quick actions, and Focus Shield status"
      className={cn(
        "relative isolate overflow-hidden rounded-jb-xl border border-border-strong bg-surface jb-card-shadow",
        className
      )}
    >
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <aside className="hidden w-[210px] shrink-0 flex-col border-r border-border bg-bg-elevated px-4 py-5 sm:flex">
          <div className="flex items-center gap-2 px-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--brand-purple),var(--brand-blue))] text-[11px] font-extrabold text-white">
              JB
            </span>
            <div className="leading-none">
              <p className="text-[13px] font-bold">
                <span className="text-text-primary">Jumpy</span>
                <span className="jb-gradient-text">Brain</span>
              </p>
              <p className="text-[9px] text-text-muted">Focus. Do more.</p>
            </div>
          </div>

          <nav aria-hidden="true" className="mt-5 flex flex-col gap-0.5">
            <MockNavItem label="Today" active />
            <MockNavItem label="Tasks" />
            <MockNavItem label="Schedule" />
            <MockNavItem label="Progress" />
          </nav>

          <p className="mt-5 px-3 text-[9px] font-semibold uppercase tracking-wider text-text-muted">
            More
          </p>
          <nav aria-hidden="true" className="mt-1 flex flex-col gap-0.5">
            <MockNavItem label="Focus Timer" />
            <MockNavItem label="Focus Shield" />
            <MockNavItem label="Mindfulness" />
          </nav>

          <div className="mt-auto flex items-center gap-2 rounded-jb-sm border border-border bg-surface px-3 py-2.5">
            <span aria-hidden="true" className="text-sm">
              💀
            </span>
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    i === 0 ? "bg-accent-amber" : "bg-border-strong"
                  )}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
            <div className="h-4 w-16 rounded bg-surface-active sm:hidden" />
            <p className="hidden text-sm font-semibold text-text-primary sm:block">Today</p>
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-full border border-border" />
              <span className="h-7 w-7 rounded-full border border-border" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-purple),var(--brand-blue))] text-[10px] font-bold text-white">
                TD
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
            <div>
              <p className="text-lg font-bold text-text-primary sm:text-xl">
                Good afternoon, Tanay
              </p>
              <p className="text-xs text-text-secondary sm:text-sm">
                Your ADHD command centre
              </p>
            </div>

            {/* Energy check */}
            <div className="rounded-jb-md border border-border bg-bg-elevated p-3 sm:p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                How&rsquo;s your energy right now?
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                {["💀", "😔", "😐", "⚡", "🔥"].map((emoji, i) => (
                  <span
                    key={emoji}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg border text-base sm:h-10 sm:w-10",
                      i === 0
                        ? "border-2 border-accent-amber bg-surface-active"
                        : "border-border bg-surface"
                    )}
                  >
                    {emoji}
                  </span>
                ))}
                <span className="ml-1 hidden text-xs text-text-muted sm:inline">
                  Exhausted
                </span>
              </div>
            </div>

            {/* What next */}
            <div className="rounded-jb-md border border-border-strong bg-[linear-gradient(135deg,rgba(124,108,246,0.1),rgba(63,185,245,0.05))] p-3 sm:p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-purple">
                <span aria-hidden="true">⚡</span> What next?
              </p>
              <p className="mt-2 truncate text-sm font-semibold text-text-primary sm:text-base">
                Write tomorrow&rsquo;s top 3 tasks
              </p>
              <p className="mt-0.5 text-xs text-accent-red">Due in ~2h</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[linear-gradient(90deg,var(--brand-purple),var(--brand-blue))] px-4 text-xs font-semibold text-white">
                  ▶ Start Focus
                </span>
                <span className="inline-flex h-8 items-center rounded-full border border-border px-3 text-xs font-medium text-text-secondary">
                  View all tasks
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <MockStat label="Tasks done" color="bg-accent-green" />
              <MockStat label="Focus mins" color="bg-brand-purple" />
              <MockStat label="Day streak" color="bg-accent-amber" />
            </div>
          </div>
        </div>

        {/* Right column */}
        <aside className="hidden w-[190px] shrink-0 flex-col gap-3 border-l border-border px-4 py-5 md:flex">
          <div className="rounded-jb-md border border-border bg-bg-elevated p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Quick actions
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              <span className="rounded-lg bg-[linear-gradient(90deg,var(--brand-purple),var(--brand-blue))] px-2.5 py-2 text-[11px] font-semibold text-white">
                🎯 Start Focus Session
              </span>
              <span className="rounded-lg border border-border-strong bg-surface-active px-2.5 py-2 text-[11px] font-medium text-text-primary">
                🧠 Brain Dump → Tasks
              </span>
              <span className="rounded-lg border border-border px-2.5 py-2 text-[11px] font-medium text-text-secondary">
                🛡 Manage Focus Shield
              </span>
            </div>
          </div>

          <div className="rounded-jb-md border border-border bg-bg-elevated p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                🛡 Focus Shield
              </p>
              <span className="h-4 w-7 rounded-full bg-surface-active" />
            </div>
            <div className="mt-2 flex gap-3 text-[10px]">
              <span className="font-bold text-brand-purple">0 blocked</span>
              <span className="font-bold text-accent-green">0 whitelisted</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function MockNavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium",
        active
          ? "bg-surface-active text-brand-purple dark:text-brand-cyan"
          : "text-text-secondary"
      )}
    >
      {label}
    </span>
  );
}

function MockStat({ label, color }: { label: string; color: string }) {
  return (
    <div className="rounded-jb-md border border-border bg-bg-elevated p-2.5 sm:p-3">
      <span className={cn("block h-0.5 w-6 rounded-full", color)} />
      <p className="mt-2 text-[9px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </p>
    </div>
  );
}
