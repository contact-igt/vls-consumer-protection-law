import { CalendarDays, Clock, Timer, MonitorSmartphone, Languages, IndianRupee } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { Countdown } from "@/components/ui/Countdown";
import { masterclass } from "@/data/masterclass";
import { isConfirmed } from "@/lib/utils";
import { getWhatsappUrl } from "@/lib/whatsapp";

export function FinalCta() {
  const details = [
    { icon: CalendarDays, label: "Date", value: masterclass.displayDate },
    {
      icon: Clock,
      label: "Time",
      value:
        isConfirmed(masterclass.startTime) && isConfirmed(masterclass.endTime)
          ? `${masterclass.startTime} – ${masterclass.endTime} ${masterclass.timeZone}`
          : "To Be Confirmed",
    },
    { icon: Timer, label: "Duration", value: masterclass.duration },
    { icon: MonitorSmartphone, label: "Format", value: isConfirmed(masterclass.format) ? masterclass.format : "To Be Confirmed" },
    { icon: Languages, label: "Language", value: masterclass.language },
    {
      icon: IndianRupee,
      label: "Fee",
      value: masterclass.fee !== null ? `₹${masterclass.fee.toLocaleString("en-IN")}` : "To Be Confirmed",
    },
  ];

  return (
    <section className="bg-brand-black py-16 text-white sm:py-24">
      <Container className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red-400">VLS Law Academy</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Master Consumer Litigation Essentials in {masterclass.duration}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-brand-gray-300 sm:text-lg">
          Join the focused Consumer Protection Law Masterclass and gain practical clarity on complaint assessment,
          drafting, Consumer Commission procedures, appeals and execution.
        </p>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
          {details.map(({ icon: DetailIcon, label, value }) => (
            <div key={label}>
              <dt className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray-400">
                <DetailIcon className="h-3.5 w-3.5 text-brand-red-400" aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-1 text-base font-bold text-white">{value}</dd>
            </div>
          ))}
        </dl>

        {isConfirmed(masterclass.registrationDeadline ?? undefined) && (
          <div className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-gray-400">
              Registration Closes In
            </p>
            <Countdown deadline={masterclass.registrationDeadline as string} />
          </div>
        )}

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedButton href="#register" size="lg" event="final_cta_click" eventPayload={{ cta: "register" }}>
            Register for the Masterclass
          </TrackedButton>
          <TrackedButton
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-brand-black"
            event="whatsapp_click"
            eventPayload={{ source: "final_cta" }}
          >
            Ask on WhatsApp
          </TrackedButton>
        </div>
      </Container>
    </section>
  );
}
