import { ProcessStep } from "@/components/site/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/content";

export function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <Section id="process" divider>
      <SectionHeader
        layout="split"
        eyebrow={process.eyebrow}
        lines={process.heading}
        paragraph={process.paragraph}
      />

      <div className="mt-[clamp(3rem,5vw,5rem)] border-b border-line">
        {process.steps.map((step, index) => (
          <Reveal key={step.index} delay={index * 40}>
            <ProcessStep
              index={step.index}
              code={step.code}
              title={step.title}
              description={step.description}
              items={step.items}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
