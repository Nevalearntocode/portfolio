"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Capability = { title: string; desc: string };

const STAGGER = 0.1;

export function SkillsSection() {
  const t = useTranslations("skills");
  const capabilities = t.raw("capabilities") as Capability[];
  const half = Math.ceil(capabilities.length / 2);
  const left  = capabilities.slice(0, half);
  const right = capabilities.slice(half);
  const rows  = left.length;

  return (
    <section className="w-full pt-24 pb-0 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Desktop: timeline
            grid: [dot 12px] [left card] [center line 24px] [right card] [dot 12px]
        */}
        <div className="hidden sm:flex flex-col relative">
          {/* Single continuous center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/8 pointer-events-none" />

          {Array.from({ length: rows }).map((_, r) => {
            const l  = left[r];
            const ri = right[r];

            return (
              <div key={r} className="grid grid-cols-[12px_1fr_24px_1fr_12px] items-start gap-x-3">

                {/* Left dot */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: r * 2 * STAGGER }}
                  className="flex justify-center pt-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#7b39fc]/70 ring-2 ring-[#0e0e0e] shrink-0" />
                </motion.div>

                {/* Left card */}
                <motion.div
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: r * 2 * STAGGER, ease: "easeOut" }}
                  className="pb-3"
                >
                  <div className="px-4 py-2.5 rounded-xl bg-[#161616] border border-white/5">
                    <span className="text-sm font-medium text-white">{l.title}</span>
                  </div>
                </motion.div>

                {/* Center column spacer */}
                <div />

                {/* Right card */}
                {ri && (
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: (r * 2 + 1) * STAGGER, ease: "easeOut" }}
                    className="pb-3"
                  >
                    <div className="px-4 py-2.5 rounded-xl bg-[#161616] border border-white/5">
                      <span className="text-sm font-medium text-white">{ri.title}</span>
                    </div>
                  </motion.div>
                )}

                {/* Right dot */}
                {ri && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: (r * 2 + 1) * STAGGER }}
                    className="flex justify-center pt-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#7b39fc]/70 ring-2 ring-[#0e0e0e] shrink-0" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: pill grid */}
        <div className="sm:hidden grid grid-cols-2 gap-2">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
              className="px-4 py-3 rounded-xl bg-[#161616] border border-white/5"
            >
              <span className="text-sm font-medium text-white">{cap.title}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
