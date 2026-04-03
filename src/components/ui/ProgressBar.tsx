import type { ComponentPropsWithoutRef } from "react";

export type ProgressBarVariant = "primary" | "secondary";

const variantClassName: Record<ProgressBarVariant, string> = {
  primary: "progress-primary",
  secondary: "progress-secondary",
};

type ProgressBarProps = Omit<
  ComponentPropsWithoutRef<"progress">,
  "value" | "max"
> & {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
};

export default function ProgressBar({
  value,
  max = 100,
  variant = "primary",
  className = "",
  ...props
}: ProgressBarProps) {
  return (
    <progress
      className={`w-full mt-2 h-2 ${variantClassName[variant]} ${className}`.trim()}
      max={max}
      value={value}
      {...props}
    />
  );
}

