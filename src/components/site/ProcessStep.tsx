import { cn } from "@/lib/utils";

type ProcessStepProps = {
  index: string;
  code: string;
  title: string;
  description: string;
  items: readonly string[];
  className?: string;
};

/**
 * One stage of the delivery process: an editorial row built from a large
 * numeral, a hairline and three columns of type.
 */
export function ProcessStep({
  index,
  code,
  title,
  description,
  items,
  className,
}: ProcessStepProps) {
  return (
    <article
      className={cn(
        "group grid gap-x-10 gap-y-6 border-t border-line py-10 md:py-12 lg:grid-cols-12 lg:py-14",
        className,
      )}
    >
      <div className="flex items-baseline gap-4 lg:col-span-2 lg:flex-col lg:gap-3">
        <span className="text-numeral font-light tabular-nums text-ink/50 transition-colors duration-300 group-hover:text-accent">
          {index}
        </span>
        <span className="font-mono text-label uppercase tracking-[0.14em] text-muted lg:mt-1">
          {code}
        </span>
      </div>

      <div className="lg:col-span-4 lg:col-start-4">
        <h3 className="text-h3 font-medium text-ink">{title}</h3>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <p className="max-w-[52ch] text-body text-muted">{description}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[0.875rem] text-ink/70"
            >
              <span aria-hidden="true" className="size-1 bg-line" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
