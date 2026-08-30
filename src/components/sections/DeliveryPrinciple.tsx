import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content";

export function DeliveryPrinciple({ dict }: { dict: Dictionary }) {
  const { delivery } = dict;

  return (
    <Section space="loose" divider>
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>{delivery.eyebrow}</Eyebrow>
          <Heading
            lines={delivery.heading}
            size="display"
            weight="light"
            className="mt-7"
          />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="max-w-[48ch] text-body text-muted">
            {delivery.paragraph}
          </p>
        </div>
      </div>

      <ol className="mt-[clamp(4rem,8vw,8rem)] grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {delivery.phases.map((phase) => (
          <li key={phase.index} className="border-t border-line pt-6">
            <p className="font-mono text-label uppercase tracking-[0.14em] text-muted">
              {phase.index}
            </p>
            <h3 className="mt-5 text-[1.375rem] font-medium text-ink">
              {phase.title}
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
              {phase.note}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
