"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WorkMeta } from "@/data/works";

const shimmerVariants = {
  rest: { x: "-150%" },
  hover: { x: "250%", transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function WorkCard({ work, index }: { work: WorkMeta; index: number }) {
  const isComingSoon = !!work.comingSoon;
  const Wrapper = isComingSoon ? motion.div : motion.a;
  const wrapperProps = isComingSoon
    ? {}
    : { href: work.url, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.2 + index * 0.06 }}
      whileHover={isComingSoon ? undefined : "hover"}
      className={`relative block rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] overflow-hidden shadow-sm transition-[box-shadow,transform] duration-200 ${
        isComingSoon ? "cursor-default" : "hover:shadow-md hover:-translate-y-1"
      }`}
    >
      {/* Glass shimmer */}
      {!isComingSoon && (
        <motion.div
          variants={shimmerVariants}
          initial="rest"
          className="absolute inset-y-0 w-1/2 pointer-events-none z-10"
          style={{
            background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
          }}
        />
      )}

      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className={`object-cover transition-transform duration-300 hover:scale-[1.05] ${
            isComingSoon ? "grayscale opacity-60" : ""
          }`}
          unoptimized
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 rounded-full text-[#5a7a55] text-xs font-semibold backdrop-blur-sm bg-white/80 dark:bg-[#111]/80">
            {work.tag}
          </span>
        </div>
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-[#111] dark:text-white">{work.title}</p>
        <p className="text-xs text-[#111]/60 dark:text-white/60 line-clamp-2 mt-0.5">{work.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="px-2 py-0.5 rounded-full bg-[#a3b899]/20 text-[#5a7a55] text-xs font-semibold">
            {work.tag}
          </span>
          {isComingSoon ? (
            <span className="text-xs italic text-[#111]/40 dark:text-white/40">Em chờ nhé...</span>
          ) : (
            <span className="text-sm text-[#a3b899]">→</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
