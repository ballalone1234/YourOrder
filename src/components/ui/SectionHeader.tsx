import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type Tone = "default" | "invert";

type HeadingProps = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h2" | "h3";
  tone?: Tone;
  weight?: "light" | "medium";
  className?: string;
  id?: string;
};

/**
 * Editorial headline.
 *
 * From `md` up each authored line is a block, so the wrap points are a design
 * decision rather than an accident of container width. Below `md` the lines run
 * inline and Thai wraps on its own dictionary breaks — forcing desktop breaks
 * on a phone leaves one- and two-syllable orphans. Lines that need a space when
 * they run together carry a leading space in the dictionary.
 */
export function Heading({
  lines,
  as: Tag = "h2",
  size = "h2",
  tone = "default",
  weight = "medium",
  className,
  id,
}: HeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        size === "display" ? "text-display" : size === "h2" ? "text-h2" : "text-h3",
        weight === "light" ? "font-light" : "font-medium",
        // Balances the ragged edge when the authored lines run together on
        // small screens; a no-op once each line is its own block.
        "text-balance",
        tone === "invert" ? "text-white" : "text-ink",
        className,
      )}
    >
      {lines.map((line) => (
        <span key={line} className="md:block">
          {line}
        </span>
      ))}
    </Tag>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  lines: readonly string[];
  paragraph?: string;
  as?: "h1" | "h2";
  size?: "display" | "h2";
  tone?: Tone;
  /** `split` places the supporting paragraph in a second column on desktop. */
  layout?: "stack" | "split";
  className?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  lines,
  paragraph,
  as = "h2",
  size = "h2",
  tone = "default",
  layout = "stack",
  className,
  children,
}: SectionHeaderProps) {
  const paragraphNode = paragraph ? (
    <p
      className={cn(
        "text-lead max-w-[46ch]",
        tone === "invert" ? "text-white/70" : "text-muted",
      )}
    >
      {paragraph}
    </p>
  ) : null;

  if (layout === "split") {
    return (
      <div
        className={cn(
          "grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end",
          className,
        )}
      >
        <div className="lg:col-span-7">
          {eyebrow ? <Eyebrow tone={tone === "invert" ? "invert" : "default"}>{eyebrow}</Eyebrow> : null}
          <Heading
            lines={lines}
            as={as}
            size={size}
            tone={tone}
            className={eyebrow ? "mt-6" : undefined}
          />
        </div>
        {paragraphNode || children ? (
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            {paragraphNode}
            {children}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("max-w-[46rem]", className)}>
      {eyebrow ? <Eyebrow tone={tone === "invert" ? "invert" : "default"}>{eyebrow}</Eyebrow> : null}
      <Heading
        lines={lines}
        as={as}
        size={size}
        tone={tone}
        className={eyebrow ? "mt-6" : undefined}
      />
      {paragraphNode ? <div className="mt-7">{paragraphNode}</div> : null}
      {children}
    </div>
  );
}
