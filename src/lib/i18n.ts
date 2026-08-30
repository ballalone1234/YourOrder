export const locales = ["th", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "th";

/**
 * Locales that currently have a complete dictionary. Adding `en` here (with a
 * matching `src/content/en.ts`) is the only step needed to publish English.
 */
export const availableLocales: Locale[] = ["th"];

export const localeLabels: Record<Locale, string> = {
  th: "TH",
  en: "EN",
};

export const localeHtmlLang: Record<Locale, string> = {
  th: "th-TH",
  en: "en",
};

export function isLocaleAvailable(locale: Locale): boolean {
  return availableLocales.includes(locale);
}
