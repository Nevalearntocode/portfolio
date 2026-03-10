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
import { TiltCard } from "./TiltCard";

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

export function SkillsCard() {
  const t = useTranslations("skills");

  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col gap-4 h-full">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-1">
          {t("badge")}
        </p>
        <h2 className="text-base font-bold text-[#111] dark:text-white">{t("title")}</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        {capabilityConfig.map((cap, i) => (
          <motion.div
            key={cap.key}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#a3b899]/10 dark:bg-[#a3b899]/20 border border-[#a3b899]/20 dark:border-[#a3b899]/30"
          >
            <cap.icon className="w-3.5 h-3.5 text-[#5a7a55] shrink-0" />
            <span className="text-xs font-medium text-[#111]/80 dark:text-white/80 leading-tight">
              {t(`capabilities.${cap.key}`)}
            </span>
          </motion.div>
        ))}
      </div>
    </TiltCard>
  );
}
