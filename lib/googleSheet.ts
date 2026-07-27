/**
 * Google Sheet submission helper.
 *
 * Sends a URL-encoded POST to a Google Apps Script deployment that appends a
 * row to the connected Google Sheet. Retries up to 3 times with a 1.5 s delay
 * between attempts. Returns true on success, false after all retries fail.
 *
 * SETUP: Replace SCRIPT_URL below with your actual Google Apps Script
 * deployment URL (Publish -> Deploy as web app -> Copy URL).
 */

// TODO: Replace this placeholder with the real Google Apps Script URL.
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyTg0Z-G3SvBzLHTW3vrnhATVzwehfVdnNI23k68HXmtk3mhVN0JWd6S34YUmIpuXoy/exec";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

/**
 * Submits a URLSearchParams payload to the Google Sheet Apps Script.
 */
export async function submitToGoogleSheet(
  params: URLSearchParams,
  retries = MAX_RETRIES
): Promise<boolean> {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await res.text();
    console.log("Google Sheet response:", text);

    if (res.ok) return true;
    throw new Error(`Sheet responded with status ${res.status}`);
  } catch (err) {
    if (retries <= 1) {
      console.error("Google Sheet submission failed permanently:", err);
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return submitToGoogleSheet(params, retries - 1);
  }
}
