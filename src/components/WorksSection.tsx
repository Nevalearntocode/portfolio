"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { works } from "@/data/works";
import { Link } from "@/i18n/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function WorkCard({ work, offset }: { work: (typeof works)[0]; offset?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    if (work.video && videoRef.current) {
      setHovering(true);
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (work.video && videoRef.current) {
      setHovering(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={offset ? "md:mt-24" : ""}
    >
      <motion.a
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-xl overflow-hidden aspect-[16/10] bg-[#1f1f1f] block cursor-pointer"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Thumbnail */}
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className={`object-cover transition-all duration-700 ${hovering && work.video ? "opacity-0" : "opacity-80 group-hover:opacity-100 group-hover:scale-105"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Video */}
        {work.video && (
          <video
            ref={videoRef}
            src={work.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovering ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Hover overlay with arrow */}
        <div className={`absolute inset-0 bg-[#7b39fc]/20 flex items-center justify-center transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}>
          <span className="text-white text-4xl">↗</span>
        </div>
      </motion.a>

      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-white">{work.title}</h3>
          <p className="text-[#ccc3d9] text-sm mt-1 font-light">{work.tag}</p>
        </div>
        <span className="text-xs text-[#d0bcff] uppercase tracking-widest border border-[#7b39fc]/20 px-3 py-1 rounded-full">
          {new Date().getFullYear()}
        </span>
      </div>
    </motion.div>
  );
}

export function WorksSection() {
  const t = useTranslations("works");

  return (
    <section id="works" className="w-full py-24 px-6 sm:px-10 bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest mb-3">
              {t("badge")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
            <p className="font-['Instrument_Serif'] italic text-xl text-[#ccc3d9] mt-1" style={{ fontStyle: "italic" }}>
              Crafted for impact.
            </p>
          </div>
          <Link
            href="/works"
            className="text-sm text-[#ccc3d9]/60 hover:text-white transition-colors hidden sm:block"
          >
            See all →
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} offset={i % 2 === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
