import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function CaseJourney() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="The Bigger Picture" title="Understand the Consumer Case Journey" />

        {/* Desktop: horizontal connected timeline */}
        <div className="mt-14 hidden lg:block">
          <div className="relative grid grid-cols-5 gap-x-4">
            <div className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-brand-red-200" aria-hidden="true" />
            {masterclass.caseJourney.slice(0, 5).map((step, index) => (
              <FadeIn key={step.id} delay={index * 60}>
                <JourneyNode step={step.step} label={step.label} />
              </FadeIn>
            ))}
          </div>
          <div className="relative mt-10 grid grid-cols-5 gap-x-4">
            <div className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-brand-red-200" aria-hidden="true" />
            {masterclass.caseJourney.slice(5, 10).map((step, index) => (
              <FadeIn key={step.id} delay={index * 60}>
                <JourneyNode step={step.step} label={step.label} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="mt-10 space-y-0 lg:hidden">
          {masterclass.caseJourney.map((step, index) => (
            <FadeIn key={step.id} delay={index * 40}>
              <div className="relative flex gap-4 pb-8 last:pb-0">
                {index < masterclass.caseJourney.length - 1 && (
                  <span className="absolute left-5 top-11 h-full w-0.5 bg-brand-red-200" aria-hidden="true" />
                )}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red-600 text-sm font-bold text-white">
                  {step.step}
                </span>
                <p className="pt-2 text-base font-semibold text-brand-black">{step.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function JourneyNode({ step, label }: { step: number; label: string }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red-600 text-sm font-bold text-white ring-4 ring-brand-gray-50">
        {step}
      </span>
      <p className="mt-3 max-w-[9rem] text-sm font-semibold text-brand-black">{label}</p>
    </div>
  );
}
