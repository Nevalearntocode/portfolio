"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Facebook, Instagram } from "lucide-react";
import { activeProjects, type ActiveProject } from "@/data/active-projects";
import { useMessengerUrl } from "@/hooks/use-mobile";

const PHASES: ActiveProject["phase"][] = ["design", "integration", "review", "finishing", "completed"];

const PHASE_PROGRESS: Record<ActiveProject["phase"], number> = {
  design: 15,
  integration: 42,
  review: 68,
  finishing: 88,
  completed: 100,
};

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

function ProjectCard({ project }: { project: ActiveProject }) {
  const t = useTranslations("workingOn");
  const progress = PHASE_PROGRESS[project.phase];

  return (
    <motion.div
      variants={cardVariants}
      className="glass-panel flex flex-col gap-3 rounded-xl border border-white/5 overflow-hidden"
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
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-white leading-snug">{project.clientName}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#ccc3d9]">{project.clientCategory}</span>
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

        <div className="mt-1">
          <div className="relative h-1.5 bg-[#353535] rounded-full overflow-hidden mb-2">
            <div
              className="absolute inset-y-0 left-0 bg-[#7b39fc] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-[#4a4456] uppercase tracking-widest font-bold">
            {PHASES.map((phase) => (
              <span key={phase} className={project.phase === phase ? "text-[#d0bcff]" : ""}>
                {t(`phase.${phase}`)}
              </span>
            ))}
          </div>
        </div>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#d0bcff] hover:text-white transition-colors mt-0.5"
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
  const messengerUrl = useMessengerUrl();

  return (
    <section className="w-full py-24 px-6 sm:px-10 bg-[#131313] border-y border-white/5">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 items-start">

        {/* Left sidebar */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b39fc]/20 text-[#d0bcff] text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7b39fc] animate-pulse" />
              {t("badge").toUpperCase()}
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{t("title")}</h2>
            <p className="text-[#ccc3d9] text-sm leading-relaxed">
              Transparent progress on active client projects. See what I&apos;m working on right now.
            </p>
          </motion.div>
        </div>

        {/* Right: cards grid */}
        <div className="md:w-2/3 w-full">
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

            {/* Open slot CTA */}
            <motion.a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="bg-[#7b39fc] p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-2xl shadow-[#7b39fc]/20 group cursor-pointer hover:bg-[#6d2fe0] transition-colors border border-[#7b39fc]/50"
            >
              <span className="text-3xl text-white mb-3 group-hover:scale-110 transition-transform block">+</span>
              <h4 className="text-base font-bold text-white mb-1">{t("openSlot.label")}</h4>
              <p className="text-white/70 text-xs mb-4">{t("openSlot.sub")}</p>
              <span className="bg-white text-[#7b39fc] px-5 py-1.5 rounded-full text-xs font-bold">
                Start Today
              </span>
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
