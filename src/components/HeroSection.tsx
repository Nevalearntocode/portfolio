"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMessengerUrl } from "@/hooks/use-mobile";
import { useRouter } from "@/i18n/navigation";

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 + i * 0.13 },
  }),
};

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay },
});

const SCATTER = [
  { top: "12%", left: "52%", text: "0xf3a1",      dur: 5.2, delay: 0.0  },
  { top: "18%", left: "68%", text: "→ 443",        dur: 4.1, delay: 1.3  },
  { top: "26%", left: "44%", text: "01001101",     dur: 6.8, delay: 0.7  },
  { top: "32%", left: "74%", text: "node_14",      dur: 4.5, delay: 3.1  },
  { top: "38%", left: "56%", text: "—ε: 2.4e-8",  dur: 7.2, delay: 2.0  },
  { top: "44%", left: "40%", text: "0x1a2b",       dur: 5.0, delay: 4.4  },
  { top: "50%", left: "78%", text: "req: 200",     dur: 3.8, delay: 1.8  },
  { top: "56%", left: "48%", text: "lat: 1.2ms",   dur: 6.1, delay: 0.4  },
  { top: "62%", left: "64%", text: "sig: 0xfe",    dur: 4.9, delay: 3.7  },
  { top: "68%", left: "42%", text: "TTL: 64",      dur: 5.5, delay: 2.6  },
  { top: "22%", left: "60%", text: "buf[128]",     dur: 7.0, delay: 5.1  },
  { top: "74%", left: "70%", text: "pid: 3821",    dur: 4.3, delay: 1.1  },
  { top: "15%", left: "80%", text: "sync ↑",       dur: 5.8, delay: 3.9  },
  { top: "48%", left: "82%", text: "ack: 0xff",    dur: 6.4, delay: 0.9  },
  { top: "58%", left: "36%", text: "∇: 3.7e-4",   dur: 3.6, delay: 4.8  },
];

const CROSSES = [
  { top: "17%", left: "50%" },
  { top: "30%", left: "65%" },
  { top: "55%", left: "44%" },
  { top: "72%", left: "60%" },
];

const METRICS = [
  { val: "700k", unit: "+", label: "Social reach" },
  { val: "8", unit: " days", label: "Avg. delivery" },
  { val: "6", unit: "+", label: "Sites launched" },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const messengerUrl = useMessengerUrl();
  const router = useRouter();

  const headlineLines = [t("heading1"), t("heading_italic")];

  return (
    <section
      className="relative w-full overflow-hidden min-h-[88svh] md:min-h-[100svh]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,57,252,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(123,57,252,0.09) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient purple glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          left: "-15%",
          width: "65%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(123,57,252,0.11) 0%, transparent 70%)",
        }}
      />

      {/* Watermark glyph - desktop only */}
      <div
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(120px, 14vw, 200px)",
          fontWeight: 700,
          color: "rgba(123,57,252,0.04)",
          lineHeight: 1,
          right: "260px",
          bottom: "60px",
          letterSpacing: "-0.06em",
        }}
      >
        v1
      </div>

      {/* Accent line - left edge */}
      <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: "#7b39fc" }} />

      {/* Corner TL */}
      <div
        className="absolute"
        style={{
          top: 28,
          left: 36,
          width: 20,
          height: 20,
          borderTop: "1px solid #7b39fc",
          borderLeft: "1px solid #7b39fc",
        }}
      />

      {/* Corner BR */}
      <div
        className="absolute"
        style={{
          bottom: 28,
          right: 28,
          width: 20,
          height: 20,
          borderBottom: "1px solid rgba(123,57,252,0.3)",
          borderRight: "1px solid rgba(123,57,252,0.3)",
        }}
      />

      {/* Scatter text - desktop only */}
      {SCATTER.map((s) => (
        <motion.div
          key={s.text}
          className="absolute pointer-events-none select-none hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.55, 0] }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.dur * 0.6,
            times: [0, 0.25, 0.75, 1],
            ease: "easeInOut",
          }}
          style={{
            top: s.top,
            left: s.left,
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "rgba(123,57,252,1)",
            letterSpacing: "0.06em",
          }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* Cross markers - desktop only */}
      {CROSSES.map((c, i) => (
        <div
          key={i}
          className="absolute pointer-events-none hidden md:block"
          style={{ top: c.top, left: c.left }}
        >
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 0.5,
              top: 0,
              left: -4,
              background: "rgba(123,57,252,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 0.5,
              height: 8,
              top: -4,
              left: 0,
              background: "rgba(123,57,252,0.2)",
            }}
          />
        </div>
      ))}

      {/* Eyebrow */}
      <div
        className="absolute hidden md:flex items-center gap-2"
        style={{
          top: 40,
          left: 72,
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "#7b39fc",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span
          className="inline-block rounded-full shrink-0"
          style={{
            width: 5,
            height: 5,
            background: "#7b39fc",
            animation: "pulse-dot 2s infinite",
          }}
        />
        Available for new projects &middot; 2026
      </div>

      {/* Main layout: content + right panel */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-screen-xl flex">
        {/* Left content */}
        <div
          className="flex-1 flex flex-col justify-center"
          style={{ paddingLeft: 52, paddingRight: 24, paddingTop: 80, paddingBottom: 64 }}
        >
          {/* Headline - clip reveal */}
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(36px, 5.5vw, 62px)",
              fontWeight: 700,
              lineHeight: 1.0,
              color: "#f0e6ff",
              margin: 0,
              letterSpacing: "-0.03em",
              maxWidth: 520,
            }}
          >
            {headlineLines.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  className="block"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  style={i === 1 ? { color: "#7b39fc" } : undefined}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Subline */}
          <motion.p
            {...fadeIn(0.6)}
            style={{
              marginTop: 18,
              fontSize: 11,
              lineHeight: 1.9,
              color: "#ccc3d9",
              letterSpacing: "0.03em",
              maxWidth: 340,
              fontFamily: "var(--font-sans)",
            }}
          >
            {t("body")}
          </motion.p>

          {/* Proof chips */}
          <motion.div
            {...fadeIn(0.78)}
            className="flex flex-wrap gap-2"
            style={{ marginTop: 24 }}
          >
            {([t("chip1"), t("chip2"), t("chip3")] as const).map((chip, i) => (
              <span
                key={chip}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "5px 10px",
                  border:
                    i < 2
                      ? "0.5px solid rgba(123,57,252,0.35)"
                      : "0.5px solid rgba(238,234,248,0.1)",
                  color:
                    i < 2
                      ? "rgba(123,57,252,0.8)"
                      : "rgba(238,234,248,0.25)",
                  background: i < 2 ? "rgba(123,57,252,0.08)" : "transparent",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeIn(0.92)}
            className="flex flex-wrap items-center gap-4"
            style={{ marginTop: 32 }}
          >
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-85"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: "#7b39fc",
                color: "#0e0e0e",
                padding: "12px 24px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {t("cta_primary")}
            </a>
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="transition-all hover:border-[#7b39fc] hover:text-white"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "transparent",
                border: "0.5px solid rgba(123,57,252,0.3)",
                color: "rgba(238,234,248,0.45)",
                padding: "12px 24px",
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {t("cta_secondary")}
            </a>
          </motion.div>
        </div>

        {/* Right panel - desktop only */}
        <div
          className="hidden md:flex flex-col justify-center"
          style={{
            width: 240,
            borderLeft: "0.5px solid rgba(123,57,252,0.15)",
            padding: "28px 24px",
          }}
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.14, duration: 0.5 }}
              style={{
                padding: "20px 0",
                borderBottom:
                  i < METRICS.length - 1
                    ? "0.5px solid rgba(123,57,252,0.1)"
                    : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#f0e6ff",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {m.val}
                <span style={{ color: "#7b39fc", fontSize: 18 }}>{m.unit}</span>
              </p>
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(238,234,248,0.28)",
                  marginTop: 5,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Sequence number */}
      <div
        className="absolute hidden md:block"
        style={{
          bottom: 80,
          left: 52,
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "rgba(123,57,252,0.5)",
          fontFamily: "var(--font-mono)",
          zIndex: 3,
        }}
      >
        001 / 006
      </div>

      {/* Bottom bar - desktop only */}
      <div
        className="absolute left-0 hidden md:flex items-center gap-8"
        style={{
          bottom: 28,
          right: 240,
          height: 40,
          borderTop: "0.5px solid rgba(123,57,252,0.2)",
          paddingLeft: 52,
          paddingRight: 24,
          zIndex: 3,
        }}
      >
        {(["Overview", "Works", "Pricing", "Contact"] as const).map((item, i) => (
          <span
            key={item}
            onClick={() => {
              if (item === "Overview") window.scrollTo({ top: 0, behavior: "smooth" });
              else if (item === "Contact") router.push("/contact");
              else document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: i === 0 ? "#7b39fc" : "rgba(238,234,248,0.35)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Bottom fade — kills grid + purple tint before the seam */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "30%",
          background: "linear-gradient(to bottom, transparent, #0e0e0e)",
          zIndex: 2,
        }}
      />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
