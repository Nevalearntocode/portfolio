"use client";

import type { AboutItem, CategoryId } from "@/types/about-room";

interface CardBackProps {
  item: AboutItem;
  categoryId: CategoryId;
}

export function CardBack({ item, categoryId }: CardBackProps) {
  return (
    <div className="ar-card-face ar-card-back" style={{ position: "absolute", inset: 0 }}>
      {categoryId === "games" && <GamesBack item={item} />}
      {categoryId === "creators" && <CreatorsBack item={item} />}
      {categoryId === "food" && <FoodBack item={item} />}
      {categoryId === "work" && <WorkBack item={item} />}
    </div>
  );
}

function GamesBack({ item }: { item: AboutItem }) {
  return (
    <>
      <div className="ar-card-title">{item.title}</div>
      {item.rating && <div className="ar-card-rating">{item.rating}</div>}
      <div className="ar-card-tags">
        {item.tags.map((t) => (
          <span key={t} className="ar-card-tag">{t}</span>
        ))}
      </div>
      {item.meta && (
        <div className="ar-card-meta-line">
          {item.meta.playMode && <span>PLAY MODE · {item.meta.playMode}</span>}
          {item.meta.era && <span style={{ marginLeft: 8 }}>ERA · {item.meta.era}</span>}
        </div>
      )}
      <div className="ar-card-note">{item.note}</div>
    </>
  );
}

function CreatorsBack({ item }: { item: AboutItem }) {
  return (
    <>
      <div className="ar-card-title">{item.title}</div>
      {item.meta && (
        <div className="ar-card-meta-line">
          {item.meta.format && item.meta.energy
            ? `${item.meta.format} · ${item.meta.energy}`
            : item.meta.format ?? item.meta.energy}
        </div>
      )}
      <div className="ar-card-tags">
        {item.tags.map((t) => (
          <span key={t} className="ar-card-tag">{t}</span>
        ))}
      </div>
      {item.rating && (
        <div className="ar-card-meta-line" style={{ marginTop: "auto" }}>
          {item.rating}
        </div>
      )}
      <div className="ar-card-note">{item.note}</div>
    </>
  );
}

function FoodBack({ item }: { item: AboutItem }) {
  return (
    <>
      <div className="ar-card-title">{item.title}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        {item.rating && <div className="ar-card-rating">{item.rating}</div>}
        {item.meta?.craving && (
          <div className="ar-card-meta-line">{item.meta.craving}</div>
        )}
      </div>
      <div className="ar-card-tags">
        {item.tags.map((t) => (
          <span key={t} className="ar-card-tag">{t}</span>
        ))}
      </div>
      <div className="ar-card-note">{item.note}</div>
      {item.meta?.context && (
        <div className="ar-card-footer">{item.meta.context}</div>
      )}
    </>
  );
}

function WorkBack({ item }: { item: AboutItem }) {
  return (
    <>
      <div className="ar-card-title">{item.title}</div>
      {item.meta && (
        <div className="ar-card-meta-line" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {item.meta.mode && <span>MODE · {item.meta.mode}</span>}
          {item.meta.reason && (
            <span
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              WHY · {item.meta.reason}
            </span>
          )}
        </div>
      )}
      <div className="ar-card-tags">
        {item.tags.map((t) => (
          <span key={t} className="ar-card-tag">{t}</span>
        ))}
      </div>
      {item.rating && <div className="ar-card-rating">{item.rating}</div>}
      <div className="ar-card-note">{item.note}</div>
    </>
  );
}
