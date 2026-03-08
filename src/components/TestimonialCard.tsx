"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { testimonials } from "@/lib/placeholder-vi";

export function TestimonialCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm p-6 flex flex-col justify-between gap-4 h-full overflow-hidden">
      <p className="text-xs font-semibold text-[#111]/40 uppercase tracking-widest">Đánh giá</p>

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
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index ? "bg-[#a3b899]" : "bg-black/15"
            }`}
          />
        ))}
      </div>
    </TiltCard>
  );
}
