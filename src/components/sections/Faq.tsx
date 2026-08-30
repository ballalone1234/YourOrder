import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;

  return (
    <Section id="faq" divider>
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <Heading lines={faq.heading} className="mt-6" />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <FAQAccordion items={faq.items} />
        </div>
      </div>
    </Section>
  );
}
