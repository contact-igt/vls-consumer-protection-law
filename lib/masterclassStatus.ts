import type { MasterclassConfig } from "@/types/masterclass";

export const PRICE_ANNOUNCEMENT_TEXT = "Price will be announced shortly.";
export const DATE_TIME_ANNOUNCEMENT_TEXT = "Date and time will be announced shortly.";

export const isRegistrationOpen = (config: MasterclassConfig): boolean => {
  if (config?.registrationStatus !== "OPEN") return false;
  if (!config?.classStartAt) return false;

  const classStartDate = new Date(config.classStartAt);
  if (Number.isNaN(classStartDate.getTime())) return false;

  return new Date() < classStartDate;
};

export const isWaitlistMode = (config: MasterclassConfig): boolean => {
  return !isRegistrationOpen(config);
};

export const getProgramDate = (config: MasterclassConfig): string => {
  if (!isRegistrationOpen(config)) {
    return "TBA";
  }
  return config?.classStartAt || config?.date || "TBA";
};

export const getPrimaryCtaText = (config: MasterclassConfig): string => {
  return isRegistrationOpen(config) ? "Register Here" : "Join Waitlist";
};

export const getSectionCtaText = (
  config: MasterclassConfig,
  fallback = "Register Now"
): string => {
  return isRegistrationOpen(config) ? fallback : "Join Waitlist";
};

export const getSessionDisplay = (config: MasterclassConfig): string => {
  if (!isRegistrationOpen(config)) return DATE_TIME_ANNOUNCEMENT_TEXT;
  return config?.displayDate
    ? `${config.displayDate} · ${config.startTime} – ${config.endTime} ${config.timeZone}`
    : DATE_TIME_ANNOUNCEMENT_TEXT;
};

export const getPriceDisplay = (config: MasterclassConfig): string => {
  if (!isRegistrationOpen(config)) return PRICE_ANNOUNCEMENT_TEXT;
  return config?.fee ? `₹${config.fee}` : PRICE_ANNOUNCEMENT_TEXT;
};
