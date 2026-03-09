"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useSpring } from "framer-motion";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import type { AboutItem, CategoryId } from "@/types/about-room";
import type { IdleOffset } from "./useDeckMotion";

interface DeckCardProps {
  item: AboutItem;
  categoryId: CategoryId;
  isActive: boolean;
  idleOffset: IdleOffset;
  scale?: number;
  opacity?: number;
  baseY?: number; // static vertical offset in px (e.g. -8 for active)
  style?: React.CSSProperties;
  onActivate?: () => void;
  gyroTilt?: { rotateX: number; rotateY: number };
}

export function DeckCard({
  item,
  categoryId,
  isActive,
  idleOffset,
  scale = 1,
  opacity = 1,
  baseY = 0,
  style,
  onActivate,
  gyroTilt,
}: DeckCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltX = useSpring(0, { stiffness: 180, damping: 28 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    tiltX.set(-dy * 6);
    tiltY.set(dx * 6);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive && onActivate) {
      onActivate();
    } else {
      setIsFlipped((f) => !f);
    }
  };

  // Generate a unique keyframe name for this card's idle float
  const keyframeName = useMemo(
    () => `ar-float-${item.id}`,
    [item.id]
  );

  const activeTiltX = gyroTilt ? gyroTilt.rotateX : tiltX;
  const activeTiltY = gyroTilt ? gyroTilt.rotateY : tiltY;

  // CSS keyframe animation runs on the compositor thread — much smoother than
  // Framer Motion's JS-driven keyframe arrays with repeat: Infinity.
  const floatKeyframes = `
    @keyframes ${keyframeName} {
      0%   { transform: translateY(${baseY + idleOffset.translateY * -1}px) rotate(${idleOffset.rotateZ * -1}deg); }
      100% { transform: translateY(${baseY + idleOffset.translateY}px) rotate(${idleOffset.rotateZ}deg); }
    }
  `;

  const floatStyle: React.CSSProperties = isHovered
    ? {
      transform: `translateY(${baseY}px) rotate(0deg)`,
      transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      animation: "none",
    }
    : {
      animation: `${keyframeName} ${idleOffset.duration}s ease-in-out ${idleOffset.delay}s infinite alternate`,
      willChange: "transform",
    };

  return (
    <>
      <style>{floatKeyframes}</style>
      <div
        ref={cardRef}
        className="ar-card"
        style={{
          scale,
          opacity,
          ...floatStyle,
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`${item.title} — click to ${isFlipped ? "see cover" : "see details"}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        {/* Tilt wrapper */}
        <motion.div
          style={{
            rotateX: activeTiltX,
            rotateY: activeTiltY,
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            position: "relative",
            willChange: "transform",
          }}
        >
          {/* Flip wrapper */}
          <motion.div
            className="ar-card-flipper"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardFront item={item} />
            <CardBack item={item} categoryId={categoryId} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
