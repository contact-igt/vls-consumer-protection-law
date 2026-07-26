import { masterclass } from "@/data/masterclass";

const DEFAULT_MESSAGE =
  "Hello VLS Law Academy, I would like to know more about the Consumer Protection Law 2-Hour Masterclass.";

export function getWhatsappUrl(message: string = DEFAULT_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${masterclass.whatsappNumber}?text=${encoded}`;
}
