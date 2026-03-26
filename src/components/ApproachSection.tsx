"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { BoidsCanvas } from "@/components/BoidsCanvas";
import { useIsMobile } from "@/hooks/use-mobile";

type Feature = { icon: string; title: string; desc: string };

export function ApproachSection() {
  const t = useTranslations("approach");
  const features = t.raw("features") as Feature[];
  // Display values — update live so the thumb and label move while dragging
  const DEFAULTS = { sep: 0.05, ali: 0.05, coh: 0.005, vr: 60 };
  const [sep, setSep] = useState(DEFAULTS.sep);
  const [ali, setAli] = useState(DEFAULTS.ali);
  const [coh, setCoh] = useState(DEFAULTS.coh);
  const [vr,  setVr]  = useState(DEFAULTS.vr);
  const [sepW, setSepW] = useState(DEFAULTS.sep);
  const [aliW, setAliW] = useState(DEFAULTS.ali);
  const [cohW, setCohW] = useState(DEFAULTS.coh);
  const [vrW,  setVrW]  = useState(DEFAULTS.vr);
  const [sliderKey, setSliderKey] = useState(0);
  const isMobile = useIsMobile();
  const [showTapHint, setShowTapHint] = useState(true);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleCardTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    const r = e.currentTarget.getBoundingClientRect();
    const x = t.clientX - r.left;
    const y = t.clientY - r.top;
    setShowTapHint(false);
    setRipple({ x, y, id: Date.now() });
    setTimeout(() => setRipple(null), 600);
  }, []);

  function resetSliders() {
    setSep(DEFAULTS.sep); setSepW(DEFAULTS.sep);
    setAli(DEFAULTS.ali); setAliW(DEFAULTS.ali);
    setCoh(DEFAULTS.coh); setCohW(DEFAULTS.coh);
    setVr(DEFAULTS.vr);   setVrW(DEFAULTS.vr);
    setSliderKey(k => k + 1);
  }

  return (
    <section className="w-full py-32 px-6 sm:px-10 bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
            {t("heading1")}
            <span className="font-['Instrument_Serif'] italic text-[#d0bcff]" style={{ fontStyle: "italic" }}>
              {t("heading_italic")}
            </span>
            {"."}
          </h2>
          <p className="text-[#ccc3d9] text-lg leading-relaxed mb-12">
            {t("body")}
          </p>

          <div className="flex flex-col gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-5">
                <div className="w-11 h-11 rounded-full bg-[#7b39fc]/10 border border-[#7b39fc]/20 flex items-center justify-center shrink-0 text-lg">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{f.title}</h4>
                  <p className="text-[#ccc3d9] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-[#7b39fc]/15 blur-[100px] rounded-full pointer-events-none" />
          <div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 glass-panel flex items-end"
            onTouchStart={handleCardTouch}
          >
            <BoidsCanvas separation={sepW} alignment={aliW} cohesion={cohW} visualRange={vrW} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

            {/* Tap hint — mobile only, disappears after first touch */}
            <AnimatePresence>
              {isMobile && showTapHint && (
                <motion.div
                  key="tap-hint"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-3xl select-none">👆</span>
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Tap me</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ripple on tap */}
            <AnimatePresence>
              {ripple && (
                <motion.div
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 6, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute w-16 h-16 rounded-full border border-[#7b39fc] pointer-events-none z-20"
                  style={{ left: ripple.x - 32, top: ripple.y - 32 }}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 p-10 select-none pointer-events-none">
              <div className="text-5xl font-['Instrument_Serif'] italic text-white/15" style={{ fontStyle: "italic" }}>
                {t("panel_quote")}
              </div>
            </div>
          </div>
          {/* Sliders — 4 in one row */}
          <div className="mt-5 flex items-center justify-between mb-3">
            <span className="text-[#ccc3d9] text-xs">Flocking behaviour</span>
            <button
              onClick={resetSliders}
              className="text-xs text-[#7b39fc] hover:text-[#a06aff] transition-colors"
            >
              Reset
            </button>
          </div>
          <div key={sliderKey} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Separation",    value: sep, set: setSep, commit: setSepW, min: 0.01, max: 0.1,  step: 0.001,  fmt: (v: number) => v.toFixed(3) },
              { label: "Alignment",     value: ali, set: setAli, commit: setAliW, min: 0, max: 0.1,  step: 0.001,  fmt: (v: number) => v.toFixed(3) },
              { label: "Cohesion",      value: coh, set: setCoh, commit: setCohW, min: 0, max: 0.01, step: 0.0001, fmt: (v: number) => v.toFixed(4) },
              { label: "Visual Range",  value: vr,  set: setVr,  commit: setVrW,  min: 0, max: 150,  step: 1,      fmt: (v: number) => v.toFixed(0) },
            ].map(({ label, value, set, commit, min, max, step, fmt }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#ccc3d9] text-xs">{label}</span>
                  <span className="text-white/60 text-xs tabular-nums">{fmt(value)}</span>
                </div>
                <input
                  type="range"
                  min={min} max={max} step={step}
                  defaultValue={value}
                  onChange={(e) => set(parseFloat(e.target.value))}
                  onPointerUp={(e) => commit(parseFloat(e.currentTarget.value))}
                  className="w-full h-1 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7b39fc] [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#7b39fc] [&::-moz-range-thumb]:border-0"
                  style={{ background: `linear-gradient(to right, #7b39fc ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)` }}
                />
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
