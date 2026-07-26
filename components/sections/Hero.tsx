import { CalendarDays, Clock, Timer, MonitorSmartphone, Languages, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { masterclass } from "@/data/masterclass";
import { isConfirmed } from "@/lib/utils";

const HERO_POINTS = [
  "Consumer Protection Law essentials",
  "Complaint assessment and drafting",
  "Consumer Commission procedures",
  "Appeals and execution overview",
];

function detail(value: string | null, fallback = "To Be Confirmed") {
  return isConfirmed(value) ? (value as string) : fallback;
}

export function Hero() {
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
    { icon: MonitorSmartphone, label: "Format", value: detail(isConfirmed(masterclass.format) ? masterclass.format : null) },
    { icon: Languages, label: "Language", value: masterclass.language },
  ];

  return (
    <section id="overview" className="relative overflow-hidden bg-brand-gray-50 py-14 sm:py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red-600">VLS Law Academy Presents</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-black sm:text-5xl lg:text-[3.25rem]">
            Consumer Protection Law Masterclass
          </h1>

          <div className="mt-5">
            <Badge variant="red">{masterclass.duration} Intensive Masterclass</Badge>
          </div>

          <p className="mt-5 text-xl font-semibold text-brand-black sm:text-2xl">{masterclass.subtitle}</p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-gray-600 sm:text-lg">
            {masterclass.description}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-brand-black sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-600" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-brand-gray-200 bg-white p-5 sm:grid-cols-3 sm:p-6">
            {details.map(({ icon: DetailIcon, label, value }) => (
              <div key={label}>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray-500">
                  <DetailIcon className="h-3.5 w-3.5 text-brand-red-600" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-bold text-brand-black sm:text-base">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedButton href="#register" size="lg" event="hero_register_click" eventPayload={{ source: "hero_primary_cta" }}>
              Register for the Masterclass
            </TrackedButton>
            <Button href="#curriculum" size="lg" variant="outline">
              View What You&rsquo;ll Learn
            </Button>
          </div>
        </div>

        <div id="register" className="scroll-mt-24 lg:sticky lg:top-24">
          <RegistrationForm />
        </div>
      </Container>
    </section>
  );
}
