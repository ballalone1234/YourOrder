import {
  ArrowUpRight,
  ChartColumn,
  Layers,
  Plug,
  SquareCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  users: Users,
  check: SquareCheck,
  chart: ChartColumn,
  plug: Plug,
  zap: Zap,
};

type CapabilityCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  href?: string;
};

export function CapabilityCard({
  icon,
  title,
  subtitle,
  description,
  href = "#contact",
}: CapabilityCardProps) {
  const Icon = ICONS[icon] ?? Layers;

  return (
    <article className="group relative flex flex-col bg-paper p-7 transition-colors duration-300 hover:bg-surface md:p-9">
      <Icon
        aria-hidden="true"
        className="size-[18px] text-accent"
        strokeWidth={1.5}
      />

      <h3 className="mt-8 text-[1.125rem] font-medium leading-snug text-ink">
        <a href={href} className="before:absolute before:inset-0 before:content-['']">
          {title}
        </a>
      </h3>
      <p className="mt-1.5 text-[0.9375rem] text-ink/70">{subtitle}</p>
      <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">
        {description}
      </p>

      <div className="mt-auto pt-10">
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          strokeWidth={1.5}
        />
      </div>
    </article>
  );
}
