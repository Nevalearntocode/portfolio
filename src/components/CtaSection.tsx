"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function CtaSection() {
  const t = useTranslations("cta");
  const messengerUrl = useMessengerUrl();

  return (
    <section className="w-full py-32 px-6 sm:px-10 bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl"
        >
          {t("title")}
        </motion.h2>

        <motion.a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#7b39fc] text-white font-semibold text-base hover:scale-[0.97] transition-transform shadow-lg shadow-[#7b39fc]/20"
        >
          <span>{t("button")}</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </motion.a>
      </div>
    </section>
  );
}
