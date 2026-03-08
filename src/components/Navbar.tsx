"use client";

import { motion } from "framer-motion";

export function Navbar() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-sm whitespace-nowrap"
    >
      <span className="w-2 h-2 rounded-full bg-[#a3b899] shrink-0" />
      <button
        onClick={() => scrollTo("works")}
        className="text-sm text-[#111]/60 hover:text-[#111] transition-colors"
      >
        Dự án
      </button>
      <button
        onClick={() => scrollTo("about")}
        className="text-sm text-[#111]/60 hover:text-[#111] transition-colors"
      >
        Về tôi
      </button>
      <button
        onClick={() => scrollTo("contact")}
        className="text-sm font-medium px-3 py-1 rounded-full bg-[#111] text-white hover:bg-[#333] transition-colors"
      >
        Liên hệ
      </button>
    </motion.nav>
  );
}
