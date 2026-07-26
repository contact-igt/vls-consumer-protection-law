import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function LearningOutcomes() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Learning Outcomes" title="By the End of the Masterclass, You Should Be Able To" />

        <div className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-4 sm:grid-cols-2">
          {masterclass.learningOutcomes.map((outcome, index) => (
            <FadeIn key={outcome} delay={index * 40}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-600" aria-hidden="true" />
                <p className="text-sm text-brand-black sm:text-base">{outcome}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
