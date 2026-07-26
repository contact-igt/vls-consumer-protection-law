"use client";

import { Button } from "@/components/ui/Button";
import { masterclass } from "@/data/masterclass";
import { trackEvent } from "@/lib/analytics";
import { useHiddenNear } from "@/lib/useHiddenNear";
import { cn, toDurationAdjective } from "@/lib/utils";

const WATCH_IDS = ["register", "site-footer"];

/**
 * Mobile-only sticky registration bar. Hides automatically whenever the
 * registration form (#register) or the footer is on screen, so it never
 * covers form fields, WhatsApp controls, or footer content.
 */
export function MobileStickyCta() {
  const isHidden = useHiddenNear(WATCH_IDS);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-gray-200 bg-white/98 px-4 py-3 shadow-[0_-4px_16px_rgba(20,16,15,0.12)] backdrop-blur transition-transform duration-300 sm:hidden",
        "pb-[calc(env(safe-area-inset-bottom)+0.75rem)]",
        isHidden ? "translate-y-full" : "translate-y-0"
      )}
      aria-hidden={isHidden}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-red-600">
            {toDurationAdjective(masterclass.duration)} Masterclass
          </p>
          <p className="text-sm font-semibold text-brand-black">Consumer Protection Law</p>
        </div>
        <Button
          href="#register"
          size="md"
          className="shrink-0"
          onClick={() => trackEvent("hero_register_click", { source: "mobile_sticky_cta" })}
        >
          Register Now
        </Button>
      </div>
    </div>
  );
}
