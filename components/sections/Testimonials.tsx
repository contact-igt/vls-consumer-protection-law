"use client";

import { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { masterclass } from "@/data/masterclass";
import { trackEvent } from "@/lib/analytics";

export function Testimonials() {
  const { testimonials } = masterclass;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="bg-brand-gray-50 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Student Feedback" title="Our Student Testimonials" />
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
            <MessageSquareText className="mx-auto h-8 w-8 text-brand-gray-400" aria-hidden="true" />
            <p className="mt-4 text-sm text-brand-gray-600">
              Verified testimonials from VLS Law Academy learners will appear here once approved.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const openModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    trackEvent("page_view", { section: "testimonial_video_play" });
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-brand-gray-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Student Feedback"
          title="Our Student Testimonials"
          description="Hear directly from law students and advocates who have experienced VLS Law Academy masterclasses."
        />

        {/* Video Testimonials Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-black shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover min-h-[460px] sm:min-h-[500px]"
            >
              {/* Thumbnail Image */}
              {item.photo && (
                <img
                  src={item.photo}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 transition-opacity group-hover:from-black/90"
                aria-hidden="true"
              />

              {/* Play Button Overlay */}
              {item.videoUrl && (
                <button
                  type="button"
                  onClick={() => openModal(item.videoUrl!)}
                  aria-label={`Watch ${item.name}'s testimonial video`}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-red-600 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-red-600 group-hover:text-white sm:h-20 sm:w-20">
                    <Play className="h-7 w-7 fill-current ml-1 sm:h-9 sm:w-9" aria-hidden="true" />
                  </span>
                </button>
              )}

              {/* Student Info & Quote */}
              <div className="relative z-20 p-6 sm:p-8 text-left text-white">
                {item.quote && (
                  <p className="line-clamp-3 text-sm leading-relaxed text-brand-gray-200 italic mb-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                )}
                <h4 className="text-lg font-bold text-white">{item.name}</h4>
                <p className="text-xs font-medium text-brand-red-400 mt-0.5">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enroll CTA */}
        <div className="mt-12 flex justify-center">
          <TrackedButton
            href="#register"
            size="lg"
            event="final_cta_click"
            eventPayload={{ source: "testimonials_section" }}
          >
            Enroll Now ₹{masterclass.fee ?? 499}
          </TrackedButton>
        </div>
      </Container>

      {/* Video Popup Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Student Video Testimonial"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-brand-black shadow-2xl border border-white/10">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close video"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-brand-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="aspect-video w-full">
              <video
                controls
                autoPlay
                className="h-full w-full object-contain"
                src={selectedVideo}
              >
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

