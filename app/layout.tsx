import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// TODO(brand): Chosen for a bolder, more authoritative legal-academy
// headline character than the previous Inter/Poppins pairing. The reference
// site's actual computed font-family could not be inspected (network access
// to vlslawacademy.com is blocked in this environment) — swap this for the
// verified reference typeface once it can be confirmed.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://consumerprotectionlaw.vlslawacademy.com"),
  title: {
    default: "VLS Law Academy",
    template: "%s",
  },
  description: "VLS Law Academy — practice-oriented legal education, masterclasses and courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-brand-black">{children}</body>
      {/* Razorpay checkout script — loaded after the page is interactive. */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </html>
  );
}
