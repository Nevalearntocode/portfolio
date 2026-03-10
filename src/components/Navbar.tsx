"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

const pillShimmerVariants = {
  rest: { x: "-150%" },
  hover: { x: "250%", transition: { duration: 0.6, ease: "easeOut" as const } },
};

function useActiveUsers() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/active-users");
        const data = await res.json();
        setCount(data.activeUsers ?? 0);
      } catch {
        setCount(0);
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const activeUsers = useActiveUsers();

  const isHome = pathname === "/";
  const isWorks = pathname === "/works";

  const motionProps = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" } as Transition,
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 whitespace-nowrap">
      <motion.nav
        {...motionProps}
        whileHover="hover"
        className="relative flex items-center gap-5 px-5 py-2.5 rounded-full bg-white/70 dark:bg-[#111]/80 backdrop-blur-md border border-black/8 dark:border-white/8 shadow-sm overflow-hidden"
      >
        {/* Pill shimmer */}
        <motion.div
          variants={pillShimmerVariants}
          initial="rest"
          className="absolute inset-y-0 w-1/2 pointer-events-none z-0"
          style={{
            background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          }}
        />

        {activeUsers >= 2 && (
          <span className="relative z-10 w-2 h-2 rounded-full bg-[#a3b899] shrink-0 animate-pulse" />
        )}

        {/* Home link */}
        <span className="relative z-10 flex items-center gap-1.5">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              isHome
                ? "text-[#111] dark:text-white font-semibold"
                : "text-[#111]/60 dark:text-white/60 hover:text-[#111] dark:hover:text-white"
            }`}
          >
            {t("home")}
          </Link>
          {isHome && <span className="w-1 h-1 rounded-full bg-[#a3b899]" />}
        </span>

        {/* Works link */}
        <span className="relative z-10 flex items-center gap-1.5">
          <Link
            href="/works"
            className={`text-sm transition-colors ${
              isWorks
                ? "text-[#111] dark:text-white font-semibold"
                : "text-[#111]/60 dark:text-white/60 hover:text-[#111] dark:hover:text-white"
            }`}
          >
            {t("works")}
          </Link>
          {isWorks && <span className="w-1 h-1 rounded-full bg-[#a3b899]" />}
        </span>

        <span className="relative z-10">
          <ThemeToggle />
        </span>
        <span className="relative z-10">
          <LanguageSwitcher />
        </span>
      </motion.nav>

      <motion.div {...motionProps}>
        <Link
          href="/about"
          className="flex items-center px-4 py-2.5 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#111] text-sm font-medium shadow-sm backdrop-blur-md hover:opacity-90 transition-opacity"
        >
          {t("about")}
        </Link>
      </motion.div>
    </div>
  );
}
