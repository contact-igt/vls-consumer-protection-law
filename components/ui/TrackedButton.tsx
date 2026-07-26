"use client";

import { Button } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent, type AnalyticsPayload } from "@/lib/analytics";

interface TrackedButtonProps {
  href: string;
  event: AnalyticsEvent;
  eventPayload?: AnalyticsPayload;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * Server Components can't pass function props across the client boundary, so
 * click tracking on CTAs rendered from server components (Hero, FinalCta,
 * Footer) goes through this small client wrapper instead of an inline
 * onClick on Button.
 */
export function TrackedButton({ href, event, eventPayload, children, ...props }: TrackedButtonProps) {
  return (
    <Button href={href} onClick={() => trackEvent(event, eventPayload)} {...props}>
      {children}
    </Button>
  );
}
