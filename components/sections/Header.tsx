"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0].id);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function handleNavClick() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur transition-shadow duration-200",
        isScrolled ? "border-brand-gray-200 shadow-sm" : "border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#overview" onClick={handleNavClick} className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500 rounded">
          <span className="block sm:hidden">
            <Logo compact />
          </span>
          <span className="hidden sm:block">
            <Logo />
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={activeId === link.id ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500",
                    activeId === link.id
                      ? "text-brand-red-600"
                      : "text-brand-black hover:text-brand-red-600"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="#register"
            size="md"
            className="px-3 text-xs sm:px-5 sm:text-sm md:text-base"
            onClick={() => trackEvent("header_register_click")}
          >
            <span className="sm:hidden">Register</span>
            <span className="hidden sm:inline">Register Now</span>
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500 lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-brand-gray-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500",
                  activeId === link.id ? "bg-brand-red-50 text-brand-red-600" : "text-brand-black"
                )}
              >
                {link.label}
              </a>
            ))}
            <Button
              href="#register"
              size="md"
              className="mt-2 w-full"
              onClick={() => {
                trackEvent("header_register_click");
                handleNavClick();
              }}
            >
              Register Now
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
