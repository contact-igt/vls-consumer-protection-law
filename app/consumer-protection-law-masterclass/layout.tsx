import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyCta } from "@/components/sections/MobileStickyCta";
import { WhatsappButton } from "@/components/sections/WhatsappButton";
import { PageViewTracker } from "@/components/ui/PageViewTracker";

export default function MasterclassLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <Footer />
      <MobileStickyCta />
      <WhatsappButton />
    </>
  );
}
