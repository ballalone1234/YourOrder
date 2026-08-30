import { isLocaleAvailable, locales, localeLabels, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  unavailableLabel: string;
  tone?: "default" | "invert";
  className?: string;
};

/**
 * Locale selector. Locales without a dictionary yet are shown but marked
 * unavailable, so the control never links to a page that does not exist.
 */
export function LanguageSwitcher({
  current,
  label,
  unavailableLabel,
  tone = "default",
  className,
}: LanguageSwitcherProps) {
  const invert = tone === "invert";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em]",
        className,
      )}
    >
      {locales.map((locale, index) => {
        const isCurrent = locale === current;
        const available = isLocaleAvailable(locale);

        return (
          <span key={locale} className="flex items-center gap-2">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className={invert ? "text-white/25" : "text-line"}
              >
                /
              </span>
            ) : null}
            <span
              aria-current={isCurrent ? "true" : undefined}
              aria-disabled={!available ? "true" : undefined}
              title={!available ? unavailableLabel : undefined}
              className={cn(
                isCurrent
                  ? invert
                    ? "text-white"
                    : "text-ink"
                  : invert
                    ? "text-white/40"
                    : "text-muted/70",
                !available && "cursor-not-allowed",
              )}
            >
              {localeLabels[locale]}
            </span>
          </span>
        );
      })}
    </div>
  );
}
