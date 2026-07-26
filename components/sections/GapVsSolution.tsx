import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { masterclass } from "@/data/masterclass";

export function GapVsSolution() {
  return (
    <section className="bg-brand-gray-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Practical Reality"
          title="You Know the Law. But Can You Apply It?"
          description="Many law students and young advocates understand the provisions but remain unsure about converting a consumer grievance into a properly structured legal proceeding."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-2xl border border-brand-gray-200 bg-white p-7 sm:p-8">
              <h3 className="text-xl font-bold text-brand-black">The Practical Gap</h3>
              <ul className="mt-5 space-y-3.5">
                {masterclass.gapVsSolution.gap.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-brand-gray-700 sm:text-base">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-brand-gray-400" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="h-full rounded-2xl border-2 border-brand-red-600 bg-white p-7 sm:p-8">
              <h3 className="text-xl font-bold text-brand-black">What This {masterclass.duration} Masterclass Covers</h3>
              <ul className="mt-5 space-y-3.5">
                {masterclass.gapVsSolution.solution.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-brand-gray-700 sm:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 text-center">
          <TrackedButton href="#register" size="lg" event="hero_register_click" eventPayload={{ source: "gap_vs_solution_cta" }}>
            Gain Practical Clarity
          </TrackedButton>
        </div>
      </Container>
    </section>
  );
}
