import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-jb-lg border border-border bg-surface jb-card-shadow",
        className
      )}
      {...rest}
    />
  );
}
