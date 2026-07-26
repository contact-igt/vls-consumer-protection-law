"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { masterclass } from "@/data/masterclass";
import { getWhatsappUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { isConfirmed } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Masterclasses", href: masterclass.officialWebsiteUrl, external: true },
  { label: "Courses", href: masterclass.officialWebsiteUrl, external: true },
  { label: "Why VLS", href: "#why-attend" },
  { label: "Contact", href: "#register" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-conditions" },
];

export function Footer() {
  return (
    <footer id="site-footer" className="bg-brand-ink text-brand-gray-300">
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo className="[&_span:first-child]:text-brand-red-400 [&_span:last-child]:text-white" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-gray-400">
            VLS Law Academy delivers practice-oriented legal education for law students, advocates and legal
            professionals through focused, practical masterclasses and courses.
          </p>

          {masterclass.socialLinks.length > 0 && (
            <div className="mt-5 flex gap-3">
              {masterclass.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-red-600"
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white">
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red-400" aria-hidden="true" />
              <span>{isConfirmed(masterclass.contactAddress) ? masterclass.contactAddress : "Address to be confirmed"}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-brand-red-400" aria-hidden="true" />
              <a
                href={`tel:${masterclass.contactNumber.replace(/\s/g, "")}`}
                onClick={() => trackEvent("phone_click", { number: masterclass.contactNumber })}
                className="hover:text-white"
              >
                {masterclass.contactNumber}
              </a>
            </li>
            {masterclass.contactNumberSecondary && (
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-red-400" aria-hidden="true" />
                <a
                  href={`tel:${masterclass.contactNumberSecondary.replace(/\s/g, "")}`}
                  onClick={() => trackEvent("phone_click", { number: masterclass.contactNumberSecondary as string })}
                  className="hover:text-white"
                >
                  {masterclass.contactNumberSecondary}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-brand-red-400" aria-hidden="true" />
              <a href={`mailto:${masterclass.contactEmail}`} className="hover:text-white">
                {masterclass.contactEmail}
              </a>
            </li>
            <li>
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
                className="font-semibold text-brand-red-400 hover:text-brand-red-300"
              >
                Ask on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-brand-gray-500 sm:flex-row">
          <p>© 2026 VLS Law Academy. All rights reserved.</p>
          <a href={masterclass.officialWebsiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {masterclass.officialWebsiteUrl.replace(/^https?:\/\//, "")}
          </a>
        </Container>
      </div>
    </footer>
  );
}
