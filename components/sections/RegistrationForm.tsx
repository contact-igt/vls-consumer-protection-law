"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextInput, SelectInput, CheckboxInput } from "@/components/ui/FormField";
import { masterclass } from "@/data/masterclass";
import {
  validateRegistrationForm,
  hasErrors,
  type RegistrationFormErrors,
  type RegistrationFormValues,
} from "@/lib/validation";
import { buildLeadPayload, submitLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";
import { getWhatsappUrl } from "@/lib/whatsapp";
import { captureUtmParams } from "@/lib/utm";
import { submitToGoogleSheet } from "@/lib/googleSheet";
import { submitLeadToAdminPanel } from "@/lib/adminApi";
import { isRazorpayReady, type RazorpayOrder, type RazorpaySuccessResponse } from "@/lib/razorpay";
import type { PaymentPayload } from "@/types/masterclass";

const PROFESSION_OPTIONS = [
  "LLB Student",
  "Final-Year Law Student",
  "Young Advocate",
  "Practising Advocate",
  "Judiciary Aspirant",
  "Corporate Law Aspirant",
  "Legal Professional",
  "Other",
];

const EMPTY_VALUES: RegistrationFormValues = {
  fullName: "",
  email: "",
  mobileNumber: "",
  city: "",
  profession: "",
  consent: false,
};

type SubmitState = "idle" | "submitting" | "processing";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getUTM(key: string): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

async function safeSetPaymentDetails(data: PaymentPayload): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("PaymentDetails", JSON.stringify(data));
  } catch (err) {
    console.error("Failed to store PaymentDetails:", err);
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [state, setState] = useState<SubmitState>("idle");

  // Payment instruction popup
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  // Stored form values while instruction popup is open
  const [pendingValues, setPendingValues] = useState<RegistrationFormValues | null>(null);

  // Spam prevention
  const hasStartedRef = useRef(false);
  const mountedAtRef = useRef<number | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  function handleFocusStart() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("form_start");
    }
  }

  function updateField<K extends keyof RegistrationFormValues>(
    field: K,
    value: RegistrationFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state === "submitting" || state === "processing") return;

    if (honeypotRef.current?.value) return;
    if (mountedAtRef.current === null || Date.now() - mountedAtRef.current < 1200) return;

    const validationErrors = validateRegistrationForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setState("submitting");
    trackEvent("form_submit");

    // Capture the lead immediately so it is stored regardless of payment outcome.
    const leadPayload = buildLeadPayload(values);
    await submitLead(leadPayload);

    // Open the payment instruction popup.
    setPendingValues(values);
    setAgree(false);
    setInstructionOpen(true);
    setState("idle");
  }

  async function openRazorpay() {
    if (!pendingValues) return;
    setInstructionOpen(false);

    if (!isRazorpayReady()) {
      console.error("Razorpay script not yet loaded.");
      window.location.href = "/payment-failed";
      return;
    }

    // const amount = masterclass.fee ?? 499;
    const amount = 1;

    // Create the Razorpay order server-side.
    let order: RazorpayOrder & { ip_address: string };
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        console.error("Order creation failed:", res.status);
        window.location.href = "/payment-failed";
        return;
      }

      order = await res.json();
    } catch (err) {
      console.error("Order fetch error:", err);
      window.location.href = "/payment-failed";
      return;
    }

    const options = {
      // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
      key: "rzp_test_Ss2NFtpJFLRAiw",
      amount: order.amount,
      currency: order.currency,
      name: "VLS Law Academy",
      order_id: order.id,
      description: `Consumer Protection Law Masterclass - Rs.${amount}`,
      prefill: {
        name: pendingValues.fullName,
        email: pendingValues.email,
        contact: pendingValues.mobileNumber.replace(/\D/g, "").slice(-10),
      },
      theme: { color: "#b20a0a" },
      handler: async (response: RazorpaySuccessResponse) => {
        if (!response?.razorpay_payment_id) {
          window.location.href = "/payment-failed";
          return;
        }

        setState("processing");

        const apiPayload: PaymentPayload = {
          name: pendingValues.fullName,
          email: pendingValues.email,
          mobile: `+91${pendingValues.mobileNumber.replace(/\D/g, "").slice(-10)}`,
          city: pendingValues.city,
          profession: pendingValues.profession,
          amount: order.amount / 100,
          programm_date: masterclass.date,
          razorpay_order_id: response.razorpay_order_id ?? "",
          razorpay_payment_id: response.razorpay_payment_id ?? "",
          razorpay_signature: response.razorpay_signature ?? "",
          payment_status: "paid",
          captured: response.captured ?? "",
          page_name: "consumer-protection-law-masterclass",
          ip_address: order.ip_address ?? "",
          utm_source: getUTM("utm_source"),
          utm_medium: getUTM("utm_medium"),
          utm_campaign: getUTM("utm_campaign"),
          utm_term: getUTM("utm_term"),
          utm_content: getUTM("utm_content"),
        };

        // 1. Submit lead registration to Invictus Admin SaaS API
        await submitLeadToAdminPanel(apiPayload);

        // 2. Send to Google Sheet (backup, failure does not block the success redirect).
        const params = new URLSearchParams();
        Object.entries(apiPayload).forEach(([key, val]) =>
          params.append(key, String(val ?? ""))
        );
        await submitToGoogleSheet(params);

        // Persist payment details for the thank-you page.
        await safeSetPaymentDetails(apiPayload);

        trackEvent("payment_success", { payment_id: response.razorpay_payment_id });
        window.location.href = "/thank-you";
      },
    };

    const razor = new window.Razorpay(options);
    razor.on("payment.failed", () => {
      trackEvent("payment_failed");
      window.location.href = "/payment-failed";
    });
    razor.open();
  }

  // Registration closed
  if (masterclass.registrationStatus === "CLOSED") {
    return <ClosedState />;
  }



  const isWaitlist = masterclass.registrationStatus === "WAITLIST";

  return (
    <>
      {/* ---------- Registration Form ---------- */}
      <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-card-hover sm:p-8">
        <h3 className="text-2xl font-bold text-brand-black">
          {isWaitlist ? "Join the Waitlist" : "Reserve Your Seat"}
        </h3>
        <p className="mt-2 text-sm text-brand-gray-600">
          {isWaitlist
            ? "Registrations for the current batch are full. Join the waitlist to be notified as soon as the next masterclass batch opens."
            : "Enter your details to proceed with registration and payment."}
        </p>

        <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-4" onFocus={handleFocusStart}>
          {/* Honeypot — hidden from real users, bots tend to fill it */}
          <input
            ref={honeypotRef}
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <TextInput
            id="fullName"
            name="fullName"
            label="Full Name"
            required
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            error={errors.fullName}
            disabled={state === "submitting"}
          />

          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            error={errors.email}
            disabled={state === "submitting"}
          />

          <TextInput
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            inputMode="numeric"
            label="Mobile Number"
            required
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={values.mobileNumber}
            onChange={(e) => updateField("mobileNumber", e.target.value)}
            error={errors.mobileNumber}
            disabled={state === "submitting"}
          />

          {!isWaitlist && (
            <>
              <TextInput
                id="city"
                name="city"
                label="City"
                required
                autoComplete="address-level2"
                value={values.city}
                onChange={(e) => updateField("city", e.target.value)}
                error={errors.city}
                disabled={state === "submitting"}
              />

              <SelectInput
                id="profession"
                name="profession"
                label="Current Profession or Status"
                required
                options={PROFESSION_OPTIONS}
                value={values.profession}
                onChange={(e) => updateField("profession", e.target.value)}
                error={errors.profession}
                disabled={state === "submitting"}
              />
            </>
          )}

          <CheckboxInput
            id="consent"
            name="consent"
            label="I agree to receive masterclass-related communication from VLS Law Academy."
            checked={values.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            error={errors.consent}
            disabled={state === "submitting"}
          />



          <Button type="submit" size="lg" className="w-full" disabled={state === "submitting"}>
            {state === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Submitting...
              </>
            ) : isWaitlist ? (
              "Join the Waitlist"
            ) : (
              `Continue to Payment — ₹${masterclass.fee ?? 499}`
            )}
          </Button>

          <p className="text-center text-xs text-brand-gray-500">
            Prefer to talk?{" "}
            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "registration_form" })}
              className="font-semibold text-brand-red-600 underline-offset-2 hover:underline"
            >
              Ask on WhatsApp
            </a>
          </p>
        </form>
      </div>

      {/* ---------- Payment Instruction Popup ---------- */}
      {instructionOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="instruction-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setInstructionOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setInstructionOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-brand-gray-400 hover:bg-brand-gray-100 hover:text-brand-black transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h4
              id="instruction-title"
              className="text-xl font-bold text-brand-black"
            >
              Before You Pay
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-brand-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-brand-red-600 font-bold">1.</span>
                Wait until you are redirected to the confirmation page after payment. Do not close or refresh the tab.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-brand-red-600 font-bold">2.</span>
                Closing the page during payment may mean your registration details are not recorded.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-brand-red-600 font-bold">3.</span>
                If any issue arises, contact us on WhatsApp or call support.
              </li>
            </ul>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-brand-gray-700">
              <input
                id="agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-brand-gray-300 text-brand-red-600 focus:ring-2 focus:ring-brand-red-500"
              />
              <span>I understand and agree to the above.</span>
            </label>

            <Button
              type="button"
              size="lg"
              className="mt-6 w-full"
              disabled={!agree}
              onClick={openRazorpay}
            >
              I Agree &amp; Pay ₹{masterclass.fee ?? 499}
            </Button>
          </div>
        </div>
      )}
      {/* ---------- Processing Payment Overlay ---------- */}
      {state === "processing" && <ProcessingState />}
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-states
// ---------------------------------------------------------------------------

function ProcessingState() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Processing payment"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Dark blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-2xl bg-white px-8 py-10 text-center shadow-2xl">
        {/* Spinner ring */}
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-4 border-brand-red-100" />
          <Loader2 className="h-10 w-10 animate-spin text-brand-red-600" aria-hidden="true" />
        </div>

        <h3 className="text-xl font-bold text-brand-black">Processing Your Payment</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-gray-600">
          Please wait. Do not close or refresh this page.
        </p>

        {/* Progress dots */}
        <div className="mt-6 flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-brand-red-400"
              style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosedState() {
  const nextUpdateUrl = getWhatsappUrl(
    "Hello VLS Law Academy, please notify me about the next Consumer Protection Law Masterclass batch."
  );

  return (
    <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 text-center shadow-card-hover sm:p-8">
      <h3 className="text-xl font-bold text-brand-black">Registration Closed</h3>
      <p className="mt-2 text-sm text-brand-gray-600">
        Registrations for this batch of the Consumer Protection Law Masterclass are now closed. Reach out to be
        notified about the next masterclass.
      </p>
      <div className="mt-5 space-y-3">
        <Button
          href={nextUpdateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
          onClick={() => trackEvent("whatsapp_click", { source: "closed_state_update_request" })}
        >
          Request Next Masterclass Update
        </Button>
        <Button
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="w-full"
          onClick={() => trackEvent("whatsapp_click", { source: "closed_state" })}
        >
          Ask on WhatsApp
        </Button>
      </div>
    </div>
  );
}

