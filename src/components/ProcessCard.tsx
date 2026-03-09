"use client";

import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";

export function ProcessCard() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{ n: string; title: string; desc: string }>;

  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col gap-5 h-full">
      <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest">{t("badge")}</p>

      <div className="flex flex-col gap-4 flex-1">
        {steps.map((step) => (
          <div key={step.n} className="flex gap-3">
            <span className="text-xs font-bold text-[#a3b899] tabular-nums mt-0.5 shrink-0">{step.n}</span>
            <div>
              <p className="text-sm font-semibold text-[#111] dark:text-white leading-snug">{step.title}</p>
              <p className="text-xs text-[#111]/55 dark:text-white/55 leading-relaxed mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </TiltCard>
  );
}
