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

type Package = {
  id: string;
  name: string;
  price: string;
  recommended?: boolean;
  features: string[];
};

function TierCard({
  pkg,
  index,
  cta,
  recommended,
  messengerUrl,
}: {
  pkg: Package;
  index: number;
  cta: string;
  recommended: string;
  messengerUrl: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
      className={`relative flex flex-col gap-6 rounded-2xl p-8 bg-[#161616] ${
        pkg.recommended
          ? "border border-[rgba(123,57,252,0.35)]"
          : "border border-white/5"
      }`}
    >
      {pkg.recommended && (
        <span className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-widest text-[#7b39fc] border border-[rgba(123,57,252,0.3)] px-2 py-0.5">
          {recommended}
        </span>
      )}

      <div>
        <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-2">
          {pkg.name}
        </p>
        <p className="text-2xl font-bold text-white">{pkg.price}</p>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {pkg.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm text-[#ccc3d9]">
            <span className="text-[#7b39fc] mt-0.5 shrink-0 select-none">•</span>
            {feat}
          </li>
        ))}
      </ul>

      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#ccc3d9]/60 hover:text-[#d0bcff] transition-colors"
      >
        {cta}
      </a>
    </motion.div>
  );
}

export function PricingSection() {
  const tCalc = useTranslations("pricingCalc");
  const tTiers = useTranslations("pricing");
  const messengerUrl = useMessengerUrl();

  const [pages,   setPages]   = useState(5);
  const [oneTime, setOneTime] = useState<Set<OneTimeId>>(new Set());
  const [monthly, setMonthly] = useState<Set<MonthlyId>>(new Set());

  const packages = tTiers.raw("packages") as Package[];

  const oneTimeAddons = ONE_TIME_ADDON_IDS.map(id => ({
    id,
    label: tCalc(`addons.${id}_label`),
    sub:   tCalc(`addons.${id}_sub`),
  }));

  const monthlyAddons = MONTHLY_ADDON_IDS.map(id => ({
    id,
    label: tCalc(`addons.${id}_label`),
    sub:   tCalc(`addons.${id}_sub`),
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
      <div className="max-w-screen-xl mx-auto flex flex-col gap-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-3">
            {tTiers("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {tTiers("title")}
          </h2>
        </motion.div>

        {/* 3-tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <TierCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              cta={tTiers("cta")}
              recommended={tTiers("recommended")}
              messengerUrl={messengerUrl}
            />
          ))}
        </div>

        {/* Divider — "Or build your own quote" */}
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">
            {tCalc("heading")}
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* calculator grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >

          {/* LEFT: form */}
          <div className="lg:col-span-7 rounded-2xl bg-white/[0.03] border border-white/5 p-8 flex flex-col gap-8">

            {/* pages slider */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-[#ccc3d9] uppercase tracking-widest">
                  {tCalc("pages_label")}
                </h3>
                <span className="bg-[#7b39fc]/20 text-[#d0bcff] px-3 py-1 rounded-full text-sm font-bold">
                  {pages} {pages !== 1 ? tCalc("page_plural") : tCalc("page_singular")}
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
                {tCalc("one_time_addons")}
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
                {tCalc("monthly_services")}
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
                  {tCalc("delivery_label")}
                </p>
                <p className="text-5xl font-bold text-white tracking-tight">
                  {deliveryDays}
                </p>
                <p className="text-sm text-white/40 mt-1">{tCalc("delivery_unit")}</p>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                {tCalc("summary_label")}
              </p>

              {/* selection list */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7b39fc] shrink-0" />
                  <span className="text-sm text-white/70">
                    {pages} {pages !== 1 ? tCalc("page_plural") : tCalc("page_singular")}
                  </span>
                </div>
                {selectedAddons.map(addon => (
                  <div key={addon.id} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7b39fc] shrink-0" />
                    <span className="text-sm text-white/70">{addon.label}</span>
                  </div>
                ))}
                {selectedAddons.length === 0 && (
                  <p className="text-sm text-white/20 mt-1">{tCalc("summary_hint")}</p>
                )}
              </div>

              <div className="h-px bg-white/[0.06]" />

              <p className="text-xs text-white/25">{tCalc("footnote")}</p>

              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm font-bold py-4 rounded-full bg-[#7b39fc] text-white hover:bg-[#9b59ff] transition-colors shadow-lg shadow-[#7b39fc]/20"
              >
                {tCalc("cta")}
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
