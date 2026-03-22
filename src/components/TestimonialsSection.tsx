"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as { quote: string; name: string; role: string }[];

  return (
    <section className="w-full py-32 px-6 sm:px-10 bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t("heading")}</h2>
          <p className="font-['Instrument_Serif'] italic text-xl text-[#ccc3d9]" style={{ fontStyle: "italic" }}>
            {t("subtext")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {items.map((item) => (
            <motion.div
              key={item.name}
              variants={cardVariants}
              className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col gap-6"
            >
              <p className="text-white italic text-lg leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-xs text-[#d0bcff] uppercase tracking-widest font-bold mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
