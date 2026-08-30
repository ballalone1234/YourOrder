import type { Metadata } from "next";

import { LegalDocument } from "@/components/site/LegalDocument";
import { legal } from "@/content/legal";

export const metadata: Metadata = {
  title: legal.privacy.title,
  description: legal.privacy.intro,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title={legal.privacy.title}
      intro={legal.privacy.intro}
      updated={legal.updated}
      sections={legal.privacy.sections}
    />
  );
}
