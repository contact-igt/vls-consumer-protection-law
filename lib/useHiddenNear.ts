"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether any of the given element IDs are currently visible in the
 * viewport. Used to hide fixed-position floating controls (mobile sticky
 * CTA, floating WhatsApp button) while they would otherwise overlap the
 * registration form or the footer.
 */
export function useHiddenNear(ids: string[]): boolean {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibility((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            next[entry.target.id] = entry.intersectionRatio > 0.1;
          });
          return next;
        });
      },
      { threshold: [0, 0.1] }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return Object.values(visibility).some(Boolean);
}
