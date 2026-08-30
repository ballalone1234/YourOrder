import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content";

export function FinalCta({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;

  return (
    <Section space="loose" divider>
      <div className="max-w-[52rem]">
        <Eyebrow>{finalCta.eyebrow}</Eyebrow>
        <Heading lines={finalCta.heading} size="display" className="mt-7" />
        <p className="mt-8 max-w-[46ch] text-lead text-muted">
          {finalCta.paragraph}
        </p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href="#contact" arrow>
            {finalCta.primaryCta}
          </Button>
          <Button href="#contact" variant="secondary">
            {finalCta.secondaryCta}
          </Button>
        </div>

        <p className="mt-6 text-[0.875rem] text-muted">{finalCta.note}</p>
      </div>
    </Section>
  );
}
