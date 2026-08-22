"use client";

import { cn } from "@/lib/cn";

export function OptionCard({
  icon,
  label,
  selected,
  onSelect,
  type,
  name,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  type: "radio" | "checkbox";
  name: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-jb-md border-2 px-4 py-3.5 text-left transition-all duration-150",
        selected
          ? "border-brand-purple bg-surface-active"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover"
      )}
    >
      <input
        type={type}
        name={name}
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-elevated text-lg"
      >
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-text-primary sm:text-base">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          type === "checkbox" && "rounded-md",
          selected ? "border-brand-purple bg-brand-purple text-white" : "border-border-strong"
        )}
      >
        {selected ? (
          <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
            <path
              d="M2 6l2.5 2.5L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </label>
  );
}
