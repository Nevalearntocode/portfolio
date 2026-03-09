"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TiltCard } from "./TiltCard";
import { owner } from "@/data/owner";

export function ContactCard() {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("contact");

  function handleCopy() {
    navigator.clipboard.writeText(owner.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <TiltCard id="contact" className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm px-5 py-4 flex flex-col gap-3">
      <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest">{t("badge")}</p>

      {/* Pill > icons > pill row */}
      <div className="flex items-center justify-between gap-2">
        {/* Email pill */}
        <button
          onClick={handleCopy}
          aria-label={t("email_label")}
          className="flex-1 min-w-0 text-xs px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-[#111]/70 dark:text-white/70 hover:text-[#111] dark:hover:text-white truncate transition-colors text-left"
        >
          {copied ? "✓ " + t("copied") : owner.email}
        </button>

        {/* Social icons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={owner.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#111]/40 dark:text-white/40 hover:text-[#a3b899] dark:hover:text-[#a3b899] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href={owner.socials.zalo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zalo"
            className="hover:opacity-70 transition-opacity"
          >
            <Image src="/zalo.svg" alt="Zalo" width={20} height={7} className="dark:invert" />
          </a>
        </div>

        {/* Phone pill */}
        <a
          href={`tel:${owner.phone}`}
          aria-label={t("phone_label")}
          className="flex-1 min-w-0 text-xs px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-[#111]/70 dark:text-white/70 hover:text-[#111] dark:hover:text-white truncate transition-colors text-right"
        >
          {owner.phone}
        </a>
      </div>

      <a
        href={`mailto:${owner.email}`}
        className="w-full text-center text-sm font-medium py-2 rounded-xl bg-[#a3b899] text-white hover:bg-[#7a9470] transition-colors"
      >
        {t("title")} →
      </a>
    </TiltCard>
  );
}
