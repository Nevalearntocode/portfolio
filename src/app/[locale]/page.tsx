import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WorksSection } from "@/components/WorksSection";
import { BrandingWall } from "@/components/BrandingWall";
import { CurrentlyBuildingSection } from "@/components/CurrentlyBuildingSection";
import { ApproachSection } from "@/components/ApproachSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
      <main className="relative min-h-screen bg-[#0e0e0e] max-w-8xl mx-auto">
        {/* <WindingLine /> */}
        <HeroSection />
        <SkillsSection />
        <WorksSection />
        <BrandingWall />
        <CurrentlyBuildingSection />
        <ApproachSection />
        {/* <TestimonialsSection /> */}
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
