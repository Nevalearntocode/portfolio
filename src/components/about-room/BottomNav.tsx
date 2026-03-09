"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const mod = (n: number, m: number) => ((n % m) + m) % m;
import type { AboutCategory, CategoryId } from "@/types/about-room";

interface BottomNavProps {
  categories: AboutCategory[];
  activeCategoryId: CategoryId;
  activeIndex: number;
  onCategoryChange: (id: CategoryId) => void;
  onIndexChange: (i: number) => void;
}

export function BottomNav({
  categories,
  activeCategoryId,
  activeIndex,
  onCategoryChange,
  onIndexChange,
}: BottomNavProps) {
  const activeCategory = categories.find((c) => c.id === activeCategoryId)!;
  const itemCount = activeCategory.items.length;
  const accent = activeCategory.accent;

  const prev = () => onIndexChange(mod(activeIndex - 1, itemCount));
  const next = () => onIndexChange(mod(activeIndex + 1, itemCount));

  // Render dots — condense if > 8 items
  const renderDots = () => {
    if (itemCount <= 8) {
      return Array.from({ length: itemCount }, (_, i) => (
        <button
          key={i}
          className={`ar-nav-dot${i === activeIndex ? " ar-nav-dot--active" : ""}`}
          style={i === activeIndex ? { background: accent } : undefined}
          onClick={() => onIndexChange(i)}
          aria-label={`Go to item ${i + 1}`}
        />
      ));
    }

    // Condensed: first, prev, active, next, last
    const indices = Array.from(
      new Set([
        0,
        Math.max(0, activeIndex - 1),
        activeIndex,
        Math.min(itemCount - 1, activeIndex + 1),
        itemCount - 1,
      ])
    ).sort((a, b) => a - b);

    return indices.map((i) => (
      <button
        key={i}
        className={`ar-nav-dot${i === activeIndex ? " ar-nav-dot--active" : ""}`}
        style={i === activeIndex ? { background: accent } : undefined}
        onClick={() => onIndexChange(i)}
        aria-label={`Go to item ${i + 1}`}
      />
    ));
  };

  return (
    <nav className="ar-nav" aria-label="Room navigation">
      {/* Row 1: label · count | dots | arrows */}
      <div className="ar-nav-row">
        <span className="ar-nav-label" style={{ color: accent }}>
          {activeCategory.label} · {String(itemCount).padStart(2, "0")}
        </span>

        <div className="ar-nav-dots" role="group" aria-label="Card indicators">
          {renderDots()}
        </div>

        <div className="ar-nav-arrows">
          <button
            className="ar-nav-arrow"
            onClick={prev}
            aria-label="Previous card"
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
          </button>
          <button
            className="ar-nav-arrow"
            onClick={next}
            aria-label="Next card"
          >
            <ChevronRight size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Row 2: category switchers */}
      <div className="ar-nav-cats" role="group" aria-label="Category switchers">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`ar-nav-cat${cat.id === activeCategoryId ? " ar-nav-cat--active" : ""}`}
            style={
              cat.id === activeCategoryId
                ? { color: cat.accent, borderColor: `${cat.accent}40` }
                : undefined
            }
            onClick={() => onCategoryChange(cat.id)}
            aria-current={cat.id === activeCategoryId ? "true" : undefined}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
