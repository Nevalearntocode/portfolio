"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Facebook, Instagram } from "lucide-react";
import { activeProjects, type ActiveProject } from "@/data/active-projects";

const PHASES: ActiveProject["phase"][] = ["design", "integration", "review", "finishing"];

function ZaloIcon({ className }: { className?: string }) {
  return (
    <Image src="/zalo.svg" alt="Zalo" width={16} height={16} className={className} unoptimized />
  );
}

function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const pillContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
};

function ProjectCard({ project }: { project: ActiveProject }) {
  const t = useTranslations("workingOn");

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.clientName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4">
        <p className="text-sm font-semibold text-white leading-snug">{project.clientName}</p>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">{project.clientCategory}</span>
          {project.clientSocials?.facebook && (
            <a href={project.clientSocials.facebook} className="text-white/30 hover:text-white/60 transition-colors" aria-label="Facebook">
              <Facebook size={12} />
            </a>
          )}
          {project.clientSocials?.instagram && (
            <a href={project.clientSocials.instagram} className="text-white/30 hover:text-white/60 transition-colors" aria-label="Instagram">
              <Instagram size={12} />
            </a>
          )}
          {project.clientSocials?.zalo && (
            <a href={project.clientSocials.zalo} className="text-white/30 hover:text-white/60 transition-colors" aria-label="Zalo">
              <ZaloIcon className="opacity-30 hover:opacity-60 brightness-0 invert" />
            </a>
          )}
          {project.clientSocials?.tiktok && (
            <a href={project.clientSocials.tiktok} className="text-white/30 hover:text-white/60 transition-colors" aria-label="TikTok">
              <TikTokIcon />
            </a>
          )}
        </div>

        {project.credibility && (
          <p className="text-[11px] text-white/30 leading-snug">{project.credibility}</p>
        )}

        <motion.div
          variants={pillContainerVariants}
          className="flex items-center gap-1 flex-wrap"
        >
          {PHASES.map((phase) => (
            <motion.span
              key={phase}
              variants={pillVariants}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                project.phase === phase
                  ? "bg-[#a3b899] text-white"
                  : "bg-white/5 text-white/30"
              }`}
            >
              {t(`phase.${phase}`)}
            </motion.span>
          ))}
        </motion.div>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#a3b899] hover:text-[#c5d4be] transition-colors mt-0.5"
          >
            {t("demo")}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function CurrentlyBuildingSection() {
  const t = useTranslations("workingOn");

  return (
    <section className="w-full py-24 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Open slot */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 aspect-[4/3] text-center px-6"
          >
            <p className="text-sm font-semibold text-[#a3b899]">{t("openSlot.label")}</p>
            <p className="text-xs text-white/40">{t("openSlot.sub")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
