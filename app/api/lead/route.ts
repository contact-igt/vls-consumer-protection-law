import { NextRequest, NextResponse } from "next/server";
import type { LeadFormPayload } from "@/types/masterclass";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;

function isValidPayload(body: unknown): body is LeadFormPayload {
  if (!body || typeof body !== "object") return false;
  const payload = body as Record<string, unknown>;

  return (
    typeof payload.fullName === "string" &&
    payload.fullName.trim().length >= 3 &&
    typeof payload.email === "string" &&
    EMAIL_PATTERN.test(payload.email) &&
    typeof payload.mobileNumber === "string" &&
    MOBILE_PATTERN.test(payload.mobileNumber) &&
    typeof payload.city === "string" &&
    payload.city.trim().length > 0 &&
    typeof payload.profession === "string" &&
    payload.profession.trim().length > 0 &&
    payload.consent === true
  );
}

/**
 * API-ready lead intake endpoint. Forwards validated leads to the configured
 * LEAD_API_ENDPOINT (see .env.example) when set; otherwise logs server-side
 * so the registration flow remains fully testable before a CRM is connected.
 * The LEAD_API_KEY is read only on the server and is never sent to the client.
 */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ message: "Please check your details and try again." }, { status: 422 });
  }

  const endpoint = process.env.LEAD_API_ENDPOINT;
  const apiKey = process.env.LEAD_API_KEY;

  if (endpoint) {
    try {
      const upstream = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!upstream.ok) {
        console.error("Lead API upstream error", upstream.status, await upstream.text().catch(() => ""));
        return NextResponse.json(
          { message: "We could not process your registration right now. Please try again shortly." },
          { status: 502 }
        );
      }
    } catch (error) {
      console.error("Lead API request failed", error);
      return NextResponse.json(
        { message: "We could not process your registration right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } else {
    // No lead API configured yet — log so submissions are visible during development.
    console.info("New masterclass lead (no LEAD_API_ENDPOINT configured):", body);
  }

  return NextResponse.json({ message: "Lead received." }, { status: 200 });
}
