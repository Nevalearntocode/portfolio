"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/ui/slider";
import { useMessengerUrl } from "@/hooks/use-mobile";

const ONE_TIME_ADDON_IDS = ["seo", "content", "gbp"] as const;
const MONTHLY_ADDON_IDS  = ["reviews", "social", "maintenance"] as const;

type OneTimeId = (typeof ONE_TIME_ADDON_IDS)[number];
type MonthlyId = (typeof MONTHLY_ADDON_IDS)[number];

function estimateDays(pages: number, oneTime: Set<OneTimeId>): string {
  let min: number, max: number;
  if      (pages <= 3)  { min = 3;  max = 5;  }
  else if (pages <= 5)  { min = 5;  max = 8;  }
  else if (pages <= 8)  { min = 7;  max = 11; }
  else if (pages <= 12) { min = 10; max = 14; }
  else if (pages <= 16) { min = 13; max = 18; }
  else                  { min = 16; max = 22; }

  if (oneTime.has("seo"))     { min += 1; max += 2; }
  if (oneTime.has("content")) { min += 2; max += 3; }
  if (oneTime.has("gbp"))     { max += 1; }

  return `${min}–${max}`;
}

function Checkbox({
  checked,
  onChange,
  label,
  sub,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  sub: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
          checked
            ? "border-[#7b39fc] bg-[#7b39fc]"
            : "border-white/20 bg-transparent group-hover:border-white/40"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/80 leading-snug">{label}</p>
        <p className="text-xs text-white/35 mt-0.5">{sub}</p>
      </div>
    </label>
  );
}

export function PricingSection() {
  const t = useTranslations("pricingCalc");
  const messengerUrl = useMessengerUrl();

  const [pages,   setPages]   = useState(5);
  const [oneTime, setOneTime] = useState<Set<OneTimeId>>(new Set());
  const [monthly, setMonthly] = useState<Set<MonthlyId>>(new Set());

  const oneTimeAddons = ONE_TIME_ADDON_IDS.map(id => ({
    id,
    label: t(`addons.${id}_label`),
    sub:   t(`addons.${id}_sub`),
  }));

  const monthlyAddons = MONTHLY_ADDON_IDS.map(id => ({
    id,
    label: t(`addons.${id}_label`),
    sub:   t(`addons.${id}_sub`),
  }));

  function toggleOneTime(id: OneTimeId) {
    setOneTime(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleMonthly(id: MonthlyId) {
    setMonthly(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedAddons = [
    ...oneTimeAddons.filter(a => oneTime.has(a.id)),
    ...monthlyAddons.filter(a => monthly.has(a.id)),
  ];

  const deliveryDays = estimateDays(pages, oneTime);

  return (
    <section id="pricing" className="w-full py-24 px-6 sm:px-10 bg-[#131313]">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-12">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t("heading")}
          </h2>
          <p className="mt-2 text-sm text-[#ccc3d9] max-w-md">
            {t("subtext")}
          </p>
        </motion.div>

        {/* calculator grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >

          {/* LEFT: form */}
          <div className="lg:col-span-7 rounded-2xl bg-white/[0.03] border border-white/5 p-8 flex flex-col gap-8">

            {/* pages slider */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-[#ccc3d9] uppercase tracking-widest">
                  {t("pages_label")}
                </h3>
                <span className="bg-[#7b39fc]/20 text-[#d0bcff] px-3 py-1 rounded-full text-sm font-bold">
                  {pages} {pages !== 1 ? t("page_plural") : t("page_singular")}
                </span>
              </div>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[pages]}
                onValueChange={([v]) => setPages(v)}
                className="[&_[data-slot=slider-range]]:bg-[#7b39fc] [&_[data-slot=slider-thumb]]:border-[#7b39fc]"
              />
              <div className="flex justify-between text-xs text-white/25">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* one-time add-ons */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                {t("one_time_addons")}
              </h3>
              <div className="flex flex-col gap-3">
                {oneTimeAddons.map(addon => (
                  <Checkbox
                    key={addon.id}
                    checked={oneTime.has(addon.id)}
                    onChange={() => toggleOneTime(addon.id)}
                    label={addon.label}
                    sub={addon.sub}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* monthly services */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                {t("monthly_services")}
              </h3>
              <div className="flex flex-col gap-3">
                {monthlyAddons.map(addon => (
                  <Checkbox
                    key={addon.id}
                    checked={monthly.has(addon.id)}
                    onChange={() => toggleMonthly(addon.id)}
                    label={addon.label}
                    sub={addon.sub}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: summary */}
          <div className="lg:col-span-5">
            <div className="glass-panel relative overflow-hidden rounded-2xl border border-white/10 p-8 flex flex-col gap-6 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7b39fc]/10 blur-[50px] pointer-events-none" />

              {/* Estimated delivery */}
              <div>
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">
                  {t("delivery_label")}
                </p>
                <p className="text-5xl font-bold text-white tracking-tight">
                  {deliveryDays}
                </p>
                <p className="text-sm text-white/40 mt-1">{t("delivery_unit")}</p>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                {t("summary_label")}
              </p>

              {/* selection list */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7b39fc] shrink-0" />
                  <span className="text-sm text-white/70">
                    {pages} {pages !== 1 ? t("page_plural") : t("page_singular")}
                  </span>
                </div>
                {selectedAddons.map(addon => (
                  <div key={addon.id} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7b39fc] shrink-0" />
                    <span className="text-sm text-white/70">{addon.label}</span>
                  </div>
                ))}
                {selectedAddons.length === 0 && (
                  <p className="text-sm text-white/20 mt-1">{t("summary_hint")}</p>
                )}
              </div>

              <div className="h-px bg-white/[0.06]" />

              <p className="text-xs text-white/25">{t("footnote")}</p>

              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm font-bold py-4 rounded-full bg-[#7b39fc] text-white hover:bg-[#9b59ff] transition-colors shadow-lg shadow-[#7b39fc]/20"
              >
                {t("cta")}
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
