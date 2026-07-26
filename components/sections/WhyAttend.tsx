import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { FadeIn } from "@/components/ui/FadeIn";
import { masterclass } from "@/data/masterclass";

export function WhyAttend() {
  return (
    <section id="why-attend" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why This Masterclass"
          title="Why Attend This Consumer Protection Law Masterclass?"
          description="Knowing the Consumer Protection Act is only the beginning. Effective consumer practice requires the ability to identify the right remedy, assess maintainability, determine jurisdiction, organise supporting documents and understand the procedure before the appropriate Consumer Commission."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {masterclass.whyAttend.map((item, index) => (
            <FadeIn key={item.id} delay={index * 80}>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red-50">
                  <Icon name={item.icon} className="h-6 w-6 text-brand-red-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-600">{item.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
