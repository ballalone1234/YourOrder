import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Vertical rhythm: generous by default, tighter when sections pair up. */
  space?: "default" | "tight" | "loose";
  /** Renders a hairline above the section. */
  divider?: boolean;
  containerClassName?: string;
};

const SPACE = {
  tight: "py-[clamp(3.5rem,6vw,6rem)]",
  default: "py-[clamp(4.5rem,9vw,10rem)]",
  loose: "py-[clamp(5.5rem,11vw,12rem)]",
} as const;

export function Section({
  id,
  children,
  className,
  space = "default",
  divider = false,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(SPACE[space], divider && "border-t border-line", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
