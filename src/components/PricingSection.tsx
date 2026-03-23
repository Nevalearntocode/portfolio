"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/ui/slider";
import { useMessengerUrl } from "@/hooks/use-mobile";

// ── Pricing config ─────────────────────────────────────────────
const BASE_PRICE = 300_000;
const PER_PAGE   = 150_000;

const ONE_TIME_ADDON_IDS = ["seo", "content", "gbp"] as const;
const ONE_TIME_ADDON_RATES: Record<string, { perPage: number; flat: number }> = {
  seo:     { perPage: 100_000, flat: 0         },
  content: { perPage: 150_000, flat: 0         },
  gbp:     { perPage: 0,       flat: 500_000   },
};

const MONTHLY_ADDON_IDS = ["reviews", "social", "maintenance"] as const;
const MONTHLY_ADDON_RATES: Record<string, { monthly: number }> = {
  reviews:     { monthly: 200_000 },
  social:      { monthly: 500_000 },
  maintenance: { monthly: 150_000 },
};

type OneTimeId  = (typeof ONE_TIME_ADDON_IDS)[number];
type MonthlyId  = (typeof MONTHLY_ADDON_IDS)[number];

// ── helpers ────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

// ── sub-components ─────────────────────────────────────────────
function Checkbox({
  checked,
  onChange,
  label,
  sub,
  price,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  sub: string;
  price: string;
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
      <span className="text-sm font-medium text-[#d0bcff] shrink-0">{price}</span>
    </label>
  );
}

// ── main component ─────────────────────────────────────────────
export function PricingSection() {
  const t = useTranslations("pricingCalc");
  const messengerUrl = useMessengerUrl();

  const [pages,     setPages]     = useState(5);
  const [oneTime,   setOneTime]   = useState<Set<OneTimeId>>(new Set());
  const [monthly,   setMonthly]   = useState<Set<MonthlyId>>(new Set());

  const oneTimeAddons = ONE_TIME_ADDON_IDS.map(id => ({
    id,
    label: t(`addons.${id}_label`),
    sub:   t(`addons.${id}_sub`),
    ...ONE_TIME_ADDON_RATES[id],
  }));

  const monthlyAddons = MONTHLY_ADDON_IDS.map(id => ({
    id,
    label: t(`addons.${id}_label`),
    sub:   t(`addons.${id}_sub`),
    ...MONTHLY_ADDON_RATES[id],
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

  // ── totals ────────────────────────────────────────────────────
  const websiteCost = BASE_PRICE + (pages - 1) * PER_PAGE;

  const oneTimeCost = oneTimeAddons.reduce((acc, addon) => {
    if (!oneTime.has(addon.id)) return acc;
    return acc + addon.flat + addon.perPage * pages;
  }, 0);

  const monthlyCost = monthlyAddons.reduce((acc, addon) => {
    if (!monthly.has(addon.id)) return acc;
    return acc + addon.monthly;
  }, 0);

  const oneTimeTotal  = websiteCost + oneTimeCost;
  const monthlyTotal  = monthlyCost;

  return (
    <section className="w-full py-24 px-6 sm:px-10 bg-[#131313]">
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

          {/* ── LEFT: form (7 cols) ── */}
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
                <span>{fmt(PER_PAGE)}{t("per_page")}</span>
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
                    price={
                      addon.flat
                        ? fmt(addon.flat)
                        : `+${fmt(addon.perPage)}${t("per_page")}`
                    }
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
                    price={`${fmt(addon.monthly)}/mo`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: totals (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* one-time total */}
            <div className="flex-1 glass-panel relative overflow-hidden rounded-2xl border border-white/10 p-8 flex flex-col justify-between gap-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7b39fc]/10 blur-[50px] pointer-events-none" />
              <div>
                <p className="text-xs font-semibold text-[#4a4456] uppercase tracking-widest mb-4">
                  {t("estimated_total")}
                </p>
                <p className="text-5xl font-bold text-white tracking-tight">
                  {fmt(oneTimeTotal)}
                </p>
                <p className="text-sm text-[#ccc3d9] mt-2">
                  {t("one_time_cost")}
                </p>
              </div>

              {/* breakdown */}
              <ul className="flex flex-col gap-2">
                <li className="flex justify-between text-sm text-[#ccc3d9]">
                  <span>{pages} {pages !== 1 ? t("page_plural") : t("page_singular")} × {fmt(PER_PAGE)}</span>
                  <span className="text-white">{fmt(websiteCost)}</span>
                </li>
                {oneTimeAddons.filter(a => oneTime.has(a.id)).map(addon => (
                  <li key={addon.id} className="flex justify-between text-sm text-[#ccc3d9]">
                    <span>{addon.label}</span>
                    <span className="text-white">
                      {addon.flat
                        ? fmt(addon.flat)
                        : fmt(addon.perPage * pages)}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm font-bold py-4 rounded-full bg-[#7b39fc] text-white hover:scale-[0.98] transition-transform shadow-lg shadow-[#7b39fc]/20"
              >
                {t("cta")}
              </a>
            </div>

            {/* monthly total */}
            <div className={`rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 ${
              monthlyTotal > 0
                ? "border-[#7b39fc]/30 bg-[#7b39fc]/5"
                : "border-white/5 bg-white/[0.03]"
            }`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#4a4456] uppercase tracking-widest mb-1">
                    {t("monthly_recurring")}
                  </p>
                  <p className="text-3xl font-bold text-white tracking-tight">
                    {monthlyTotal > 0 ? fmt(monthlyTotal) : "—"}
                    {monthlyTotal > 0 && <span className="text-base font-normal text-white/40">/mo</span>}
                  </p>
                </div>
                {monthlyTotal === 0 && (
                  <p className="text-xs text-white/25 max-w-[140px] text-right">
                    {t("monthly_hint")}
                  </p>
                )}
              </div>

              {monthlyTotal > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {monthlyAddons.filter(a => monthly.has(a.id)).map(addon => (
                    <li key={addon.id} className="flex justify-between text-sm text-white/50">
                      <span>{addon.label}</span>
                      <span>{fmt(addon.monthly)}/mo</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </motion.div>

        {/* footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xs text-[#4a4456] text-center"
        >
          {t("footnote")}
        </motion.p>

      </div>
    </section>
  );
}
