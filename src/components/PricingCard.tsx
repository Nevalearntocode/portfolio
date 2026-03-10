"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { TiltCard } from "./TiltCard";

type PricingPackage = {
  id: string;
  name: string;
  price: string;
  recommended?: boolean;
  features: string[];
};

export function PricingCard() {
  const t = useTranslations("pricing");
  const packages = t.raw("packages") as PricingPackage[];

  return (
    <TiltCard className="rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/4 backdrop-blur-sm p-6 flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-1">
          {t("badge")}
        </p>
        <p className="text-xl font-semibold text-[#111] dark:text-white">{t("title")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative flex flex-col gap-4 rounded-xl p-4 border transition-colors ${
              pkg.recommended
                ? "border-[#a3b899] bg-[#a3b899]/5 sm:-mt-4"
                : "border-black/6 dark:border-white/6 bg-black/2 dark:bg-white/3"
            }`}
          >
            {pkg.recommended && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#a3b899] text-white whitespace-nowrap">
                {t("recommended")}
              </span>
            )}

            <div>
              <p className="text-sm font-semibold text-[#111] dark:text-white">{pkg.name}</p>
              <p className="text-xs text-[#111]/50 dark:text-white/50 mt-0.5">{pkg.price}</p>
            </div>

            <ul className="flex flex-col gap-1.5 flex-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-[#111]/70 dark:text-white/70">
                  <Check size={12} className="text-[#a3b899] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`text-center text-xs font-medium py-2 rounded-lg transition-colors ${
                pkg.recommended
                  ? "bg-[#a3b899] text-white hover:bg-[#7a9470]"
                  : "bg-black/5 dark:bg-white/5 text-[#111]/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {t("cta")}
            </a>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#111]/40 dark:text-white/40 leading-snug">
        ⓘ All plans require a domain (~£10/yr) and monthly hosting. Included from Growth onwards.
      </p>
    </TiltCard>
  );
}
