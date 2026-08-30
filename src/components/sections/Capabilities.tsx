import { CapabilityCard } from "@/components/site/CapabilityCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/content";

export function Capabilities({ dict }: { dict: Dictionary }) {
  const { capabilities } = dict;

  return (
    <Section id="capabilities" divider>
      <SectionHeader
        layout="split"
        eyebrow={capabilities.eyebrow}
        lines={capabilities.heading}
        paragraph={capabilities.paragraph}
      />

      <div className="mt-[clamp(3rem,5vw,5rem)] border border-line">
        <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item) => (
            <CapabilityCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
