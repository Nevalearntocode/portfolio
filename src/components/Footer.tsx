"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { owner } from "@/data/owner";

export function Footer() {
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/6 px-8 sm:px-12 py-6 text-white/40 text-xs">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {year} {owner.name}. {tFooter("rights")}</span>

        <span className="hidden sm:block">{tFooter("tagline")}</span>

        <div className="flex items-center gap-4">
          <a
            href={owner.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href={owner.socials.zalo}
            target="_blank"
            rel="noopener noreferrer"
            title="Zalo"
            className="hover:opacity-100 transition-opacity"
          >
            <Image src="/zalo.svg" alt="Zalo" width={28} height={10} className="brightness-0 invert opacity-40 hover:opacity-100 transition-opacity" />
          </a>
          <a
            href={owner.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            className="hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
