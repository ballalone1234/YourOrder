import { cn } from "@/lib/utils";

type FlowNode = {
  label: string;
  note: string;
};

type FlowDiagramProps = {
  title: string;
  nodes: readonly FlowNode[];
  className?: string;
};

/**
 * Vertical architecture diagram, drawn with borders and type only — no image,
 * so it stays sharp, translatable and readable by assistive technology.
 */
export function FlowDiagram({ title, nodes, className }: FlowDiagramProps) {
  return (
    <figure className={cn("w-full", className)}>
      <figcaption className="border-b border-night-line pb-3 text-[0.8125rem] text-white/50">
        {title}
      </figcaption>

      <ol className="mt-8">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;

          return (
            <li key={node.label}>
              <div className="flex items-start gap-5 border border-night-line bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-white/30">
                <span className="mt-1 font-mono text-[0.625rem] tracking-[0.12em] text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-white">
                    {node.label}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/55">
                    {node.note}
                  </p>
                </div>
              </div>

              {!isLast ? (
                <div
                  aria-hidden="true"
                  className="flex h-8 items-center justify-center"
                >
                  <span className="h-full w-px bg-night-line" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
