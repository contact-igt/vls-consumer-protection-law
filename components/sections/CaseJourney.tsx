import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function CaseJourney() {
  const row1 = masterclass.caseJourney.slice(0, 5); // Steps 1..5
  const row2 = masterclass.caseJourney.slice(5, 10).reverse(); // Steps 10, 9, 8, 7, 6

  return (
    <section id="case-journey" className="py-16 sm:py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="The Bigger Picture"
          title="Understand the Consumer Case Journey"
          description="A complete 10-step overview of how consumer disputes move from initial grievance to final execution."
        />

        {/* Desktop: Serpentine 2-row connected timeline */}
        <div className="relative mt-16 hidden lg:block max-w-5xl mx-auto">
          {/* Top Row (Steps 1 to 5) */}
          <div className="relative z-10 grid grid-cols-5 gap-x-4">
            {/* Top Horizontal Line */}
            <div
              className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-brand-red-200 z-0"
              aria-hidden="true"
            />
            {/* Right Vertical Connector Line from Step 5 (Top Right) to Step 6 (Bottom Right) */}
            <div
              className="absolute right-[9.5%] top-5 h-[calc(100%+4rem)] w-0.5 bg-brand-red-200 z-0"
              aria-hidden="true"
            />
            {row1.map((step, index) => (
              <FadeIn key={step.id} delay={index * 60}>
                <JourneyNode step={step.step} label={step.label} />
              </FadeIn>
            ))}
          </div>

          {/* Bottom Row (Steps 6 to 10 - Step 6 positioned on right below Step 5) */}
          <div className="relative z-10 mt-16 grid grid-cols-5 gap-x-4">
            {/* Bottom Horizontal Line */}
            <div
              className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-brand-red-200 z-0"
              aria-hidden="true"
            />
            {row2.map((step, index) => (
              <FadeIn key={step.id} delay={(index + 5) * 60}>
                <JourneyNode step={step.step} label={step.label} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet: Vertical connected timeline (1 to 10 in order) */}
        <div className="mt-14 space-y-0 lg:hidden max-w-lg mx-auto">
          {masterclass.caseJourney.map((step, index) => (
            <FadeIn key={step.id} delay={index * 40}>
              <div className="relative flex items-center gap-5 pb-10 last:pb-0">
                {index < masterclass.caseJourney.length - 1 && (
                  <span
                    className="absolute left-5 top-10 bottom-0 w-0.5 bg-brand-red-200"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red-600 text-sm font-bold text-white shadow-sm ring-4 ring-white">
                  {step.step}
                </span>
                <div className="rounded-xl border border-brand-gray-200 bg-white px-5 py-3.5 shadow-sm flex-1">
                  <p className="text-base font-bold text-brand-black">{step.label}</p>
                </div>
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
    <div className="relative z-10 flex flex-col items-center text-center">
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red-600 text-sm font-bold text-white ring-4 ring-white shadow-sm">
        {step}
      </span>
      <p className="mt-3 max-w-[9.5rem] text-sm font-semibold text-brand-black leading-snug">
        {label}
      </p>
    </div>
  );
}

