import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function WhyVls() {
  return (
    <section className="bg-brand-black py-16 text-white sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-red-400">
              About VLS Law Academy
            </span>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Why Learn With VLS Law Academy?
            </h2>

            <ul className="mt-8 space-y-5">
              {masterclass.whyVls.map((point) => (
                <li key={point.id} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-400" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{point.title}</p>
                    <p className="mt-1 text-sm text-brand-gray-300">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <FadeIn className="grid grid-cols-2 gap-4">
            <PlaceholderImage label="VLS Academy Training Session" aspect="portrait" className="col-span-2 border-white/20 bg-white/5 sm:col-span-1" />
            <PlaceholderImage label="VLS Classroom" aspect="square" className="border-white/20 bg-white/5" />
            <PlaceholderImage label="VLS Students" aspect="square" className="border-white/20 bg-white/5" />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
