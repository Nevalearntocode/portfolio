"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SceneBadgeProps {
  label: string;
}

export function SceneBadge({ label }: SceneBadgeProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={label}
        className="ar-scene-badge"
        initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
        animate={{ opacity: 0.08, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          animate={{
            y: [0, 8, 0],
            rotate: [0, 1, 0],
          }}
          transition={{
            y: { duration: 8.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            rotate: { duration: 9.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          }}
        >
          {label}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}
