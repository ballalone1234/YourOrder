"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeaderProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Header({ dict, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock the page behind the mobile panel.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close the panel if the viewport grows into the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled || menuOpen
          ? "border-line bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75"
          : "border-transparent bg-paper",
      )}
    >
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-6 md:h-[76px] lg:h-[84px]">
          <Link href="/" className="shrink-0">
            <Wordmark />
          </Link>

          <nav
            aria-label="หลัก"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {dict.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-[0.9375rem] text-ink/75 transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LanguageSwitcher
              current={locale}
              label={dict.nav.languageLabel}
              unavailableLabel={dict.nav.languageUnavailable}
            />
            <span aria-hidden="true" className="h-4 w-px bg-line" />
            <Link
              href="/login"
              className="text-[0.9375rem] text-muted transition-colors duration-200 hover:text-ink"
            >
              {dict.nav.login}
            </Link>
            <Button href="#contact" size="md" arrow>
              {dict.nav.cta}
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="-mr-2 flex size-11 items-center justify-center text-ink lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </Container>

      <MobileNav
        dict={dict}
        locale={locale}
        open={menuOpen}
        onClose={closeMenu}
      />
    </header>
  );
}
