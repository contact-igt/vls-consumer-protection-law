import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageViewTracker } from "@/components/ui/PageViewTracker";

export const metadata: Metadata = {
  title: "Payment Failed | VLS Law Academy",
  description: "There was an issue with your payment. Please try again or contact support.",
  robots: { index: false, follow: false },
};

export default function PaymentFailedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
