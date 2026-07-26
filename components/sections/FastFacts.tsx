import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { BrandImage } from "@/components/ui/BrandImage";
import { resolveFastFacts } from "@/lib/content";
import { VLS_ASSETS } from "@/lib/assets";

export function FastFacts() {
  const facts = resolveFastFacts().filter((fact) => fact.visible);

  return (
    <section className="border-y border-brand-gray-200 bg-vls-off-white py-14 sm:py-20" aria-label="Masterclass fast facts">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <FadeIn>
            <BrandImage
              src={VLS_ASSETS.classroomFaculty}
              alt="VLS Law Academy faculty guiding students in a classroom session"
              aspect="portrait"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="shadow-card-hover"
            />
          </FadeIn>

          <FadeIn delay={80}>
            <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red-600">At a Glance</p>
              <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.id} className="border-l-2 border-brand-red-600 pl-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-brand-gray-500">{fact.label}</dt>
                    <dd className="mt-1 text-base font-bold text-brand-black sm:text-lg">
                      {fact.value ?? "To Be Confirmed"}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
