"use client";

import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";

export function AvailabilityCard() {
  const t = useTranslations("availability");

  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm px-5 py-4 flex items-center gap-3">
      <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-[#4ade80] shrink-0" />
      <div>
        <p className="text-sm font-semibold text-[#111] dark:text-white">{t("status")}</p>
        <p className="text-xs text-[#111]/50 dark:text-white/50">{t("subtext")}</p>
      </div>
    </TiltCard>
  );
}
