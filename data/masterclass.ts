// =============================================================================
// CENTRAL MASTERCLASS CONFIGURATION
// =============================================================================
// Every editable piece of content on the Consumer Protection Law Masterclass
// landing page lives in this file. Update dates, fees, faculty, and links here
// — never duplicate them inside individual components.
//
// Fields marked "TO_BE_CONFIRMED" or `null` are intentional placeholders for
// details that have not been finalised. Do NOT invent values for them; the
// site is designed to render sensible fallback states until real data lands.
// =============================================================================

import type { MasterclassConfig } from "@/types/masterclass";

export const masterclass: MasterclassConfig = {
  title: "Consumer Protection Law Masterclass",
  shortTitle: "Consumer Protection Law Masterclass",
  subtitle: "Master Consumer Litigation & Commission Practice",
  description:
    "Understand how to assess consumer disputes, structure effective complaints, identify the appropriate Consumer Commission and navigate essential filing, hearing, appeal and execution procedures through a focused, practical masterclass.",
  duration: "2 Hours",

  // TODO(content): Confirm final date, time and update below.
  date: "TO_BE_CONFIRMED",
  displayDate: "Date To Be Confirmed",
  startTime: "TO_BE_CONFIRMED",
  endTime: "TO_BE_CONFIRMED",
  timeZone: "IST",

  // TODO(content): Confirm final format (Online / Offline / Hybrid) and platform/venue.
  format: "TO_BE_CONFIRMED",
  platform: null,
  venue: null,

  language: "English & Hindi",

  // TODO(content): Confirm masterclass fee before launch.
  fee: null,
  originalFee: null,
  currency: "INR",

  // TODO(content): Confirm registration deadline (used only for a real countdown).
  registrationDeadline: null,

  // Controls which registration state renders: OPEN | WAITLIST | CLOSED
  registrationStatus: "OPEN",

  // TODO(integration): Add the live payment link before launch.
  paymentUrl: "",

  whatsappNumber: "919500207811",
  contactNumber: "+91 95002 07811",
  // TODO(content): Confirm a second contact number from the official VLS website before adding it.
  contactNumberSecondary: null,
  contactEmail: "info@vlslawacademy.com",
  // TODO(content): Confirm the registered/office address from the official VLS website before publishing.
  contactAddress: "TO_BE_CONFIRMED",
  // TODO(content): Confirm official social-media URLs from https://www.vlslawacademy.com/ before publishing.
  socialLinks: [],
  officialWebsiteUrl: "https://www.vlslawacademy.com/",

  // TODO(content): Confirm certificate, recording and Q&A policy before launch.
  certificateAvailable: null,
  recordingAvailable: null,
  qnaAvailable: null,

  // TODO(content): Faculty for this masterclass has not been confirmed.
  // Do not populate with a faculty member from another VLS program.
  faculty: null,

  fastFacts: [
    { id: "duration", label: "Duration", value: "2 Hours", visible: true },
    { id: "session-type", label: "Session Type", value: "Live Intensive Masterclass", visible: true },
    { id: "learning-style", label: "Learning Style", value: "Practical and Case-Based", visible: true },
    { id: "main-focus", label: "Main Focus", value: "Consumer Litigation and Commission Practice", visible: true },
    { id: "suitable-for", label: "Suitable For", value: "Law Students, Advocates and Legal Professionals", visible: true },
    { id: "language", label: "Language", value: "English & Hindi", visible: true },
    { id: "format", label: "Format", value: null, visible: true },
    { id: "fee", label: "Masterclass Fee", value: null, visible: true },
    { id: "certificate", label: "Certificate", value: null, visible: false },
    { id: "recording", label: "Recording", value: null, visible: false },
  ],

  whyAttend: [
    {
      id: "understand-rights",
      title: "Understand Consumer Rights",
      description: "Gain clarity on core consumer protections, liabilities and legal remedies.",
      icon: "scale",
    },
    {
      id: "assess-disputes",
      title: "Assess Consumer Disputes",
      description: "Understand maintainability, cause of action, limitation and jurisdiction.",
      icon: "search",
    },
    {
      id: "understand-filing",
      title: "Understand Complaint Filing",
      description: "Learn the essential structure of a consumer complaint and the required supporting documents.",
      icon: "file-text",
    },
    {
      id: "practical-clarity",
      title: "Build Practical Clarity",
      description: "Develop a structured overview of Commission proceedings, orders, appeals and execution.",
      icon: "compass",
    },
  ],

  gapVsSolution: {
    gap: [
      "Difficulty deciding whether a complaint is maintainable",
      "Confusion about limitation and jurisdiction",
      "Lack of complaint-structuring experience",
      "Uncertainty about supporting documents",
      "Limited understanding of Consumer Commission procedures",
      "Lack of clarity about appeals and execution",
    ],
    solution: [
      "Consumer-dispute assessment framework",
      "Complaint structure and drafting approach",
      "Jurisdiction and limitation essentials",
      "Filing and document requirements",
      "Hearing and adjudication overview",
      "Appeal and execution fundamentals",
    ],
  },

  caseJourney: [
    { id: "step-1", step: 1, label: "Client Grievance" },
    { id: "step-2", step: 2, label: "Document Review" },
    { id: "step-3", step: 3, label: "Maintainability Check" },
    { id: "step-4", step: 4, label: "Limitation and Jurisdiction" },
    { id: "step-5", step: 5, label: "Complaint Drafting" },
    { id: "step-6", step: 6, label: "Filing Before the Appropriate Commission" },
    { id: "step-7", step: 7, label: "Response and Evidence" },
    { id: "step-8", step: 8, label: "Hearing and Adjudication" },
    { id: "step-9", step: 9, label: "Final Order" },
    { id: "step-10", step: 10, label: "Appeal or Execution" },
  ],

  curriculum: [
    {
      id: "topic-1",
      number: 1,
      title: "Consumer Protection Law Essentials",
      points: [
        "Who qualifies as a consumer",
        "Goods and services",
        "Defect and deficiency",
        "Unfair trade practices",
        "Consumer rights",
        "Available remedies",
      ],
    },
    {
      id: "topic-2",
      number: 2,
      title: "Consumer Dispute Assessment",
      points: [
        "Identifying the parties",
        "Cause of action",
        "Maintainability",
        "Limitation",
        "Territorial jurisdiction",
        "Pecuniary jurisdiction",
      ],
    },
    {
      id: "topic-3",
      number: 3,
      title: "Complaint Drafting and Filing",
      points: [
        "Essential complaint structure",
        "Statement of facts",
        "Grounds",
        "Reliefs requested",
        "Supporting documents",
        "Filing preparation",
      ],
    },
    {
      id: "topic-4",
      number: 4,
      title: "Consumer Commission Procedures",
      points: [
        "District Commission",
        "State Commission",
        "National Commission",
        "Selecting the appropriate Commission",
        "Main procedural stages",
      ],
    },
    {
      id: "topic-5",
      number: 5,
      title: "Adjudication, Appeals and Execution",
      points: [
        "Admission",
        "Written response",
        "Evidence",
        "Hearing",
        "Orders and remedies",
        "Appeal overview",
        "Execution overview",
      ],
    },
  ],

  agenda: [
    {
      id: "agenda-1",
      timeRange: "0–15 Minutes",
      title: "Consumer Protection Law Foundations",
      points: ["Who is a consumer?", "Goods and services", "Defect and deficiency", "Consumer rights and remedies"],
    },
    {
      id: "agenda-2",
      timeRange: "15–40 Minutes",
      title: "Assessing a Consumer Dispute",
      points: ["Maintainability", "Cause of action", "Limitation", "Territorial jurisdiction", "Pecuniary jurisdiction"],
    },
    {
      id: "agenda-3",
      timeRange: "40–75 Minutes",
      title: "Complaint Drafting and Filing Essentials",
      points: [
        "Complaint structure",
        "Facts, grounds and reliefs",
        "Supporting documents",
        "Filing before the appropriate Consumer Commission",
      ],
    },
    {
      id: "agenda-4",
      timeRange: "75–100 Minutes",
      title: "Commission Procedure and Adjudication",
      points: ["Admission", "Response", "Evidence", "Hearing", "Orders and remedies"],
    },
    {
      id: "agenda-5",
      timeRange: "100–115 Minutes",
      title: "Appeals and Execution Overview",
      points: ["Appeal fundamentals", "Post-order steps", "Execution fundamentals"],
    },
    {
      id: "agenda-6",
      // Swapped to "Key Takeaways and Q&A" automatically below once qnaAvailable is true.
      timeRange: "115–120 Minutes",
      title: "Key Takeaways and Closing",
      points: [],
    },
  ],

  takeaways: [
    "A clear framework for assessing consumer disputes",
    "Better understanding of maintainability and jurisdiction",
    "An overview of consumer complaint structure",
    "Clarity regarding documentation and filing",
    "Understanding of key Consumer Commission procedures",
    "An overview of appeals and execution",
    "A structured starting point for further consumer-law practice",
  ],

  // TODO(content): Enable and populate once resources are approved for distribution.
  resourcesEnabled: false,
  resources: [
    "Consumer complaint structure guide",
    "Document checklist",
    "Case-assessment checklist",
    "Filing-preparation checklist",
  ],

  learningOutcomes: [
    "Identify the key elements of a consumer dispute",
    "Understand the basic maintainability of a complaint",
    "Recognise limitation and jurisdiction considerations",
    "Understand the structure of a consumer complaint",
    "Identify common supporting documents",
    "Understand the main stages before Consumer Commissions",
    "Recognise the basic appeal and execution process",
    "Approach consumer-law matters with greater clarity",
  ],

  audience: [
    { id: "llb-students", label: "LLB Students", icon: "graduation-cap" },
    { id: "final-year", label: "Final-Year Law Students", icon: "book-open" },
    { id: "young-advocates", label: "Young Advocates", icon: "briefcase" },
    { id: "practising-advocates", label: "Practising Advocates", icon: "scale" },
    { id: "judiciary-aspirants", label: "Judiciary Aspirants", icon: "landmark" },
    { id: "corporate-law-aspirants", label: "Corporate Law Aspirants", icon: "building" },
    { id: "legal-professionals", label: "Legal Professionals", icon: "users" },
    { id: "consumer-law-interest", label: "Professionals Interested in Consumer Law", icon: "shield-check" },
  ],

  whyVls: [
    {
      id: "practice-oriented",
      title: "Practice-Oriented Legal Education",
      description: "Learning designed around real practice requirements rather than theory alone.",
    },
    {
      id: "practitioner-guidance",
      title: "Guidance From Legal Practitioners",
      description: "Sessions led by practitioners engaged in active legal practice and teaching.",
    },
    {
      id: "structured-format",
      title: "Structured Masterclass Format",
      description: "A focused, well-organised session structure designed for practical learning.",
    },
    {
      id: "case-based",
      title: "Case-Based Explanations",
      description: "Concepts explained through practical, case-based context rather than abstract theory.",
    },
    {
      id: "community",
      title: "Community of Law Students and Professionals",
      description: "Learn alongside a wider community of law students and legal professionals.",
    },
  ],

  // TODO(content): No official VLS testimonials for this masterclass have been supplied yet.
  // Add only verified, approved testimonials here — do not fabricate names or quotes.
  testimonials: [],

  faqs: [
    {
      id: "faq-1",
      question: "Who is this masterclass suitable for?",
      answer:
        "This masterclass is designed for law students, young advocates, practising advocates, judiciary aspirants and legal professionals interested in understanding consumer litigation practice.",
    },
    {
      id: "faq-2",
      question: "How long is the masterclass?",
      answer: "This is a focused 2-hour masterclass.",
    },
    {
      id: "faq-3",
      question: "Is the masterclass online or offline?",
      answer: "FORMAT_PLACEHOLDER",
    },
    {
      id: "faq-4",
      question: "What language will be used?",
      answer: "LANGUAGE_PLACEHOLDER",
    },
    {
      id: "faq-5",
      question: "Will complaint drafting be covered?",
      answer:
        "The masterclass will explain the essential structure, supporting documents and approach involved in drafting and filing a consumer complaint.",
    },
    {
      id: "faq-6",
      question: "Is this a complete certification course?",
      answer:
        "No. This is a focused 2-hour masterclass designed to provide practical clarity on essential consumer litigation concepts and procedures.",
    },
    {
      id: "faq-7",
      question: "Will participants receive a certificate?",
      answer: "CERTIFICATE_PLACEHOLDER",
    },
    {
      id: "faq-8",
      question: "Will a recording be available?",
      answer: "RECORDING_PLACEHOLDER",
    },
    {
      id: "faq-9",
      question: "Can practising advocates attend?",
      answer: "Yes. Advocates seeking a structured introduction or refresher on consumer litigation may attend.",
    },
    {
      id: "faq-10",
      question: "Will there be a question-and-answer session?",
      answer: "QNA_PLACEHOLDER",
    },
    {
      id: "faq-11",
      question: "What happens after registration?",
      answer:
        "After submitting the form, participants will be taken to the next registration or payment step and may receive further communication from VLS Law Academy.",
    },
  ],

  seo: {
    title: "Consumer Protection Law Masterclass | VLS Law Academy",
    description:
      "Join VLS Law Academy's 2-hour Consumer Protection Law Masterclass and understand consumer complaint assessment, drafting, Consumer Commission procedures, appeals and execution through practical learning.",
    canonicalUrl: "https://consumerprotectionlaw.vlslawacademy.com/",
    // TODO(assets): Replace this placeholder with a real 1200x630 JPG/PNG social-share
    // image before launch — many crawlers (e.g. Facebook) do not render SVG og:images.
    socialImage: "/images/masterclass/social-share.svg",
  },
};

export default masterclass;
