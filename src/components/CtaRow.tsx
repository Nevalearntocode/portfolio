"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { owner } from "@/data/owner";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function CtaRow() {
  const t = useTranslations("cta");
  const messengerUrl = useMessengerUrl();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-[#111] px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      <h2 className="text-3xl sm:text-4xl font-bold italic text-white leading-tight whitespace-pre-line">
        {t("title")}
      </h2>
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 px-7 py-3.5 rounded-xl bg-[#a3b899] text-white font-semibold text-sm hover:bg-[#7a9470] hover:scale-105 transition-all duration-150"
      >
        {t("button")}
      </a>
    </motion.div>
  );
}
