import type { Metadata } from "next";

import { LegalDocument } from "@/components/site/LegalDocument";
import { legal } from "@/content/legal";

export const metadata: Metadata = {
  title: legal.terms.title,
  description: legal.terms.intro,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDocument
      title={legal.terms.title}
      intro={legal.terms.intro}
      updated={legal.updated}
      sections={legal.terms.sections}
    />
  );
}
