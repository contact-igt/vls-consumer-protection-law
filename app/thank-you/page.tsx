"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { masterclass } from "@/data/masterclass";
import { trackEvent } from "@/lib/analytics";
import type { PaymentPayload } from "@/types/masterclass";

export default function ThankYouPage() {
  const [details, setDetails] = useState<PaymentPayload | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    trackEvent("thank_you_page_view");
    try {
      const raw = localStorage.getItem("PaymentDetails");
      if (raw) {
        setDetails(JSON.parse(raw) as PaymentPayload);
      }
    } catch (err) {
      console.error("Could not read PaymentDetails from localStorage:", err);
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-lg text-center">
        <CheckCircle2
          className="mx-auto h-20 w-20 text-green-500"
          aria-hidden="true"
        />

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
          Payment Successful
        </h1>

        <p className="mt-4 text-base leading-relaxed text-brand-gray-600">
          Thank you for registering for the{" "}
          <span className="font-semibold text-brand-black">
            {masterclass.title}
          </span>
          . You will receive the masterclass details on your registered email and
          mobile number.
        </p>

        {details && (
          <div className="mt-8 rounded-2xl border border-brand-gray-200 bg-brand-gray-50 p-6 text-left shadow-sm">
            <h2 className="mb-4 text-base font-bold text-brand-black">
              Transaction Summary
            </h2>
            <dl className="space-y-3 text-sm">
              {[
                { label: "Name", value: details.name },
                { label: "Email", value: details.email },
                { label: "Mobile", value: details.mobile },
                { label: "Amount Paid", value: `₹${details.amount}` },
                { label: "Transaction ID", value: details.razorpay_payment_id },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                  <dt className="font-semibold text-brand-gray-500">{label}</dt>
                  <dd className="font-medium text-brand-black break-all">{value || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-8">
          <Button
            href={`/consumer-protection-law-masterclass`}
            variant="outline"
            className="inline-flex items-center gap-2"
            onClick={() => trackEvent("back_to_home_click", { source: "thank_you" })}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Masterclass
          </Button>
        </div>
      </Container>
    </section>
  );
}
