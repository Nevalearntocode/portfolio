"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeaturedWorkCard } from "@/components/FeaturedWorkCard";
import { WorkCard } from "@/components/WorkCard";
import { works } from "@/data/works";

export function WorksPageContent() {
  const t = useTranslations("worksPage");
  const [g1, g2, g3, featured, ...bottom] = works;

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-[#fafaf7] dark:bg-[#111] px-4 sm:px-6 pt-28 pb-16">
        <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#111] dark:text-white">{t("title")}</h1>
          <p className="text-sm text-[#111]/60 dark:text-white/60 mt-1">{t("subtitle")}</p>
        </motion.div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[g1, g2, g3].map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>

        {/* Full-width featured */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          className="mb-4"
        >
          <FeaturedWorkCard work={featured} />
        </motion.div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bottom.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i + 4} />
          ))}
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
