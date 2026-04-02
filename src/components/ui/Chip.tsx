import type { ComponentPropsWithoutRef } from "react";

export function chipClasses(): string {
  return [
    "inline-flex w-full min-w-0 items-center justify-center",
    "px-[var(--space-3)] py-[var(--space-2)]",
    "text-sm text-[var(--color-neutral-foreground)]",
    "rounded-[var(--radius-chip)] bg-[var(--color-neutral)]",
  ].join(" ");
}

type ChipProps = ComponentPropsWithoutRef<"span">;

export default function Chip({ className = "", ...props }: ChipProps) {
  return <span className={`${chipClasses()} ${className}`.trim()} {...props} />;
}
