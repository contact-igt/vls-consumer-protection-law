export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  landingPageUrl?: string;
}

const STORAGE_KEY = "vls_cpl_utm";

const UTM_KEYS: Array<[keyof UtmParams, string]> = [
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["utmContent", "utm_content"],
  ["utmTerm", "utm_term"],
];

/**
 * Captures UTM parameters, referrer and landing-page URL on first visit and
 * persists them in sessionStorage so they survive re-renders and can still be
 * attached to the lead payload even if a visitor arrives on the page again
 * without the original query string (e.g. after following an internal link).
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const existing = readStoredUtm();
  const params = new URLSearchParams(window.location.search);
  const captured: UtmParams = { ...existing };

  let hasNewValue = false;
  for (const [key, param] of UTM_KEYS) {
    const value = params.get(param);
    if (value) {
      captured[key] = value;
      hasNewValue = true;
    }
  }

  if (!existing.referrer && document.referrer) {
    captured.referrer = document.referrer;
    hasNewValue = true;
  }

  if (!existing.landingPageUrl) {
    captured.landingPageUrl = window.location.href;
    hasNewValue = true;
  }

  if (hasNewValue) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // sessionStorage may be unavailable (private browsing); fail silently.
    }
  }

  return captured;
}

function readStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
