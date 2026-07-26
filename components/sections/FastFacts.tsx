import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { resolveFastFacts } from "@/lib/content";

export function FastFacts() {
  const facts = resolveFastFacts().filter((fact) => fact.visible);

  return (
    <section className="border-y border-brand-gray-200 bg-white py-12 sm:py-16" aria-label="Masterclass fast facts">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.id} className="border-l-2 border-brand-red-600 pl-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-gray-500">{fact.label}</dt>
                <dd className="mt-1 text-base font-bold text-brand-black sm:text-lg">
                  {fact.value ?? "To Be Confirmed"}
                </dd>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
