import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { buttonClasses } from "@/components/ui/Button";

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  /** Shares visual language with `Button` variant `link` */
  size?: "sm" | "inherit";
};

export default function TextLink({
  size = "sm",
  className = "",
  ...props
}: TextLinkProps) {
  const sizeClass = size === "sm" ? "text-sm" : "text-inherit";
  return (
    <Link
      className={`${sizeClass} ${buttonClasses("link")} ${className}`.trim()}
      {...props}
    />
  );
}
