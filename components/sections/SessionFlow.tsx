import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { resolveAgenda } from "@/lib/content";
import { masterclass } from "@/data/masterclass";
import { toDurationAdjective } from "@/lib/utils";

export function SessionFlow() {
  const agenda = resolveAgenda();

  return (
    <section id="session-flow" className="scroll-mt-20 py-16 sm:py-24 bg-brand-gray-50/50">
      <Container>
        <SectionHeading
          eyebrow="Session Flow"
          title={`Your ${toDurationAdjective(masterclass.duration)} Masterclass Flow`}
          description="A structured, step-by-step breakdown of what will be covered during the live masterclass session."
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Central Vertical Connector Line (Desktop) & Left Line (Mobile) */}
          <div
            className="absolute left-4 top-6 bottom-6 w-0.5 bg-brand-red-200 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-12">
            {agenda.map((item, index) => {
              // Step 1 (index 0) starts on the RIGHT side, Step 2 on LEFT, etc.
              const isRightSide = index % 2 === 0;

              return (
                <FadeIn key={item.id} delay={index * 50}>
                  <div className="relative flex flex-col md:flex-row md:items-center">
                    {/* Step Badge Node */}
                    <div className="absolute left-0 top-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-red-600 text-sm font-bold text-white shadow-md ring-4 ring-white md:left-1/2 md:-translate-x-1/2 sm:h-10 sm:w-10">
                      {index + 1}
                    </div>

                    {/* Content Box */}
                    <div
                      className={`pl-12 md:pl-0 md:w-1/2 ${
                        isRightSide
                          ? "md:ml-auto md:pl-12"
                          : "md:mr-auto md:pr-12"
                      }`}
                    >
                      <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-card hover:border-brand-red-200 text-left">
                        <h3 className="text-lg font-bold text-brand-black sm:text-xl">
                          {item.title}
                        </h3>

                        {item.points.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {item.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2.5 text-sm text-brand-gray-700 sm:text-base text-left"
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600"
                                  aria-hidden="true"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}


