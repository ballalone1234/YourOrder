type ProblemItemProps = {
  index: string;
  title: string;
  description: string;
};

export function ProblemItem({ index, title, description }: ProblemItemProps) {
  return (
    <article className="group flex min-h-[15rem] flex-col bg-paper p-7 transition-colors duration-300 hover:bg-surface md:p-10">
      <span className="text-numeral font-light tabular-nums leading-none text-ink/50 transition-colors duration-300 group-hover:text-ink/70">
        {index}
      </span>
      {/* Fixed gap rather than `justify-between`: it keeps the titles on a
          shared baseline when descriptions wrap to different heights. */}
      <div className="mt-12 md:mt-16">
        <h3 className="text-h3 font-medium text-ink">{title}</h3>
        <p className="mt-3 max-w-[38ch] text-body text-muted">{description}</p>
      </div>
    </article>
  );
}
