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

function ProjectMiniCard({ project }: { project: ActiveProject }) {
  const t = useTranslations("workingOn");

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] overflow-hidden">
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
              <ZaloIcon className="opacity-40 hover:opacity-70" />
            </a>
          )}
        </div>

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
    <TiltCard className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-1">
          {t("badge")}
        </p>
        <p className="text-lg font-semibold text-[#111] dark:text-white">{t("title")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeProjects.map((project) => (
          <ProjectMiniCard key={project.id} project={project} />
        ))}
      </div>
    </TiltCard>
  );
}
