import "./portfolio.css";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { BentoGrid } from "@/components/BentoGrid";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";

export default function Plan6Page() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-[#fafaf7] dark:bg-[#111] px-4 sm:px-6 pt-28 pb-16">
        <BentoGrid />
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
}
