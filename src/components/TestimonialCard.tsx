"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";

export function TestimonialCard() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);

  // Get items from translations
  const items = t.raw("items") as Array<{ id: string; name: string; business: string; quote: string }>;

  useEffect(() => {
    if (!items || items.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items]);

  if (!items || items.length === 0) return null;

  const current = items[index];

  return (
    <TiltCard className="rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm p-6 flex flex-col justify-between gap-4 h-full overflow-hidden">
      <p className="text-xs font-semibold text-[#111]/40 uppercase tracking-widest">{t("badge")}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-3 flex-1"
        >
          <p className="text-sm text-[#111]/80 leading-relaxed italic">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-auto">
            <p className="text-xs font-semibold text-[#111]">{current.name}</p>
            <p className="text-xs text-[#111]/50">{current.business}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-[#a3b899]" : "bg-black/15"
              }`}
          />
        ))}
      </div>
    </TiltCard>
  );
}
