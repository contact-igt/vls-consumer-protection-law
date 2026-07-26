import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { masterclass } from "@/data/masterclass";

export const metadata: Metadata = {
  title: "Privacy Policy | VLS Law Academy",
  description: "Privacy Policy for VLS Law Academy's Consumer Protection Law Masterclass registration page.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <Link href="/consumer-protection-law-masterclass" className="text-sm font-semibold text-brand-red-600 hover:underline">
        ← Back to Masterclass
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-brand-black">Privacy Policy</h1>
      <p className="mt-4 rounded-lg border border-dashed border-brand-gray-300 bg-brand-gray-50 p-4 text-sm text-brand-gray-600">
        TODO(content): This is a placeholder page. Replace this content with VLS Law Academy&rsquo;s approved
        Privacy Policy before the site is published.
      </p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-gray-700">
        <p>
          VLS Law Academy collects information submitted through the registration form on this page — including
          full name, email address, mobile number, city and current profession or status — solely to process
          registrations for the Consumer Protection Law Masterclass and to share related communication.
        </p>
        <p>
          Information is not sold to third parties. For questions about how your data is used, contact{" "}
          <a href={`mailto:${masterclass.contactEmail}`} className="font-semibold text-brand-red-600 hover:underline">
            {masterclass.contactEmail}
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
