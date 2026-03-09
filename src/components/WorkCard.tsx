"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WorkMeta } from "@/data/works";

const shimmerVariants = {
  rest: { x: "-150%" },
  hover: { x: "250%", transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function WorkCard({ work, index }: { work: WorkMeta; index: number }) {
  return (
    <motion.a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.2 + index * 0.06 }}
      whileHover="hover"
      className="relative block rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-[box-shadow,transform] duration-200"
    >
      {/* Glass shimmer */}
      <motion.div
        variants={shimmerVariants}
        initial="rest"
        className="absolute inset-y-0 w-1/2 pointer-events-none z-10"
        style={{
          background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
        }}
      />

      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.05]"
          unoptimized
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 rounded-full text-[#5a7a55] text-xs font-semibold backdrop-blur-sm bg-white/80 dark:bg-[#111]/80">
            {work.tag}
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-[#111] dark:text-white">{work.title}</p>
        <p className="text-xs text-[#111]/60 dark:text-white/60 line-clamp-2 mt-0.5">{work.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="px-2 py-0.5 rounded-full bg-[#a3b899]/20 text-[#5a7a55] text-xs font-semibold">
            {work.tag}
          </span>
          <span className="text-sm text-[#a3b899]">→</span>
        </div>
      </div>
    </motion.a>
  );
}
