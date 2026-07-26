import type { LeadFormPayload } from "@/types/masterclass";
import type { RegistrationFormValues } from "@/lib/validation";
import { captureUtmParams } from "@/lib/utm";

export interface SubmitLeadResult {
  success: boolean;
  message: string;
}

export function buildLeadPayload(values: RegistrationFormValues): LeadFormPayload {
  const utm = captureUtmParams();

  return {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    mobileNumber: values.mobileNumber.replace(/\D/g, "").slice(-10),
    city: values.city.trim(),
    profession: values.profession,
    consent: values.consent,
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    utmContent: utm.utmContent,
    utmTerm: utm.utmTerm,
    referrer: utm.referrer,
    landingPageUrl: utm.landingPageUrl,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Sends a lead to the site's own API route, which is responsible for
 * forwarding it to the configured lead API (see LEAD_API_ENDPOINT in
 * .env.example). Keeping this as a fetch to a same-origin route means no
 * external API keys are ever exposed to the browser.
 */
export async function submitLead(payload: LeadFormPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return {
        success: false,
        message: data?.message ?? "Something went wrong while submitting your details. Please try again.",
      };
    }

    return { success: true, message: "Registration details received." };
  } catch {
    return {
      success: false,
      message: "We could not reach the server. Please check your connection and try again.",
    };
  }
}
