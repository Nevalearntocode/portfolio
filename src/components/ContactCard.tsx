"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { owner } from "@/data/owner";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function ContactCard() {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("contact");
  const messengerUrl = useMessengerUrl();

  function handleCopy() {
    navigator.clipboard.writeText(owner.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <TiltCard id="contact" className="rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/4 backdrop-blur-sm px-5 py-4 flex flex-col gap-3">
      <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest">{t("badge")}</p>
      <p className="text-lg font-semibold text-[#111] dark:text-white">{t("title")}</p>

      {/* Email row */}
      <button
        onClick={handleCopy}
        aria-label={t("email_label")}
        className="flex items-center gap-2 text-sm text-[#111]/70 dark:text-white/70 hover:text-[#111] dark:hover:text-white transition-colors text-left"
      >
        <Mail size={14} className="shrink-0 text-[#111]/40 dark:text-white/40" />
        <span>{copied ? "✓ " + t("copied") : owner.email}</span>
      </button>

      {/* Social row */}
      <div className="flex items-center gap-3">
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
          href={owner.socials.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-[#111]/40 dark:text-white/40 hover:text-[#a3b899] dark:hover:text-[#a3b899] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
          </svg>
        </a>
        <a
          href={owner.socials.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zalo"
          className="hover:opacity-70 transition-opacity"
        >
          <Image src="/zalo.svg" alt="Zalo" width={20} height={7} className="dark:brightness-0 dark:invert" />
        </a>
      </div>

      {/* Phone row */}
      <a
        href={`tel:${owner.phone}`}
        aria-label={t("phone_label")}
        className="flex items-center gap-2 text-sm text-[#111]/70 dark:text-white/70 hover:text-[#111] dark:hover:text-white transition-colors"
      >
        <Phone size={14} className="shrink-0 text-[#111]/40 dark:text-white/40" />
        <span>{owner.phone}</span>
      </a>

      {/* CTA button */}
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 w-full text-center text-sm font-medium py-2 rounded-xl bg-[#a3b899] text-white hover:bg-[#7a9470] transition-colors"
      >
        {t("title")} →
      </a>
    </TiltCard>
  );
}
