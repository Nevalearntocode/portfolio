import "./portfolio.css";
import { Navbar } from "@/components/Navbar";
import { BentoGrid } from "@/components/BentoGrid";

export const metadata = {
  title: "Plan 6 — Bento Grid",
  description: "Modern websites for local businesses.",
};

export default function Plan6Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fafaf7] px-4 sm:px-6 pt-28 pb-16 max-w-[1100px] mx-auto">
        <BentoGrid />
      </main>
    </>
  );
}
