// Lightweight analytics helper. No real analytics credentials are wired in —
// this dispatches to window.gtag / window.fbq / dataLayer when they exist
// (e.g. once NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID are configured and
// their loader scripts are added to app/layout.tsx), and always logs to the
// console in development so event wiring can be verified without credentials.

export type AnalyticsEvent =
  | "page_view"
  | "header_register_click"
  | "hero_register_click"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "payment_click"
  | "payment_success"
  | "payment_failed"
  | "whatsapp_click"
  | "phone_click"
  | "curriculum_open"
  | "faq_open"
  | "final_cta_click"
  | "thank_you_page_view"
  | "back_to_home_click"
  | "payment_failed_page_view"
  | "try_again_click"
  | "support_call_click";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${event}`, payload);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, payload);
  }
}
