"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "Performance First",
    desc: "Lightweight codebases designed to load instantly and rank above competitors in every SEO metric.",
  },
  {
    icon: "✦",
    title: "Editorial Precision",
    desc: "Pixel-perfect attention to typography, spacing, and rhythm to ensure your brand's voice is heard clearly.",
  },
];

export function ApproachSection() {
  return (
    <section className="w-full py-32 px-6 sm:px-10 bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
            {"Crafting the digital "}
            <span className="font-['Instrument_Serif'] italic text-[#d0bcff]" style={{ fontStyle: "italic" }}>
              standard
            </span>
            {"."}
          </h2>
          <p className="text-[#ccc3d9] text-lg leading-relaxed mb-12">
            {"I don't just build websites; I engineer brand-aligned digital experiences that prioritize speed, conversion, and editorial precision. Every project is a bespoke challenge."}
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

        {/* Right: editorial image panel */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-[#7b39fc]/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 glass-panel flex items-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="relative p-10 select-none">
              <div className="text-5xl font-['Instrument_Serif'] italic text-white/15" style={{ fontStyle: "italic" }}>
                Design is Strategy.
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
