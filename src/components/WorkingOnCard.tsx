"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Facebook, Instagram } from "lucide-react";
import { TiltCard } from "./TiltCard";
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

function ProjectMiniCard({ project }: { project: ActiveProject }) {
  const t = useTranslations("workingOn");

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/6 dark:border-white/6 bg-black/2 dark:bg-white/3 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.clientName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-3 pb-3">
        <p className="text-sm font-semibold text-[#111] dark:text-white leading-snug">
          {project.clientName}
        </p>

        {/* Category + socials */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#111]/50 dark:text-white/50">{project.clientCategory}</span>
          {project.clientSocials?.facebook && (
            <a
              href={project.clientSocials.facebook}
              className="text-[#111]/40 hover:text-[#111]/70 dark:text-white/40 dark:hover:text-white/70 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={13} />
            </a>
          )}
          {project.clientSocials?.instagram && (
            <a
              href={project.clientSocials.instagram}
              className="text-[#111]/40 hover:text-[#111]/70 dark:text-white/40 dark:hover:text-white/70 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={13} />
            </a>
          )}
          {project.clientSocials?.zalo && (
            <a
              href={project.clientSocials.zalo}
              className="text-[#111]/40 hover:text-[#111]/70 dark:text-white/40 dark:hover:text-white/70 transition-colors"
              aria-label="Zalo"
            >
              <ZaloIcon className="opacity-40 hover:opacity-70 dark:brightness-0 dark:invert" />
            </a>
          )}
          {project.clientSocials?.tiktok && (
            <a
              href={project.clientSocials.tiktok}
              className="text-[#111]/40 hover:text-[#111]/70 dark:text-white/40 dark:hover:text-white/70 transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          )}
        </div>

        {/* Credibility */}
        {project.credibility && (
          <p className="text-[10px] text-[#111]/40 dark:text-white/40 leading-snug">
            {project.credibility}
          </p>
        )}

        {/* Phase pills */}
        <div className="flex items-center gap-1 flex-wrap">
          {PHASES.map((phase) => (
            <span
              key={phase}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                project.phase === phase
                  ? "bg-[#a3b899] text-white"
                  : "bg-black/5 dark:bg-white/5 text-[#111]/40 dark:text-white/40"
              }`}
            >
              {t(`phase.${phase}`)}
            </span>
          ))}
        </div>

        {/* Demo link */}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#a3b899] hover:text-[#5a7a55] transition-colors mt-0.5"
          >
            {t("demo")}
          </a>
        )}
      </div>
    </div>
  );
}

export function WorkingOnCard() {
  const t = useTranslations("workingOn");

  return (
    <TiltCard className="rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/4 backdrop-blur-sm p-6 flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-1">
          {t("badge")}
        </p>
        <p className="text-xl font-semibold text-[#111] dark:text-white">{t("title")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4">
        {activeProjects.map((project) => (
          <ProjectMiniCard key={project.id} project={project} />
        ))}
        {/* Open slot */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/8 dark:border-white/8 aspect-4/3 text-center px-4">
          <p className="text-xs font-semibold text-[#a3b899]">{t("openSlot.label")}</p>
          <p className="text-[11px] text-[#111]/40 dark:text-white/40">{t("openSlot.sub")}</p>
        </div>
      </div>
    </TiltCard>
  );
}
