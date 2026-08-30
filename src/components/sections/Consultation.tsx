import { ConsultationForm } from "@/components/site/ConsultationForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import type { Dictionary } from "@/content";

export function Consultation({ dict }: { dict: Dictionary }) {
  const { form } = dict;

  return (
    <Section id="contact" divider>
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{form.eyebrow}</Eyebrow>
            <Heading lines={[form.heading]} className="mt-6" />
            <p className="mt-7 max-w-[38ch] text-body text-muted">
              {form.paragraph}
            </p>

            <div className="mt-10 border-t border-line pt-6">
              <p className="text-[0.8125rem] font-medium text-ink/70">
                {form.contactTitle}
              </p>
              <div className="mt-4 flex flex-col gap-1.5 text-[0.9375rem]">
                <a
                  href={`mailto:${site.email}`}
                  className="w-fit text-ink transition-colors duration-200 hover:text-accent"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="w-fit text-ink transition-colors duration-200 hover:text-accent"
                >
                  {site.phone}
                </a>
                <span className="text-muted">LINE {site.line}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ConsultationForm dict={dict} />
        </div>
      </div>
    </Section>
  );
}
