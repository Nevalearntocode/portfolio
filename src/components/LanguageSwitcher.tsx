"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "en" ? "vi" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={switchLocale}
      className="text-xs text-[#111]/60 dark:text-white/60 hover:text-[#111] dark:hover:text-white transition-colors font-medium tracking-wide"
    >
      <span className={locale === "en" ? "text-[#111] dark:text-white" : "text-[#111]/40 dark:text-white/40"}>EN</span>
      <span className="mx-1 text-[#111]/30 dark:text-white/30">|</span>
      <span className={locale === "vi" ? "text-[#111] dark:text-white" : "text-[#111]/40 dark:text-white/40"}>VI</span>
    </button>
  );
}
