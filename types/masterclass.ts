// Central type definitions for the Consumer Protection Law Masterclass landing page.
// Keep this in sync with data/masterclass.ts — every editable field on the site
// should be typed here and populated there, never hardcoded inside components.

export type RegistrationStatus = "OPEN" | "WAITLIST" | "CLOSED";

export type MasterclassFormat = "Online (Live)" | "Offline" | "Hybrid" | "TO_BE_CONFIRMED";

export interface FacultyDetails {
  name: string;
  photo: string;
  qualifications: string[];
  designation: string;
  areasOfPractice: string[];
  experienceSummary: string;
  biography: string;
  profileUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo?: string;
  /** Omit when only an approved photo/video is available and no verified
   * written quote exists — the card then renders as a visual/video
   * testimonial instead of inventing quotation text. */
  quote?: string;
  videoUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AgendaItem {
  id: string;
  timeRange: string;
  title: string;
  points: string[];
}

export interface CurriculumTopic {
  id: string;
  number: number;
  title: string;
  points: string[];
}

export interface AudienceCategory {
  id: string;
  label: string;
  icon: string;
}

export interface CaseJourneyStep {
  id: string;
  step: number;
  label: string;
}

export interface WhyAttendCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GapSolutionPair {
  gap: string[];
  solution: string[];
}

export interface WhyVlsPoint {
  id: string;
  title: string;
  description: string;
}

export interface FastFact {
  id: string;
  label: string;
  value: string | null;
  visible: boolean;
}

export interface LeadFormPayload {
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  profession: string;
  consent: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  landingPageUrl?: string;
  submittedAt: string;
}

export interface PaymentPayload {
  name: string;
  email: string;
  /** Mobile number with +91 prefix, e.g. "+919876543210" */
  mobile: string;
  city: string;
  profession: string;
  amount: number | string;
  programm_date: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_status: "paid" | "waitlist";
  captured: string;
  page_name: string;
  ip_address: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface MasterclassConfig {
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  duration: string;
  date: string | "TO_BE_CONFIRMED";
  displayDate: string;
  startTime: string | "TO_BE_CONFIRMED";
  endTime: string | "TO_BE_CONFIRMED";
  timeZone: string;
  classStartAt?: string;
  pageName?: string;
  format: MasterclassFormat;
  platform: string | null;
  venue: string | null;
  language: string;
  fee: number | null;
  originalFee: number | null;
  currency: string;
  registrationDeadline: string | null;
  registrationStatus: RegistrationStatus;
  paymentUrl: string;
  whatsappNumber: string;
  contactNumber: string;
  contactNumberSecondary: string | null;
  contactEmail: string;
  contactAddress: string | "TO_BE_CONFIRMED";
  socialLinks: SocialLink[];
  officialWebsiteUrl: string;
  certificateAvailable: boolean | null;
  recordingAvailable: boolean | null;
  qnaAvailable: boolean | null;
  faculty: FacultyDetails | null;
  fastFacts: FastFact[];
  whyAttend: WhyAttendCard[];
  gapVsSolution: GapSolutionPair;
  caseJourney: CaseJourneyStep[];
  curriculum: CurriculumTopic[];
  agenda: AgendaItem[];
  takeaways: string[];
  resourcesEnabled: boolean;
  resources: string[];
  learningOutcomes: string[];
  audience: AudienceCategory[];
  whyVls: WhyVlsPoint[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    socialImage: string;
  };
}
