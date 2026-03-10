"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";
import { owner } from "@/data/owner";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function HeroCard() {
  const t = useTranslations("hero");
  const messengerUrl = useMessengerUrl();

  return (
    <TiltCard className="rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/4 backdrop-blur-sm p-8 flex flex-col justify-between min-h-[280px] h-full overflow-hidden relative">
      {/* Accent blob */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#a3b899]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3 flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3b899]/20 text-xs font-medium text-[#5a7a55] w-fit">
            {t("badge")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#111] dark:text-white leading-tight tracking-tight">
            {t("title", { name: owner.name })}
          </h1>
          <p className="text-base text-[#111]/60 dark:text-white/60 font-medium">
            {t("subtitle")}
          </p>
          <p className="text-sm text-[#111]/70 dark:text-white/70 leading-relaxed max-w-xs">
            {t("description")}
          </p>
        </div>

        <div className="shrink-0">
          <Image
            src="/logo.jpg"
            alt="Neva logo"
            width={80}
            height={80}
            className="w-20 h-20 object-contain dark:invert"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <a
          href="#works"
          onClick={(e) => { e.preventDefault(); document.getElementById("works")?.scrollIntoView({ behavior: "smooth" }); }}
          className="px-4 py-2 rounded-full bg-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors"
        >
          {t("cta_works")}
        </a>
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full border border-black/10 dark:border-white/20 text-[#111] dark:text-white text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {t("cta_contact")}
        </a>
      </div>
    </TiltCard>
  );
}
