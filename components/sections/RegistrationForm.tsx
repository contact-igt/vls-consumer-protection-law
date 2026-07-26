"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextInput, SelectInput, CheckboxInput } from "@/components/ui/FormField";
import { masterclass } from "@/data/masterclass";
import { validateRegistrationForm, hasErrors, type RegistrationFormErrors, type RegistrationFormValues } from "@/lib/validation";
import { buildLeadPayload, submitLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";
import { getWhatsappUrl } from "@/lib/whatsapp";

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

type SubmitState = "idle" | "submitting" | "success" | "error";

export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  function updateField<K extends keyof RegistrationFormValues>(field: K, value: RegistrationFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state === "submitting" || state === "success") return;

    // Basic spam prevention: a hidden honeypot field bots tend to fill, and a
    // minimum time-on-page check to catch instant automated submissions.
    if (honeypotRef.current?.value) return;
    if (mountedAtRef.current === null || Date.now() - mountedAtRef.current < 1200) return;

    const validationErrors = validateRegistrationForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setState("submitting");
    trackEvent("form_submit");

    const payload = buildLeadPayload(values);
    const result = await submitLead(payload);

    if (result.success) {
      setState("success");
      trackEvent("form_success");
      if (masterclass.paymentUrl) {
        trackEvent("payment_click", { source: "form_success_redirect" });
        window.location.href = masterclass.paymentUrl;
      }
    } else {
      setState("error");
      setErrorMessage(result.message);
      trackEvent("form_error", { message: result.message });
    }
  }

  if (masterclass.registrationStatus === "CLOSED") {
    return <ClosedState />;
  }

  if (state === "success") {
    return <SuccessState redirecting={Boolean(masterclass.paymentUrl)} />;
  }

  const isWaitlist = masterclass.registrationStatus === "WAITLIST";

  return (
    <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-card-hover sm:p-8">
      <h3 className="text-2xl font-bold text-brand-black">{isWaitlist ? "Join the Waitlist" : "Reserve Your Seat"}</h3>
      <p className="mt-2 text-sm text-brand-gray-600">
        {isWaitlist
          ? "Registrations for the current batch are full. Join the waitlist to be notified as soon as the next masterclass batch opens."
          : "Enter your details to receive the masterclass information and continue with registration."}
      </p>

      <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-4" onFocus={handleFocusStart}>
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

        {state === "error" && (
          <div role="alert" className="flex items-start gap-2 rounded-lg bg-brand-red-50 p-3 text-sm text-brand-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={state === "submitting"}>
          {state === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : isWaitlist ? (
            "Join the Waitlist"
          ) : (
            "Continue to Registration"
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
  );
}

function SuccessState({ redirecting }: { redirecting: boolean }) {
  return (
    <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 text-center shadow-card-hover sm:p-8">
      <CheckCircle2 className="mx-auto h-12 w-12 text-brand-red-600" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-bold text-brand-black">Thank You for Registering</h3>
      <p className="mt-2 text-sm text-brand-gray-600">
        {redirecting
          ? "Your details have been received. You are being redirected to complete your registration."
          : "Your details have been received. Our team will reach out with the next steps and payment details shortly."}
      </p>
      <div className="mt-5">
        <Button
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="w-full"
          onClick={() => trackEvent("whatsapp_click", { source: "form_success" })}
        >
          Ask on WhatsApp
        </Button>
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
