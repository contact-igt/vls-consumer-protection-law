import { Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function Takeaways() {
  return (
    <section className="bg-brand-gray-50 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Outcomes" title="What You'll Take Away" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masterclass.takeaways.map((takeaway, index) => (
            <FadeIn key={takeaway} delay={index * 60}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-brand-gray-200 bg-white p-5">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-600" aria-hidden="true" />
                <p className="text-sm font-medium text-brand-black sm:text-base">{takeaway}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {masterclass.resourcesEnabled && masterclass.resources.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-brand-red-200 bg-brand-red-50 p-6">
            <h3 className="text-base font-bold text-brand-black">Included Resources</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {masterclass.resources.map((resource) => (
                <li key={resource} className="text-sm text-brand-gray-700">
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-center text-sm italic text-brand-gray-500">
          Resources are subject to final masterclass confirmation.
        </p>
      </Container>
    </section>
  );
}
