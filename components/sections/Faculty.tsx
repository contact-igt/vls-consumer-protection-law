import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const FACULTY_POINTS = [
  "Practicing Advocate with 25+ years experience",
  "Former Vice Chancellor — Tamil Nadu Dr. Ambedkar Law University",
  "Trained 250+ Judicial Service Officers",
  "Mentored 1,200+ legal professionals",
  "Faculty for Decoding of Law Practice",
];

export function Faculty() {
  return (
    <section id="faculty" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <Container>
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
            Your <span className="text-brand-red-600">Faculty</span>
          </h2>
        </div>

        {/* Faculty Content Card */}
        <div className="mt-12 max-w-6xl mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-brand-gray-200/80 bg-[#f9f5f5] shadow-sm">
              <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-8">
                {/* Left Side: Faculty Details & Points */}
                <div className="p-8 sm:p-12 lg:p-14 lg:col-span-7 text-left">
                  <h3 className="text-3xl font-extrabold text-brand-black sm:text-4xl lg:text-5xl">
                    Dr. Sivakumar
                  </h3>

                  <p className="mt-3 text-base font-bold text-brand-black sm:text-lg">
                    PhD in Law &middot; Academic Head, VLS Law Academy
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm text-brand-gray-800 sm:text-base font-medium">
                    {FACULTY_POINTS.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-black" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-l-2 border-brand-red-600/40 pl-4">
                    <p className="text-sm italic leading-relaxed text-brand-gray-700 sm:text-base">
                      &ldquo;Most advocates are never shown how litigation practice actually works in the real world. This session is designed to give that clarity.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right Side: Dr. Sivakumar Image with Backdrop Touching Bottom */}
                <div className="lg:col-span-5 flex justify-center items-end self-end px-6 lg:px-0">
                  <div className="relative w-full max-w-[380px] lg:max-w-[440px]">
                    <img
                      src="/assets/owner/mr-siva-kumar-backdrop.svg"
                      alt="Dr. Sivakumar - Academic Head, VLS Law Academy"
                      className="w-full h-auto object-contain object-bottom block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

