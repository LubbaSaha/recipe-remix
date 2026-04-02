import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "rounded-[var(--radius-control)] bg-[var(--color-primary)] px-[var(--space-3)] py-[var(--space-2)] text-sm font-medium text-[var(--color-primary-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  secondary:
    "rounded-[var(--radius-control)] bg-[var(--color-secondary)] px-[var(--space-3)] py-[var(--space-2)] text-sm font-medium text-[var(--color-secondary-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]",
  ghost:
    "rounded-[var(--radius-control)] border border-[var(--color-neutral-border)] bg-transparent px-[var(--space-3)] py-[var(--space-2)] text-sm font-medium text-[var(--color-neutral-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  link: "font-medium text-[var(--color-secondary)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]",
};

export function buttonClasses(variant: ButtonVariant): string {
  return variantClassName[variant];
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonClasses(variant)} ${className}`.trim()}
      {...props}
    />
  );
}
