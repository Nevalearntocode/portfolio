"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WorkMeta } from "@/data/works";

const shimmerVariants = {
  rest: { x: "-150%" },
  hover: { x: "250%", transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function FeaturedWorkCard({ work }: { work: WorkMeta }) {
  return (
    <motion.a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      className="relative block rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-[box-shadow,transform] duration-200"
    >
      {/* Glass shimmer */}
      <motion.div
        variants={shimmerVariants}
        initial="rest"
        className="absolute inset-y-0 w-1/2 pointer-events-none z-10"
        style={{
          background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
        }}
      />

      <div className="relative w-full aspect-video sm:aspect-[16/7] overflow-hidden">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          unoptimized
        />
      </div>

      <div className="p-4 flex items-center gap-3">
        <span className="px-2 py-0.5 rounded-full bg-[#a3b899]/20 text-[#5a7a55] text-xs font-semibold shrink-0">
          {work.tag}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-[#111] dark:text-white leading-tight">{work.title}</p>
          <p className="hidden sm:block text-sm text-[#111]/60 dark:text-white/60 line-clamp-1 mt-0.5">
            {work.description}
          </p>
        </div>
        <span className="text-sm font-medium text-[#a3b899] hover:text-[#7a9470] shrink-0 ml-auto">
          Visit →
        </span>
      </div>
    </motion.a>
  );
}
