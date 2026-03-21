"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function CtaSection() {
  const t = useTranslations("cta");
  const messengerUrl = useMessengerUrl();
  const lines = t("title").split("\n");

  return (
    <section className="w-full py-32 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-10">
        <div className="flex flex-col gap-2">
          {lines.map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: i * 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#a3b899] text-white font-semibold text-base hover:bg-[#8faa85] transition-colors"
        >
          <span>{t("button").replace(" →", "")}</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </motion.a>
      </div>
    </section>
  );
}
