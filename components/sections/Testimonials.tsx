"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, MessageSquareText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { masterclass } from "@/data/masterclass";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { testimonials } = masterclass;
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Learner Feedback" title="What Our Learners Say" />
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-brand-gray-300 bg-brand-gray-50 p-10 text-center">
            <MessageSquareText className="mx-auto h-8 w-8 text-brand-gray-400" aria-hidden="true" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-gray-500">
              Content Placeholder
            </p>
            <p className="mt-2 text-sm text-brand-gray-600">
              Verified testimonials from VLS Law Academy learners will be added here once approved. No testimonial
              content is generated or implied until real feedback is supplied.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const active = testimonials[activeIndex];

  function goTo(index: number) {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  return (
    <section className="py-16 sm:py-24" aria-roledescription="carousel" aria-label="Learner testimonials">
      <Container>
        <SectionHeading eyebrow="Learner Feedback" title="What Our Learners Say" />

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border border-brand-gray-200 bg-white p-8 text-center shadow-card sm:p-10" aria-live="polite">
            <Quote className="mx-auto h-8 w-8 text-brand-red-200" aria-hidden="true" />
            <p className="mt-4 text-base leading-relaxed text-brand-black sm:text-lg">&ldquo;{active.quote}&rdquo;</p>

            <div className="mt-6 flex items-center justify-center gap-3">
              {active.photo && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={active.photo} alt={active.name} fill sizes="48px" className="object-cover" />
                </div>
              )}
              <div className="text-left">
                <p className="text-sm font-bold text-brand-black">{active.name}</p>
                <p className="text-xs text-brand-gray-500">{active.role}</p>
              </div>
            </div>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gray-300 text-brand-black transition-colors hover:bg-brand-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((t, index) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={index === activeIndex}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-colors",
                      index === activeIndex ? "bg-brand-red-600" : "bg-brand-gray-300"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gray-300 text-brand-black transition-colors hover:bg-brand-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
