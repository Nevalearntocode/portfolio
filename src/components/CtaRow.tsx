"use client";

import { motion } from "framer-motion";

export function CtaRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-[#111] px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      <h2 className="text-3xl sm:text-4xl font-bold italic text-white leading-tight">
        Sẵn sàng phát triển<br />doanh nghiệp trực tuyến?
      </h2>
      <a
        href="mailto:alex@alexbuilds.dev"
        className="shrink-0 px-7 py-3.5 rounded-xl bg-[#a3b899] text-white font-semibold text-sm hover:bg-[#7a9470] hover:scale-105 transition-all duration-150"
      >
        Nói chuyện thôi →
      </a>
    </motion.div>
  );
}
