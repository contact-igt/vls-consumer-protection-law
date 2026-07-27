import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageViewTracker } from "@/components/ui/PageViewTracker";

export const metadata: Metadata = {
  title: "Payment Successful | VLS Law Academy",
  description: "Your payment was successful. Thank you for registering for the Consumer Protection Law Masterclass.",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
