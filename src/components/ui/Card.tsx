import type { ComponentPropsWithoutRef } from "react";

type CardVariant = "interactive" | "panel";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant: CardVariant;
};

const variantClassName: Record<CardVariant, string> = {
  interactive:
    "shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]",
  panel: "shadow-[var(--shadow-panel)]",
};

export default function Card({
  variant,
  className = "",
  ...props
}: CardProps) {
  const base =
    "rounded-[var(--radius-card)] bg-[var(--color-tertiary)] " + variantClassName[variant];

  return <div className={`${base} ${className}`.trim()} {...props} />;
}
