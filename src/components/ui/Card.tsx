import type { ComponentPropsWithoutRef } from "react";

type CardVariant = "interactive" | "panel";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant: CardVariant;
};

const variantClassName: Record<CardVariant, string> = {
  interactive: "surface-card",
  panel: "surface-panel",
};

export default function Card({
  variant,
  className = "",
  ...props
}: CardProps) {
  const base = variantClassName[variant];

  return <div className={`${base} ${className}`.trim()} {...props} />;
}
