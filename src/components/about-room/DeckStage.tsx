"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { DeckCard } from "./DeckCard";
import { useIdleOffsets } from "./useDeckMotion";
import type { AboutCategory, CategoryId } from "@/types/about-room";
import type { GyroTilt } from "./useGyroTilt";

const mod = (n: number, m: number) => ((n % m) + m) % m;

interface DeckStageProps {
  category: AboutCategory;
  activeIndex: number;
  onIndexChange: (i: number) => void;
  isMobile: boolean;
  gyroTilt?: GyroTilt;
}

export function DeckStage({
  category,
  activeIndex,
  onIndexChange,
  isMobile,
  gyroTilt,
}: DeckStageProps) {
  const items = category.items;
  const idleOffsets = useIdleOffsets(items.length);

  if (isMobile) {
    return (
      <MobileCarousel
        category={category}
        activeIndex={activeIndex}
        onIndexChange={onIndexChange}
        idleOffsets={idleOffsets}
        gyroTilt={gyroTilt}
      />
    );
  }

  return (
    <SpreadLayout
      category={category}
      activeIndex={activeIndex}
      onIndexChange={onIndexChange}
      idleOffsets={idleOffsets}
    />
  );
}

// ── Spread (all counts, windowed to 5 visible) ────────────────────────────────

const VISIBLE = 5;

interface LayoutProps {
  category: AboutCategory;
  activeIndex: number;
  onIndexChange: (i: number) => void;
  idleOffsets: ReturnType<typeof useIdleOffsets>;
  gyroTilt?: GyroTilt;
}

function SpreadLayout({ category, activeIndex, onIndexChange, idleOffsets }: LayoutProps) {
  const items = category.items;
  const n = items.length;

  // Modular window — keeps activeIndex centered and wraps at edges
  const visibleCount = Math.min(VISIBLE, n);
  const halfV = Math.floor(visibleCount / 2);
  const windowSlots = Array.from({ length: visibleCount }, (_, wi) =>
    mod(activeIndex - halfV + wi, n)
  );

  const handlePanEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const THRESHOLD = 50;
    const VELOCITY_THRESHOLD = 300;
    const vx = info.velocity.x;
    const ox = info.offset.x;

    if (ox < -THRESHOLD || vx < -VELOCITY_THRESHOLD) {
      const steps = Math.min(Math.ceil(Math.abs(vx) / 600), 3);
      for (let s = 1; s <= steps; s++) {
        setTimeout(() => onIndexChange(mod(activeIndex + s, n)), (s - 1) * 120);
      }
    } else if (ox > THRESHOLD || vx > VELOCITY_THRESHOLD) {
      const steps = Math.min(Math.ceil(Math.abs(vx) / 600), 3);
      for (let s = 1; s <= steps; s++) {
        setTimeout(() => onIndexChange(mod(activeIndex - s, n)), (s - 1) * 120);
      }
    }
  };

  return (
    <motion.div
      className="ar-spread"
      onPanEnd={handlePanEnd}
    >
      <AnimatePresence initial={false}>
        {windowSlots.map((slot) => {
          const item = items[slot];
          return (
            <motion.div
              key={`${category.id}-${item.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <DeckCard
                item={item}
                categoryId={category.id as CategoryId}
                isActive={slot === activeIndex}
                idleOffset={idleOffsets[slot]}
                baseY={slot === activeIndex ? -8 : 0}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Mobile Carousel ───────────────────────────────────────────────────────────

interface MobileCarouselProps {
  category: AboutCategory;
  activeIndex: number;
  onIndexChange: (i: number) => void;
  idleOffsets: ReturnType<typeof useIdleOffsets>;
  gyroTilt?: GyroTilt;
}

function MobileCarousel({
  category,
  activeIndex,
  onIndexChange,
  idleOffsets,
  gyroTilt,
}: MobileCarouselProps) {
  const items = category.items;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  // Track whether the current activeIndex change came from Embla (to avoid circular scrollTo)
  const fromEmbla = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      fromEmbla.current = true;
      onIndexChange(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onIndexChange]);

  useEffect(() => {
    if (!emblaApi) return;
    if (fromEmbla.current) {
      fromEmbla.current = false;
      return;
    }
    if (emblaApi.selectedScrollSnap() !== activeIndex) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [activeIndex, emblaApi]);

  return (
    <div ref={emblaRef} style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        {items.map((item, i) => (
          <div
            key={`${category.id}-${item.id}`}
            style={{
              flex: "0 0 100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
            }}
          >
            <DeckCard
              item={item}
              categoryId={category.id as CategoryId}
              isActive={i === activeIndex}
              idleOffset={idleOffsets[i]}
              gyroTilt={gyroTilt?.available ? gyroTilt : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
