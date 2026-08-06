import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { BrandImage } from "@/components/ui/BrandImage";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { masterclass } from "@/data/masterclass";
import { toDurationAdjective } from "@/lib/utils";
import { getMasterclassDetails } from "@/lib/content";
import { VLS_ASSETS } from "@/lib/assets";
import { getSectionCtaText } from "@/lib/masterclassStatus";

const HERO_POINTS = [
  "Consumer Protection Law essentials",
  "Complaint assessment and drafting",
  "Consumer Commission procedures",
  "Appeals and execution overview",
];

// Staggered first-paint cascade for the hero's own content — a one-time,
// above-the-fold "first impression" moment (occasional/rare frequency, so a
// longer, more generous animation is appropriate per motion-duration budgets).
// Pure CSS (the existing animate-fade-up keyframe + per-element delay), no
// JS/IntersectionObserver needed since this content is visible on load.
// animate-fade-up's "both" fill mode already holds each element at its
// from-state until its delay elapses, so the cascade reveals in order.
const ENTER = "animate-fade-up";

export function Hero() {
  const details = getMasterclassDetails();

  return (
    <section id="overview" className="relative isolate overflow-hidden bg-brand-black">
      {/* Full-bleed legal photograph, subject weighted right, per the VLS reference hero composition. */}
      <BrandImage
        src={VLS_ASSETS.heroLegal}
        alt="VLS Law Academy — Consumer Protection Law"
        fullBleed
        rounded="none"
        priority
        sizes="100vw"
        objectPosition="right center"
        className="z-0"
      />
      {/* Left-to-right dark gradient keeps hero text readable without hiding the photograph's right-hand subject. */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/40 sm:via-brand-black/85 sm:to-brand-black/25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-black/70 via-transparent to-transparent sm:hidden" aria-hidden="true" />

      <Container className="relative z-10 grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:py-28">
        <div>
          <p className={`${ENTER} text-xs font-bold uppercase tracking-[0.25em] text-brand-red-400`}>
            VLS Law Academy Presents
          </p>
          <h1
            className={`${ENTER} mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]`}
            style={{ animationDelay: "60ms" }}
          >
            Consumer Protection Law Masterclass
          </h1>

          <div className={`${ENTER} mt-5`} style={{ animationDelay: "120ms" }}>
            <Badge variant="red">{toDurationAdjective(masterclass.duration)} Intensive Masterclass</Badge>
          </div>

          <p className={`${ENTER} mt-5 text-xl font-semibold text-white sm:text-2xl`} style={{ animationDelay: "160ms" }}>
            {masterclass.subtitle}
          </p>

          <p
            className={`${ENTER} mt-4 max-w-xl text-base leading-relaxed text-brand-gray-200 sm:text-lg`}
            style={{ animationDelay: "200ms" }}
          >
            {masterclass.description}
          </p>

          <ul className={`${ENTER} mt-6 grid gap-3 sm:grid-cols-2`} style={{ animationDelay: "240ms" }}>
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-white sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-400" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <dl
            className={`${ENTER} mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white p-5 shadow-card-hover sm:grid-cols-3 sm:p-6`}
            style={{ animationDelay: "280ms" }}
          >
            {details.map(({ icon: DetailIcon, label, value }) => (
              <div key={label}>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray-500">
                  <DetailIcon className="h-3.5 w-3.5 text-brand-red-600" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-bold text-brand-black sm:text-base">{value}</dd>
              </div>
            ))}
          </dl>

          <div className={`${ENTER} mt-8 flex flex-col gap-3 sm:flex-row`} style={{ animationDelay: "320ms" }}>
            <TrackedButton href="#register" size="lg" event="hero_register_click" eventPayload={{ source: "hero_primary_cta" }}>
              {getSectionCtaText(masterclass, "Register for the Masterclass")}
            </TrackedButton>
            <Button href="#curriculum" size="lg" variant="outlineLight">
              View What You&rsquo;ll Learn
            </Button>
          </div>
        </div>

        <div id="register" className="scroll-mt-24 lg:sticky lg:top-24">
          <RegistrationForm />
        </div>
      </Container>
    </section>
  );
}
