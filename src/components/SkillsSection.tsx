"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calendar,
  ShoppingBag,
  Smartphone,
  Search,
  LayoutDashboard,
  Palette,
  Languages,
  Images,
} from "lucide-react";

const capabilityConfig = [
  { icon: Calendar, key: "booking" },
  { icon: ShoppingBag, key: "shop" },
  { icon: Smartphone, key: "mobile" },
  { icon: Search, key: "seo" },
  { icon: LayoutDashboard, key: "content" },
  { icon: Palette, key: "designs" },
  { icon: Languages, key: "multilingual" },
  { icon: Images, key: "gallery" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section className="w-full py-24 px-6 sm:px-10 bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl"
        >
          {capabilityConfig.map((cap) => (
            <motion.div
              key={cap.key}
              variants={pillVariants}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1f1f1f] border border-white/5 hover:bg-[#2a2a2a] transition-colors"
            >
              <cap.icon className="w-4 h-4 text-[#d0bcff] shrink-0" />
              <span className="text-sm font-medium text-[#ccc3d9]">
                {t(`capabilities.${cap.key}`)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
