import { AiAutomation } from "@/components/sections/AiAutomation";
import { Capabilities } from "@/components/sections/Capabilities";
import { Consultation } from "@/components/sections/Consultation";
import { DeliveryPrinciple } from "@/components/sections/DeliveryPrinciple";
import { Evolution } from "@/components/sections/Evolution";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { SystemFit } from "@/components/sections/SystemFit";
import { UseCases } from "@/components/sections/UseCases";
import { site } from "@/config/site";
import { getDictionary } from "@/content";
import { defaultLocale, type Locale } from "@/lib/i18n";

type SiteHomeProps = {
  locale?: Locale;
};

/**
 * The full marketing page. Everything is driven by the locale dictionary, so a
 * second language only needs a new route that passes a different locale.
 */
export function SiteHome({ locale = defaultLocale }: SiteHomeProps) {
  const dict = getDictionary(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} Systems`,
    legalName: site.legalName,
    description: dict.meta.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    areaServed: "TH",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "TH",
    },
    knowsLanguage: ["th", "en"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Hero dict={dict} />
      <Evolution dict={dict} />
      <SystemFit dict={dict} />
      <Problems dict={dict} />
      <Process dict={dict} />
      <Capabilities dict={dict} />
      <AiAutomation dict={dict} />
      <UseCases dict={dict} />
      <DeliveryPrinciple dict={dict} />
      <Faq dict={dict} />
      <FinalCta dict={dict} />
      <Consultation dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
