import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

type LegalSection = {
  title: string;
  paragraphs: readonly string[];
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  updated: string;
  sections: readonly LegalSection[];
};

export function LegalDocument({
  title,
  intro,
  updated,
  sections,
}: LegalDocumentProps) {
  return (
    <Section space="loose">
      <div className="max-w-[44rem]">
        <p className="text-[0.8125rem] text-muted">
          ปรับปรุงล่าสุด {updated}
        </p>
        <Heading as="h1" lines={[title]} className="mt-6" />
        <p className="mt-8 text-lead text-muted">{intro}</p>

        <div className="mt-16 border-t border-line">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-line py-10">
              <h2 className="text-h3 font-medium text-ink">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-body text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-body text-muted">
          หากมีคำถามเกี่ยวกับเอกสารฉบับนี้ ติดต่อเราได้ที่{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-ink underline underline-offset-4 transition-colors duration-200 hover:text-accent"
          >
            {site.email}
          </a>
        </p>
      </div>
    </Section>
  );
}
