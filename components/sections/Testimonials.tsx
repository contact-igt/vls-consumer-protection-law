"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, MessageSquareText, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandImage } from "@/components/ui/BrandImage";
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
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-brand-gray-50 p-10 text-center">
            <MessageSquareText className="mx-auto h-8 w-8 text-brand-gray-400" aria-hidden="true" />
            <p className="mt-4 text-sm text-brand-gray-600">
              Verified testimonials from VLS Law Academy learners will appear here once approved. No testimonial
              content is generated or implied until real feedback is supplied.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const active = testimonials[activeIndex];
  const isVisualOnly = !active.quote;

  function goTo(index: number) {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  return (
    <section className="py-16 sm:py-24" aria-roledescription="carousel" aria-label="Learner testimonials">
      <Container>
        <SectionHeading eyebrow="Learner Feedback" title="What Our Learners Say" />

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border border-brand-gray-200 bg-white p-8 text-center shadow-card sm:p-10" aria-live="polite">
            {/* key={active.id} remounts this on every carousel change, which
                re-triggers the fade-up keyframe as a lightweight crossfade —
                no extra library, no manual enter/exit state to manage. */}
            <div key={active.id} className="animate-fade-up">
              {active.photo && (
                <div className="relative mx-auto mb-5 h-20 w-20">
                  <BrandImage
                    src={active.photo}
                    alt={active.name}
                    aspect="square"
                    rounded="full"
                    sizes="80px"
                    className="shadow-card"
                  />
                  {active.videoUrl && (
                    <a
                      href={active.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${active.name}'s video testimonial`}
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100"
                    >
                      <PlayCircle className="h-8 w-8 text-white" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}

              {isVisualOnly ? (
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
                  {active.videoUrl ? "Video Testimonial" : "Learner Testimonial"}
                </p>
              ) : (
                <>
                  <Quote className="mx-auto h-8 w-8 text-brand-red-200" aria-hidden="true" />
                  <p className="mt-4 text-base leading-relaxed text-brand-black sm:text-lg">&ldquo;{active.quote}&rdquo;</p>
                </>
              )}

              <div className="mt-4">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gray-300 text-brand-black transition-colors hover:bg-brand-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex">
                {testimonials.map((t, index) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={index === activeIndex}
                    className="flex h-11 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500"
                  >
                    {/* Visual dot stays small; the button's own box is the real 44px tap target. */}
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        index === activeIndex ? "bg-brand-red-600" : "bg-brand-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gray-300 text-brand-black transition-colors hover:bg-brand-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-500"
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
