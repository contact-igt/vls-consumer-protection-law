import { Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function Takeaways() {
  return (
    <section id="takeaways" className="bg-brand-black py-16 sm:py-24 text-white">
      <Container>
        {/* Section Header with Brand Colors */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-red-400">
            Outcomes
          </span>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            What You&rsquo;ll Take Away
          </h2>
          <p className="mt-4 text-base text-brand-gray-400 sm:text-lg">
            Practical skills, frameworks and actionable takeaways you will gain from this masterclass.
          </p>
        </div>

        {/* Takeaway Cards with Brand Theme Colors */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masterclass.takeaways.map((takeaway, index) => (
            <FadeIn key={takeaway} delay={index * 60}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-brand-charcoal bg-brand-ink p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red-600 hover:shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red-900/40 text-brand-red-400 transition-colors group-hover:bg-brand-red-600 group-hover:text-white">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed sm:text-base">
                  {takeaway}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {masterclass.resourcesEnabled && masterclass.resources.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-red-600/40 bg-brand-ink p-6">
            <h3 className="text-base font-bold text-white">Included Resources</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {masterclass.resources.map((resource) => (
                <li key={resource} className="flex items-center gap-2 text-sm text-brand-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red-400" />
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-8 text-center text-xs italic text-brand-gray-400">
          Resources are subject to final masterclass confirmation.
        </p>
      </Container>
    </section>
  );
}


