import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/content";

export function Evolution({ dict }: { dict: Dictionary }) {
  const { evolution } = dict;

  return (
    <Section id="approach" divider>
      <SectionHeader
        layout="split"
        eyebrow={evolution.eyebrow}
        lines={evolution.heading}
        paragraph={evolution.paragraph}
      />

      <ol className="mt-[clamp(3.5rem,6vw,6rem)] grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
        {evolution.steps.map((step, index) => (
          <li key={step.index}>
            <Reveal delay={index * 60}>
              <div className="border-t border-line pt-6">
                <span className="block text-[2.5rem] font-light leading-none tabular-nums text-ink/50">
                  {step.index}
                </span>
                <h3 className="mt-6 text-[1.0625rem] font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
