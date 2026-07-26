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
