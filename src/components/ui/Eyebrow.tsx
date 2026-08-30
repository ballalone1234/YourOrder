import { cn } from "@/lib/utils";

/** Thai Unicode block. */
const THAI = /[฀-๿]/;

type EyebrowProps = {
  children: string;
  tone?: "default" | "invert" | "accent";
  className?: string;
  rule?: boolean;
};

/**
 * Small label above a heading. Latin labels get the mono/uppercase treatment;
 * Thai labels keep their natural case and tracking — letterspaced Thai is hard
 * to read because tone marks stop sitting over their consonant.
 */
export function Eyebrow({
  children,
  tone = "default",
  className,
  rule = true,
}: EyebrowProps) {
  const isThai = THAI.test(children);

  const toneClass =
    tone === "invert"
      ? "text-white/60"
      : tone === "accent"
        ? "text-accent"
        : "text-muted";

  const ruleClass = tone === "invert" ? "bg-white/25" : "bg-line";

  return (
    <p
      className={cn(
        "flex items-center gap-3",
        isThai
          ? "font-sans text-[0.8125rem] tracking-[0.01em]"
          : "font-mono text-label uppercase tracking-[0.14em]",
        toneClass,
        className,
      )}
    >
      {rule ? (
        <span aria-hidden="true" className={cn("h-px w-6 shrink-0", ruleClass)} />
      ) : null}
      <span>{children}</span>
    </p>
  );
}
