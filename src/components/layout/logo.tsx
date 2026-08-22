import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-purple),var(--brand-blue))] text-sm font-extrabold text-white shadow-[0_4px_14px_-4px_rgba(124,108,246,0.6)]"
      >
        JB
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight">
          <span className="text-text-primary">Jumpy</span>
          <span className="jb-gradient-text">Brain</span>
        </span>
        <span className="text-[11px] font-medium text-text-muted">Focus. Do more.</span>
      </span>
    </span>
  );
}
