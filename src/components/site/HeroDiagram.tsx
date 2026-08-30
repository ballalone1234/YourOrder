import { cn } from "@/lib/utils";

type DiagramNode = {
  index: string;
  label: string;
  tag: string;
};

type HeroDiagramProps = {
  title: string;
  version: string;
  nodes: readonly DiagramNode[];
  activeIndex: number;
  footnote: string;
};

/**
 * Abstract workflow map — thin rules, nodes and labels rather than a product
 * screenshot. Built entirely from type and borders.
 */
export function HeroDiagram({
  title,
  version,
  nodes,
  activeIndex,
  footnote,
}: HeroDiagramProps) {
  return (
    <figure className="w-full">
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink">
          {title}
        </span>
        <span className="text-[0.8125rem] text-muted">{version}</span>
      </figcaption>

      <ul className="mt-8">
        {nodes.map((node, index) => {
          const isActive = index === activeIndex;
          const isLast = index === nodes.length - 1;

          return (
            <li
              key={node.index}
              className="grid grid-cols-[0.5rem_1fr] gap-x-4"
            >
              <div className="relative" aria-hidden="true">
                {!isLast ? (
                  <span className="absolute left-1/2 top-3 h-[calc(100%-0.75rem)] w-px -translate-x-1/2 bg-line" />
                ) : null}
                <span
                  className={cn(
                    "absolute left-1/2 top-1.5 size-[7px] -translate-x-1/2 border",
                    isActive
                      ? "border-accent bg-accent"
                      : "border-line bg-paper",
                  )}
                />
              </div>

              <div className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", !isLast && "pb-9")}>
                <span className="font-mono text-[0.6875rem] text-muted">
                  {node.index}
                </span>
                <span
                  className={cn(
                    "text-[1.0625rem]",
                    isActive ? "text-ink" : "text-ink/85",
                  )}
                >
                  {node.label}
                </span>
                <span aria-hidden="true" className="leader" />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {node.tag}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-muted">
        {footnote}
      </p>
    </figure>
  );
}
