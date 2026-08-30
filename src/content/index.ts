import { defaultLocale, type Locale } from "@/lib/i18n";
import th from "./th";

/**
 * Widens the literal types produced by `as const` so a future `en.ts` only has
 * to match the *shape* of the Thai dictionary, not its exact strings.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;

export type Dictionary = Widen<typeof th>;

const dictionaries: Partial<Record<Locale, Dictionary>> = {
  th,
};

/**
 * Returns the dictionary for a locale, falling back to the default locale
 * while a translation is still being written.
 */
export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? (dictionaries[defaultLocale] as Dictionary);
}
