"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  dict: Dictionary;
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ dict, locale, open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel so keyboard users land where they expect.
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      aria-label={dict.nav.menuTitle}
      aria-hidden={!open}
      className={cn(
        "fixed inset-x-0 top-[68px] z-40 h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-paper md:top-[76px] md:h-[calc(100dvh-76px)] lg:hidden",
        "transition-[opacity,transform,visibility] duration-300 ease-out",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0",
      )}
    >
      <Container className="flex min-h-full flex-col justify-between py-8">
        <nav aria-label="เมนูหลัก">
          <ul>
            {dict.nav.items.map((item) => (
              <li key={item.href} className="border-b border-line-soft">
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-5 text-xl text-ink"
                >
                  {item.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-muted"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-6">
          <Button href="#contact" className="w-full" arrow onClick={onClose}>
            {dict.nav.cta}
          </Button>

          <div className="flex items-center justify-between">
            <Link
              href="/login"
              onClick={onClose}
              className="text-[0.9375rem] text-muted"
            >
              {dict.nav.login}
            </Link>
            <LanguageSwitcher
              current={locale}
              label={dict.nav.languageLabel}
              unavailableLabel={dict.nav.languageUnavailable}
            />
          </div>

          <div className="border-t border-line-soft pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            <a href={`mailto:${site.email}`} className="block normal-case">
              {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`} className="mt-1 block">
              {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
