"use client";

import { useState, useCallback, useEffect } from "react";

const mod = (n: number, m: number) => ((n % m) + m) % m;
import { motion, AnimatePresence } from "framer-motion";
import { RoomFrame } from "./RoomFrame";
import { BackExit } from "./BackExit";
import { SceneBadge } from "./SceneBadge";
import { FogLayer } from "./FogLayer";
import { TraceLayer } from "./TraceLayer";
import { DeckStage } from "./DeckStage";
import { BottomNav } from "./BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGyroTilt } from "./useGyroTilt";
import type { AboutCategory, CategoryId } from "@/types/about-room";

interface AboutRoomProps {
  categories: AboutCategory[];
}

export function AboutRoom({ categories }: AboutRoomProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>(
    categories[0].id
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const gyroTilt = useGyroTilt();

  const activeCategory = categories.find((c) => c.id === activeCategoryId)!;

  const handleCategoryChange = useCallback(
    (id: CategoryId) => {
      if (id === activeCategoryId) return;
      setActiveCategoryId(id);
      setActiveIndex(0);
    },
    [activeCategoryId]
  );

  const handleIndexChange = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const n = activeCategory.items.length;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => mod(i - 1, n));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((i) => mod(i + 1, n));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCategory.items.length]);

  return (
    <RoomFrame>
      {/* Atmospheric layers — desktop only */}
      {!isMobile && <FogLayer />}
      {!isMobile && <TraceLayer />}

      {/* Back exit */}
      <BackExit />

      {/* Decorative scene badge — desktop only */}
      {!isMobile && <SceneBadge label={activeCategory.label} />}

      {/* Main deck stage — vertically centered between back arrow and nav */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 80,
          paddingBottom: 140,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            className="ar-deck-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{
              duration: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DeckStage
              category={activeCategory}
              activeIndex={activeIndex}
              onIndexChange={handleIndexChange}
              isMobile={isMobile}
              gyroTilt={gyroTilt}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        activeIndex={activeIndex}
        onCategoryChange={handleCategoryChange}
        onIndexChange={handleIndexChange}
      />
    </RoomFrame>
  );
}
