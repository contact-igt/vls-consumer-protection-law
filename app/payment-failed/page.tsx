"use client";

import { XCircle, Phone, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { masterclass } from "@/data/masterclass";
import { trackEvent } from "@/lib/analytics";
import { getWhatsappUrl } from "@/lib/whatsapp";
import { useEffect } from "react";

export default function PaymentFailedPage() {
  useEffect(() => {
    trackEvent("payment_failed_page_view");
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-lg text-center">
        <XCircle
          className="mx-auto h-20 w-20 text-brand-red-600"
          aria-hidden="true"
        />

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
          Payment Failed
        </h1>

        <p className="mt-4 text-base leading-relaxed text-brand-gray-600">
          We could not process your payment. This could be due to a network issue
          or the payment was cancelled. Please try again or contact our support
          team for help.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            href="/consumer-protection-law-masterclass#register"
            className="inline-flex items-center gap-2"
            onClick={() => trackEvent("try_again_click", { source: "payment_failed" })}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>

          <Button
            href={`tel:${masterclass.contactNumber.replace(/\s/g, "")}`}
            variant="outline"
            className="inline-flex items-center gap-2"
            onClick={() => trackEvent("support_call_click", { source: "payment_failed" })}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Support
          </Button>
        </div>

        <p className="mt-6 text-sm text-brand-gray-500">
          You can also reach us on{" "}
          <a
            href={getWhatsappUrl("Hello, I had a payment issue on the Consumer Protection Law Masterclass page.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-red-600 underline-offset-2 hover:underline"
            onClick={() => trackEvent("whatsapp_click", { source: "payment_failed" })}
          >
            WhatsApp
          </a>{" "}
          or email us at{" "}
          <a
            href={`mailto:${masterclass.contactEmail}`}
            className="font-semibold text-brand-red-600 underline-offset-2 hover:underline"
          >
            {masterclass.contactEmail}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
