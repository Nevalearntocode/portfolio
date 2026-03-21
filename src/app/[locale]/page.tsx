import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WorksSection } from "@/components/WorksSection";
import { CurrentlyBuildingSection } from "@/components/CurrentlyBuildingSection";
import { DotGrid } from "@/components/DotGrid";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { CtaSection } from "@/components/CtaSection";
import { WindingLine } from "@/components/WindingLine";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#111]">
        <WindingLine />
        <HeroSection />
        <SkillsSection />
        <WorksSection />
        <CurrentlyBuildingSection />
        <DotGrid />
        <ProcessSection />
        <PricingSection />
        <CtaSection />
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
}
