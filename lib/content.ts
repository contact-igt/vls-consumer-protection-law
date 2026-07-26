import { masterclass } from "@/data/masterclass";
import type { AgendaItem, FaqItem, FastFact } from "@/types/masterclass";
import { isConfirmed } from "@/lib/utils";

const UNCONFIRMED_LABEL = "To be confirmed";

function policyLabel(value: boolean | null, whenTrue: string, whenFalse: string): string {
  if (value === null) return UNCONFIRMED_LABEL;
  return value ? whenTrue : whenFalse;
}

/** Resolves the FAQ placeholder tokens against the live config so the answers
 * never drift out of sync with format, language, certificate, recording and
 * Q&A settings stored in data/masterclass.ts. */
export function resolveFaqs(): FaqItem[] {
  const formatAnswer = isConfirmed(masterclass.format)
    ? `This masterclass will be conducted in ${masterclass.format} format.`
    : "The format (online or offline) will be confirmed shortly. Please check back or contact us for the latest update.";

  const languageAnswer = `This masterclass will be conducted in ${masterclass.language}.`;

  const certificateAnswer = policyLabel(
    masterclass.certificateAvailable,
    "Yes, a certificate of participation will be provided to attendees.",
    "A certificate is not being offered for this masterclass."
  );
  const certificateFallback =
    masterclass.certificateAvailable === null
      ? "The certificate policy for this masterclass will be confirmed shortly."
      : certificateAnswer;

  const recordingAnswer = policyLabel(
    masterclass.recordingAvailable,
    "Yes, a recording will be made available to registered participants.",
    "A recording will not be made available for this masterclass."
  );
  const recordingFallback =
    masterclass.recordingAvailable === null
      ? "The recording policy for this masterclass will be confirmed shortly."
      : recordingAnswer;

  const qnaAnswer = policyLabel(
    masterclass.qnaAvailable,
    "Yes, time will be set aside at the end of the masterclass for questions.",
    "This masterclass will not include a dedicated question-and-answer segment."
  );
  const qnaFallback =
    masterclass.qnaAvailable === null
      ? "The question-and-answer format will be confirmed shortly."
      : qnaAnswer;

  return masterclass.faqs.map((faq) => {
    switch (faq.answer) {
      case "FORMAT_PLACEHOLDER":
        return { ...faq, answer: formatAnswer };
      case "LANGUAGE_PLACEHOLDER":
        return { ...faq, answer: languageAnswer };
      case "CERTIFICATE_PLACEHOLDER":
        return { ...faq, answer: certificateFallback };
      case "RECORDING_PLACEHOLDER":
        return { ...faq, answer: recordingFallback };
      case "QNA_PLACEHOLDER":
        return { ...faq, answer: qnaFallback };
      default:
        return faq;
    }
  });
}

/** Fast facts with display-ready values, substituting confirmed config data
 * where the source config still holds a null placeholder. */
export function resolveFastFacts(): FastFact[] {
  return masterclass.fastFacts.map((fact) => {
    if (fact.id === "format") {
      return { ...fact, value: isConfirmed(masterclass.format) ? masterclass.format : null };
    }
    if (fact.id === "fee") {
      return { ...fact, value: masterclass.fee !== null ? `₹${masterclass.fee.toLocaleString("en-IN")}` : null };
    }
    if (fact.id === "certificate") {
      return {
        ...fact,
        value: masterclass.certificateAvailable ? "Certificate of Participation" : null,
        visible: masterclass.certificateAvailable === true,
      };
    }
    if (fact.id === "recording") {
      return {
        ...fact,
        value: masterclass.recordingAvailable ? "Available to Registered Participants" : null,
        visible: masterclass.recordingAvailable === true,
      };
    }
    return fact;
  });
}

/** Swaps the closing agenda item's title to include Q&A once confirmed. */
export function resolveAgenda(): AgendaItem[] {
  return masterclass.agenda.map((item, index) => {
    if (index === masterclass.agenda.length - 1 && masterclass.qnaAvailable) {
      return { ...item, title: "Key Takeaways and Q&A" };
    }
    return item;
  });
}
