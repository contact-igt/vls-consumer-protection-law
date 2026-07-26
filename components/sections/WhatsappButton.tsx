"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsappUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useHiddenNear } from "@/lib/useHiddenNear";
import { cn } from "@/lib/utils";

const WATCH_IDS = ["register", "site-footer"];

/**
 * Floating WhatsApp enquiry button. Hides while the registration form or
 * footer is on screen — both already surface their own WhatsApp link/CTA
 * inline, and a fixed bubble would otherwise sit on top of form fields or
 * footer content on smaller screens.
 */
export function WhatsappButton() {
  const isHidden = useHiddenNear(WATCH_IDS);

  return (
    <a
      href={getWhatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
      className={cn(
        "fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-[transform,opacity] duration-300 ease-out active:scale-95 pointer-fine:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] sm:bottom-6",
        isHidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      )}
      aria-hidden={isHidden}
      tabIndex={isHidden ? -1 : undefined}
      aria-label="Ask on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" fill="white" strokeWidth={0} />
    </a>
  );
}
