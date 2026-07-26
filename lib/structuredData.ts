import { masterclass } from "@/data/masterclass";
import { isConfirmed } from "@/lib/utils";

/**
 * Only returns Event structured data once date, time, format and fee are all
 * confirmed in data/masterclass.ts. Publishing Event schema with invented or
 * placeholder values would mislead search engines and users, so this
 * intentionally returns null until every required field is real.
 */
export function getEventStructuredData(): Record<string, unknown> | null {
  const hasLocation = isConfirmed(masterclass.platform ?? undefined) || isConfirmed(masterclass.venue ?? undefined);

  const isComplete =
    isConfirmed(masterclass.date) &&
    isConfirmed(masterclass.startTime) &&
    isConfirmed(masterclass.endTime) &&
    isConfirmed(masterclass.format) &&
    masterclass.fee !== null &&
    hasLocation;

  if (!isComplete) return null;

  const isOnline = masterclass.format === "Online (Live)";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: masterclass.title,
    description: masterclass.description,
    startDate: `${masterclass.date}T${masterclass.startTime}`,
    endDate: `${masterclass.date}T${masterclass.endTime}`,
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: isOnline
      ? { "@type": "VirtualLocation", url: masterclass.seo.canonicalUrl }
      : { "@type": "Place", name: masterclass.venue },
    organizer: {
      "@type": "Organization",
      name: "VLS Law Academy",
      url: masterclass.officialWebsiteUrl,
    },
    offers: {
      "@type": "Offer",
      price: masterclass.fee,
      priceCurrency: masterclass.currency,
      url: masterclass.paymentUrl || masterclass.seo.canonicalUrl,
      availability: "https://schema.org/InStock",
    },
  };
}
