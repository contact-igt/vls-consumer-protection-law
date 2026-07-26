import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { masterclass } from "@/data/masterclass";

export const metadata: Metadata = {
  title: "Terms and Conditions | VLS Law Academy",
  description: "Terms and Conditions for VLS Law Academy's Consumer Protection Law Masterclass.",
  robots: { index: false, follow: true },
};

export default function TermsConditionsPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <Link href="/consumer-protection-law-masterclass" className="text-sm font-semibold text-brand-red-600 hover:underline">
        ← Back to Masterclass
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-brand-black">Terms and Conditions</h1>
      <p className="mt-4 rounded-lg border border-dashed border-brand-gray-300 bg-brand-gray-50 p-4 text-sm text-brand-gray-600">
        TODO(content): This is a placeholder page. Replace this content with VLS Law Academy&rsquo;s approved
        Terms and Conditions before the site is published.
      </p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-gray-700">
        <p>
          Registration for the Consumer Protection Law Masterclass is subject to confirmation of seat availability
          and payment where applicable. Masterclass date, time, fee and format are subject to change; registered
          participants will be informed of any changes.
        </p>
        <p>
          For questions, contact{" "}
          <a href={`mailto:${masterclass.contactEmail}`} className="font-semibold text-brand-red-600 hover:underline">
            {masterclass.contactEmail}
          </a>{" "}
          or call {masterclass.contactNumber}.
        </p>
      </div>
    </Container>
  );
}
