"use client";

import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";

export function AboutCard() {
  const t = useTranslations("about");

  return (
    <TiltCard id="about" className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col gap-3">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-1">{t("badge")}</p>
        <h2 className="text-base font-bold text-[#111] dark:text-white">{t("title")}</h2>
      </div>

      <p className="text-sm text-[#111]/70 dark:text-white/70 leading-relaxed">
        {t("p1")}
      </p>

      <div className="mt-auto pt-3 border-t border-black/5 dark:border-white/5 flex items-center gap-2">
        <span className="text-base">🌿</span>
        <span className="text-xs text-[#111]/50 dark:text-white/50">{t("footer")}</span>
      </div>
    </TiltCard>
  );
}
