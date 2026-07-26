import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { resolveAgenda } from "@/lib/content";
import { masterclass } from "@/data/masterclass";

export function SessionFlow() {
  const agenda = resolveAgenda();

  return (
    <section id="session-flow" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Session Flow" title={`Your ${masterclass.duration} Masterclass Flow`} />

        <div className="mx-auto mt-12 max-w-3xl">
          {agenda.map((item, index) => (
            <FadeIn key={item.id} delay={index * 50}>
              <div className="relative flex gap-5 pb-9 last:pb-0">
                {index < agenda.length - 1 && (
                  <span className="absolute left-[3.25rem] top-12 h-full w-0.5 bg-brand-gray-200" aria-hidden="true" />
                )}
                <span className="flex h-[2.75rem] w-[6.5rem] shrink-0 items-center justify-center rounded-lg bg-brand-black text-center text-xs font-bold leading-tight text-white sm:text-sm">
                  {item.timeRange}
                </span>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-brand-black sm:text-lg">{item.title}</h3>
                  {item.points.length > 0 && (
                    <ul className="mt-2 space-y-1.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-brand-gray-600">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-red-600" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
