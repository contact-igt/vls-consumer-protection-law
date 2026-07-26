import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FastFacts } from "@/components/sections/FastFacts";
import { WhyAttend } from "@/components/sections/WhyAttend";
import { GapVsSolution } from "@/components/sections/GapVsSolution";
import { CaseJourney } from "@/components/sections/CaseJourney";
import { Curriculum } from "@/components/sections/Curriculum";
import { SessionFlow } from "@/components/sections/SessionFlow";
import { Takeaways } from "@/components/sections/Takeaways";
import { LearningOutcomes } from "@/components/sections/LearningOutcomes";
import { Faculty } from "@/components/sections/Faculty";
import { Audience } from "@/components/sections/Audience";
import { WhyVls } from "@/components/sections/WhyVls";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { masterclass } from "@/data/masterclass";
import { getEventStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: masterclass.seo.title,
  description: masterclass.seo.description,
  alternates: {
    canonical: masterclass.seo.canonicalUrl,
  },
  openGraph: {
    title: masterclass.seo.title,
    description: masterclass.seo.description,
    url: masterclass.seo.canonicalUrl,
    siteName: "VLS Law Academy",
    images: [{ url: masterclass.seo.socialImage }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: masterclass.seo.title,
    description: masterclass.seo.description,
    images: [masterclass.seo.socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConsumerProtectionLawMasterclassPage() {
  const eventStructuredData = getEventStructuredData();

  return (
    <>
      {eventStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
      )}
      <Hero />
      <FastFacts />
      <WhyAttend />
      <GapVsSolution />
      <CaseJourney />
      <Curriculum />
      <SessionFlow />
      <Takeaways />
      <LearningOutcomes />
      <Faculty />
      <Audience />
      <WhyVls />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
