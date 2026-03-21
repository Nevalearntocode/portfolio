"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { owner } from "@/data/owner";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const messengerUrl = useMessengerUrl();

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center sm:items-end">
      {/* Video background */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay — lighter to let video breathe */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Content — centered on mobile, bottom-aligned on desktop */}
      <div className={`relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 pt-6 sm:pt-0 pb-16 ${locale === "en" ? "sm:pb-36" : "sm:pb-20"}`}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight whitespace-pre-line"
          >
            {t("title", { name: owner.name })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 font-medium"
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-base text-white/60 max-w-md"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
            className="flex items-center gap-3 mt-2"
          >
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-white text-[#111] text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              {t("cta_works")}
            </a>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {t("cta_contact")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
