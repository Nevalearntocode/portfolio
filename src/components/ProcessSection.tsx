"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

type Step = { n: string; title: string; desc: string };

export function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="relative w-full py-32 px-6 sm:px-10 overflow-hidden bg-[#0e0e0e]">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(123, 57, 252, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">The Process</h2>
          <p className="font-['Instrument_Serif'] italic text-xl text-[#ccc3d9] mt-2" style={{ fontStyle: "italic" }}>
            How we build excellence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.n}
              variants={stepVariants}
              className="group flex flex-col items-center text-center gap-4"
            >
              <span className="text-8xl font-bold text-white/5 leading-none select-none group-hover:text-[#7b39fc]/10 transition-colors duration-300 mb-[-2rem]">
                {step.n}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white relative inline-block">
                  {step.title}
                  <span className="absolute bottom-0 left-0 h-px bg-[#7b39fc] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </h3>
                <p className="text-sm text-[#ccc3d9] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
