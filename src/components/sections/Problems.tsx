import { ProblemItem } from "@/components/site/ProblemItem";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/content";

export function Problems({ dict }: { dict: Dictionary }) {
  const { problems } = dict;

  return (
    <Section divider>
      <SectionHeader
        layout="split"
        eyebrow={problems.eyebrow}
        lines={problems.heading}
      />

      <div className="mt-[clamp(3rem,5vw,5rem)] border border-line">
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {problems.items.map((item) => (
            <ProblemItem
              key={item.index}
              index={item.index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
