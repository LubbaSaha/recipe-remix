import type { InputHTMLAttributes } from "react";

export function inputClasses(): string {
  return [
    "w-full px-[var(--space-3)] py-[var(--space-2)]",
    "rounded-[var(--radius-control)]",
    "border border-[var(--color-neutral-border)]",
    "bg-[var(--color-neutral)] text-[var(--color-neutral-foreground)]",
    "placeholder:text-[var(--color-neutral-foreground)]",
    "focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
  ].join(" ");
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return <input className={`${inputClasses()} ${className}`.trim()} {...props} />;
}
