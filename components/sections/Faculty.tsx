import Image from "next/image";
import { UserRound, GraduationCap, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { masterclass } from "@/data/masterclass";

export function Faculty() {
  return (
    <section id="faculty" className="scroll-mt-20 bg-brand-gray-50 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Faculty" title="Learn From an Experienced Legal Practitioner" />

        <div className="mx-auto mt-12 max-w-3xl">
          {masterclass.faculty ? (
            <FacultyCard faculty={masterclass.faculty} />
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-brand-gray-300 bg-white p-10 text-center sm:p-14">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gray-100">
                <UserRound className="h-10 w-10 text-brand-gray-400" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-brand-black">Faculty Details Will Be Announced</h3>
              <p className="mt-2 max-w-md text-sm text-brand-gray-600">
                The faculty for this Consumer Protection Law Masterclass will be confirmed shortly. Please check
                back or contact VLS Law Academy for the latest update.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function FacultyCard({ faculty }: { faculty: NonNullable<typeof masterclass.faculty> }) {
  return (
    <div className="grid gap-8 rounded-2xl border border-brand-gray-200 bg-white p-7 sm:p-10 md:grid-cols-[auto_1fr] md:items-start">
      <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-brand-red-50 md:mx-0">
        <Image src={faculty.photo} alt={`Photograph of ${faculty.name}`} fill sizes="144px" className="object-cover" />
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-brand-black">{faculty.name}</h3>
        <p className="mt-1 text-sm font-semibold text-brand-red-600">{faculty.designation}</p>

        <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
          {faculty.qualifications.map((qualification) => (
            <span
              key={qualification}
              className="inline-flex items-center gap-1 rounded-full bg-brand-gray-100 px-3 py-1 text-xs font-semibold text-brand-gray-700"
            >
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              {qualification}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-brand-gray-600 sm:text-base">{faculty.biography}</p>

        {faculty.areasOfPractice.length > 0 && (
          <p className="mt-3 text-sm text-brand-gray-600">
            <span className="font-semibold text-brand-black">Areas of Practice: </span>
            {faculty.areasOfPractice.join(", ")}
          </p>
        )}

        {faculty.experienceSummary && (
          <p className="mt-2 text-sm text-brand-gray-600">
            <span className="font-semibold text-brand-black">Experience: </span>
            {faculty.experienceSummary}
          </p>
        )}

        {faculty.profileUrl && (
          <a
            href={faculty.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red-600 underline-offset-2 hover:underline"
          >
            View Professional Profile
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
