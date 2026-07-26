"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, type AccordionEntry } from "@/components/ui/Accordion";
import { resolveFaqs } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export function Faq() {
  const faqs = resolveFaqs();
  const items: AccordionEntry[] = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section id="faq" className="scroll-mt-20 bg-brand-gray-50 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion
            items={items}
            onToggle={(id, isOpen) => {
              if (isOpen) trackEvent("faq_open", { question: id });
            }}
          />
        </div>
      </Container>
    </section>
  );
}
