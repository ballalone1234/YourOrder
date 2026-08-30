import { ArrowRight } from "lucide-react";


type CaseStudyProps = {
  index: string;
  title: string;
  subtitle: string;
  flow: readonly string[];
  description: string;
};

export function CaseStudy({
  index,
  title,
  subtitle,
  flow,
  description,
}: CaseStudyProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-surface p-7 transition-colors duration-300 hover:border-ink/40 md:p-9">
      <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
        Case {index}
      </p>

      <h3 className="mt-6 text-[1.375rem] font-medium leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-[0.9375rem] text-ink/70">{subtitle}</p>

      <div className="mt-7 border-y border-line-soft py-5">
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          {flow.map((step, stepIndex) => (
            <li key={step} className="flex items-center gap-2.5">
              {stepIndex > 0 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-line"
                  strokeWidth={1.5}
                />
              ) : null}
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink/80">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
        {description}
      </p>
    </article>
  );
}
