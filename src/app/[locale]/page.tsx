import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WorksSection } from "@/components/WorksSection";
import { BrandingWall } from "@/components/BrandingWall";
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

        {/* Capability ribbon — bridges hero → works seam */}
        <div
          className="relative border-t border-b border-white/[0.06] overflow-hidden"
          style={{ backgroundColor: "#0e0e0e" }}
        >
          <div
            className="flex py-4 select-none"
            style={{
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}
          >
            {[0, 1].map((n) => (
              <span
                key={n}
                className="whitespace-nowrap text-[10px] uppercase pr-16"
                style={{
                  color: "rgba(204,195,217,0.3)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.22em",
                }}
              >
                Modern
                Websites&nbsp;&nbsp;·&nbsp;&nbsp;E-Commerce&nbsp;&nbsp;·&nbsp;&nbsp;Booking
                Systems&nbsp;&nbsp;·&nbsp;&nbsp;Google
                Optimized&nbsp;&nbsp;·&nbsp;&nbsp;Multilingual&nbsp;&nbsp;·&nbsp;&nbsp;Custom
                Design&nbsp;&nbsp;·&nbsp;&nbsp;Fast Delivery
              </span>
            ))}
          </div>
        </div>
        <WorksSection />
        {/* <IdentificationDiagram /> */}
        <BrandingWall />
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
