import { CaseStudy } from "@/components/site/CaseStudy";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/content";

export function UseCases({ dict }: { dict: Dictionary }) {
  const { cases } = dict;

  return (
    <Section id="use-cases">
      <SectionHeader eyebrow={cases.eyebrow} lines={cases.heading} />

      <div className="mt-[clamp(3rem,5vw,5rem)] grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {cases.items.map((item, index) => (
          <Reveal key={item.index} delay={index * 70} className="h-full">
            <CaseStudy
              index={item.index}
              title={item.title}
              subtitle={item.subtitle}
              flow={item.flow}
              description={item.description}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
