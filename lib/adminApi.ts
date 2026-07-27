import type { PaymentPayload } from "@/types/masterclass";

/**
 * Resolves the Admin API base URL dynamically based on environment variables:
 * - If NEXT_PUBLIC_API_SERVER is "stage", uses NEXT_PUBLIC_STAGE_API_URL
 * - If NEXT_PUBLIC_API_SERVER is "production", uses NEXT_PUBLIC_PRODUCTION_API_URL
 * - Otherwise (e.g. "local", "localhost", or unset), uses NEXT_PUBLIC_LOCALHOST_API_URL
 */
export function getAdminApiBaseUrl(): string {
  const envMode = (process.env.NEXT_PUBLIC_API_SERVER || "").trim().toLowerCase();

  if (envMode === "stage") {
    return process.env.NEXT_PUBLIC_STAGE_API_URL || "https://stageapi.invictusglobaltech.com/api/v1";
  }

  if (envMode === "production") {
    return process.env.NEXT_PUBLIC_PRODUCTION_API_URL || "https://api.invictusglobaltech.com/api/v1";
  }

  return process.env.NEXT_PUBLIC_LOCALHOST_API_URL || "http://localhost:8000/api/v1";
}

/**
 * Submits lead registration details to the Invictus Admin SaaS API endpoint.
 * Target route: {baseUrl}/vls-consumer-protection-law-master-class/register
 */
export async function submitLeadToAdminPanel(payload: PaymentPayload): Promise<boolean> {
  try {
    const baseUrl = getAdminApiBaseUrl();
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "vls_law";
    const endpoint = `${baseUrl}/vls-consumer-protection-law-master-class/register`;

    console.log(`[AdminAPI] Submitting lead to endpoint (${process.env.NEXT_PUBLIC_API_SERVER || "local"}):`, endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-key": clientKey,
      },
      body: JSON.stringify({
        ...payload,
        client_key: clientKey,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[AdminAPI] Lead registration submission failed:", response.status, errorData);
      return false;
    }

    const data = await response.json();
    console.log("[AdminAPI] Lead registered successfully:", data);
    return true;
  } catch (error) {
    console.error("[AdminAPI] Error calling admin API:", error);
    return false;
  }
}
