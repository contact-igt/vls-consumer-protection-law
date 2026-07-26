"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, type AccordionEntry } from "@/components/ui/Accordion";
import { BrandImage } from "@/components/ui/BrandImage";
import { masterclass } from "@/data/masterclass";
import { trackEvent } from "@/lib/analytics";
import { VLS_ASSETS } from "@/lib/assets";

export function Curriculum() {
  const items: AccordionEntry[] = masterclass.curriculum.map((topic) => ({
    id: topic.id,
    title: (
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red-600 text-sm font-bold text-white">
          {topic.number}
        </span>
        {topic.title}
      </span>
    ),
    content: (
      <ul className="grid gap-2 sm:grid-cols-2">
        {topic.points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <section id="curriculum" className="scroll-mt-20 bg-brand-gray-50 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Curriculum" title={`What You'll Learn in ${masterclass.duration}`} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
          <BrandImage
            src={VLS_ASSETS.classroomLearning}
            alt="Consumer Protection Law classroom teaching session at VLS Law Academy"
            aspect="portrait"
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="shadow-card-hover lg:sticky lg:top-24"
          />

          <div>
            <Accordion
              items={items}
              defaultOpenId={items[0]?.id}
              onToggle={(id, isOpen) => {
                if (isOpen) trackEvent("curriculum_open", { topic: id });
              }}
            />
            <p className="mt-6 text-sm italic text-brand-gray-500">
              The exact topics may be adjusted by the faculty based on recent legal developments and the learning
              needs of participants.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
