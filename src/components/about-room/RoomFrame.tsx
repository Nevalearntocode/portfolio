"use client";

import { motion } from "framer-motion";

interface RoomFrameProps {
  children: React.ReactNode;
}

export function RoomFrame({ children }: RoomFrameProps) {
  return (
    <motion.div
      className="about-room ar-frame"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
