import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/config/site";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

type FooterProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Footer({ dict, locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <Container>
        <div className="grid gap-x-10 gap-y-14 py-[clamp(3.5rem,6vw,6rem)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark />
            <p className="mt-7 max-w-[38ch] text-body text-muted">
              {dict.footer.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <address className="mt-8 not-italic">
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                {site.address}
              </p>
              <div className="mt-4 flex flex-col gap-1 text-[0.9375rem]">
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
            </address>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {dict.footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[0.8125rem] font-medium text-ink/70">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      {link.href.startsWith("#") ? (
                        <a
                          href={link.href}
                          className="text-[0.9375rem] text-ink/80 transition-colors duration-200 hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[0.9375rem] text-ink/80 transition-colors duration-200 hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            © {year} {site.name} Systems
          </p>
          <div className="flex items-center gap-6">
            <p className="hidden text-[0.8125rem] text-muted sm:block">
              {site.legalName} · {dict.footer.rights}
            </p>
            <LanguageSwitcher
              current={locale}
              label={dict.nav.languageLabel}
              unavailableLabel={dict.nav.languageUnavailable}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
