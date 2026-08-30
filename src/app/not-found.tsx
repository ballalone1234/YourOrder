import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/content";

const dict = getDictionary();

export const metadata: Metadata = {
  title: dict.notFound.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section space="loose">
      <div className="max-w-[38rem]">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-muted">
          {dict.notFound.code}
        </p>
        <Heading as="h1" lines={[dict.notFound.title]} className="mt-6" />
        <p className="mt-7 text-lead text-muted">{dict.notFound.description}</p>
        <div className="mt-10">
          <Button href="/" arrow>
            {dict.notFound.backCta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
