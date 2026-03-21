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
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

function WorkCard({ work }: { work: (typeof works)[0] }) {
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

  if (work.comingSoon) {
    return (
      <motion.div
        variants={cardVariants}
        className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video bg-white/3 flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            className="object-cover opacity-20 blur-sm grayscale"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/60 border border-white/15">
            Coming Soon
          </span>
          <p className="text-sm text-white/40">{work.tag}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.a
      variants={cardVariants}
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden border border-white/8 aspect-video bg-[#1a1a1a] block"
      style={{ transform: "translateZ(0)" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Thumbnail */}
      <Image
        src={work.thumbnail}
        alt={work.title}
        fill
        className={`object-cover transition-opacity duration-300 ${hovering && work.video ? "opacity-0" : "opacity-100"}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors duration-200 ${hovering ? "bg-[#a3b899]/30 border-[#a3b899]/50 text-[#a3b899]" : "bg-white/10 border-white/20 text-white/70"}`}>
            {work.tag}
          </span>
          <p className="text-sm font-semibold text-white mt-2 leading-tight">{work.title}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-white/60">Visit →</span>
        </div>
      </div>

      {/* Shadow lift */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300 pointer-events-none" />
    </motion.a>
  );
}

export function WorksSection() {
  const t = useTranslations("works");

  return (
    <section id="works" className="w-full py-24 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
              {t("badge")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
            <p className="text-sm text-white/50 mt-2">{t("hint")}</p>
          </div>
          <Link
            href="/works"
            className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block"
          >
            See all →
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
