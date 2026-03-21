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
    <section className="w-full py-24 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.n}
              variants={stepVariants}
              className="group flex flex-col gap-4"
            >
              <span className="text-7xl sm:text-8xl font-bold text-white/8 leading-none select-none group-hover:text-white/14 transition-colors duration-300">
                {step.n}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors relative inline-block">
                  {step.title}
                  <span className="absolute bottom-0 left-0 h-px bg-[#a3b899] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
