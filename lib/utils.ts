export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatFee(fee: number | null, currency: string): string | null {
  if (fee === null) return null;
  const symbol = currency === "INR" ? "₹" : currency;
  return `${symbol}${fee.toLocaleString("en-IN")}`;
}

export function isConfirmed(value: string | null | undefined): boolean {
  if (!value) return false;
  return value !== "TO_BE_CONFIRMED";
}

/** Converts a duration value like "2 Hours" into its hyphenated adjective
 * form "2-Hour" for use directly before a noun (e.g. "2-Hour Masterclass
 * Flow"), derived from the single duration field so the two forms never
 * drift out of sync. */
export function toDurationAdjective(duration: string): string {
  const match = duration.match(/^(\d+)\s*Hours?$/i);
  return match ? `${match[1]}-Hour` : duration;
}
