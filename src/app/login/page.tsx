import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { getDictionary } from "@/content";

const dict = getDictionary();

export const metadata: Metadata = {
  title: dict.login.title,
  description: dict.login.description,
  robots: { index: false, follow: true },
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <Section space="loose">
      <div className="max-w-[42rem]">
        <Eyebrow>{dict.login.eyebrow}</Eyebrow>
        <Heading as="h1" lines={[dict.login.title]} className="mt-6" />
        <p className="mt-8 text-lead text-muted">{dict.login.description}</p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href={`mailto:${site.email}`} arrow>
            {dict.login.contactCta}
          </Button>
          <Button href="/" variant="secondary">
            {dict.login.backCta}
          </Button>
        </div>

        <div className="mt-14 border-t border-line pt-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
          <p className="normal-case tracking-normal">{site.email}</p>
          <p className="mt-1">{site.phone}</p>
        </div>
      </div>
    </Section>
  );
}
