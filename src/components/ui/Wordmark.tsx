import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  tone?: "default" | "invert";
  className?: string;
};

/**
 * Original wordmark: a small square mark built from two offset rules —
 * a process handing off to the next step — beside the company name.
 */
export function Wordmark({ tone = "default", className }: WordmarkProps) {
  const invert = tone === "invert";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "relative flex size-7 shrink-0 items-center justify-center border",
          invert ? "border-white/40" : "border-ink",
        )}
      >
        <span
          className={cn(
            "absolute left-[5px] top-[9px] h-px w-[9px]",
            invert ? "bg-white" : "bg-ink",
          )}
        />
        <span
          className={cn(
            "absolute bottom-[9px] right-[5px] h-px w-[9px]",
            invert ? "bg-white/60" : "bg-accent",
          )}
        />
      </span>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span
          className={cn(
            "text-[1.0625rem] font-semibold tracking-[0.14em]",
            invert ? "text-white" : "text-ink",
          )}
        >
          {site.wordmark}
        </span>
        <span
          className={cn(
            "font-mono text-[0.5625rem] uppercase tracking-[0.2em]",
            invert ? "text-white/50" : "text-muted",
          )}
        >
          {site.wordmarkSuffix}
        </span>
      </span>
    </span>
  );
}
