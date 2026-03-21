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
    <section className="w-full py-24 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: text + pills */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
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
            className="grid grid-cols-2 gap-2"
          >
            {capabilityConfig.map((cap) => (
              <motion.div
                key={cap.key}
                variants={pillVariants}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors"
              >
                <cap.icon className="w-4 h-4 text-[#a3b899] shrink-0" />
                <span className="text-sm font-medium text-white/80">
                  {t(`capabilities.${cap.key}`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: demo video */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden aspect-video border border-white/8"
        >
          <video
            src="/works/tech-shop.webm"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
