import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { FadeIn } from "@/components/ui/FadeIn";
import { BrandImage } from "@/components/ui/BrandImage";
import { masterclass } from "@/data/masterclass";
import { VLS_ASSETS } from "@/lib/assets";

export function Audience() {
  return (
    <section id="audience" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Who Can Join"
          title="Who Can Attend?"
          description="Suitable for participants seeking a focused and practical introduction to consumer litigation and Consumer Commission procedures."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
          <FadeIn>
            <BrandImage
              src={VLS_ASSETS.academyInterior}
              alt="VLS Law Academy interior where masterclasses are conducted"
              aspect="portrait"
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="shadow-card-hover"
            />
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {masterclass.audience.map((category, index) => (
              <FadeIn key={category.id} delay={index * 40}>
                <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-brand-gray-200 bg-white p-5 text-center transition-shadow hover:shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red-50">
                    <Icon name={category.icon} className="h-5 w-5 text-brand-red-600" />
                  </span>
                  <p className="text-sm font-semibold text-brand-black">{category.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
