# Minh Tam Design System

**"Modern websites. Built to convert."**

A solo web-developer brand based in An Giang, Vietnam. Minh Tam designs and builds fast, bespoke websites for local Vietnamese businesses — storefronts, booking sites, case-study-backed industry pages — positioned against template-based agencies and platform-dependent selling (TikTok Shop, Shopee). Tagline lives and breathes that positioning: **built to convert**, not built to look busy.

The visual brand is an **editorial, dark-only, mono-forward** system. Think engineering readout meets Swiss editorial — deep charcoal backgrounds, a single neon-violet accent (`#7b39fc`), DM Sans for prose, DM Mono for metadata/eyebrows/scatter text, and Instrument Serif italic for punctuation moments. Scatter-text fragments (`0xf3a1`, `lat: 1.2ms`, `req: 200`) are sprinkled decoratively to evoke a live system under the hood.

---

## Sources

- **Codebase** — `portfolio/` (mounted locally, read-only). Next.js 16 + Tailwind 4 + shadcn `radix-nova` + Framer Motion + next-intl (en/vi). Entry: `src/app/[locale]/page.tsx`, tokens in `src/app/globals.css`, messages in `src/messages/en.json` & `vi.json`.
- **Strategy docs** — `portfolio/docs/Portfolio Overview.md`, `portfolio/content-strategy.md`, `portfolio/CLAUDE.md`.
- **Real client** — Cẩm Giang Shop (camgiangshop.com, 700k+ followers social).
- **Demo templates** — DUSK (F&B), Barber District, Thiệp Cưới Đình Toàn, TechStore, Vật Tư An Giang, The Curated Sanctuary.

---

## Index

| File | What's in it |
|------|--------------|
| `README.md` | This document — brand, content, visual, iconography |
| `colors_and_type.css` | All CSS variables — colors, fonts, radii, spacing, semantic styles |
| `SKILL.md` | Agent-invocable skill wrapper |
| `fonts/` | — (DM Sans, DM Mono, Instrument Serif all loaded via Google Fonts; see substitution note) |
| `assets/` | Logo, favicon, zalo glyph, OG image |
| `preview/` | Design-system preview cards (Type, Colors, Spacing, Components, Brand) |
| `ui_kits/portfolio/` | Recreation of the Minh Tam homepage — HeroSection, WorksSection, etc. |

---

## Content Fundamentals

**Voice — plainspoken, first person, conversational but sharp.** Minh Tam writes the way a freelancer talks to a prospective client over coffee. The enemy is jargon. If a word is industry-speak, it gets swapped for something a small-business owner would say. Example: instead of "bespoke custom design systems," the site says *"No templates. Built around your brand, your colors, your feel."*

**Person — "I" for the solo developer, "you" for the reader.** Occasionally slips into "we build" when speaking about the service (not the person). Example: *"We build every site from scratch, around what your business actually needs."* Never uses "our team" or "our agency" — the brand is honest that it's one person.

**Casing — sentence case everywhere.** Headlines are sentence case (`Modern websites. Built to convert.`). Eyebrows are UPPERCASE with wide letter-spacing (`0.14em–0.25em`) and used sparingly as section labels (`WHAT I DO`, `HOW IT WORKS`). Title Case is never used in the main flow.

**Rhythm — short, declarative, two-part.** Many headlines are two sentences separated by a period (`Modern websites. Built to convert.` / `Crafted for impact.` / `The Process. How we build excellence.`). The first line states, the second line completes. Body paragraphs stay under 60 words; lists and chips do the heavy lifting.

**Attitude — confident, not hype.** Claims are specific and quantified: *"700k-follower client"*, *"Ready in 8 days"*, *"An Giang based"*. No superlatives ("best," "amazing," "revolutionary"). The brand is willing to argue a position — the "Platform Trap" and "Template vs Custom" essays on `/about` and `/approach` are point-of-view writing, not sales copy.

**Questions as openers.** Major argument blocks begin with a paired question: *"Ever wonder why platforms like TikTok or Shopee take 15 to 25% of every sale you make?"* / *"Ever think about how much more you'd keep with a platform of your own?"* Second line is always softer/grayer (`text-white/40`) — a technique used to create stacked emphasis.

**No emoji in product copy.** There is a single tasteful `👆` used inside an interactive boids card as a tap hint — that's the exception, not the rule. No emoji appear in headers, body, CTAs, nav, or product cards.

**Bilingual — EN default, VI accent.** `next-intl` powers EN/VI. VI copy is slightly more formal ("Chúng tôi xây dựng") than EN ("We build"). Both languages share the same structural rhythm.

**Numbers stay naked.** Stats are rendered as bare number + tiny violet unit: `700k+`, `8 days`, `6+`. No commas on small numbers, no labels above the number — the label (`Social reach`) goes *below* in uppercase mono 9–10px.

---

## Visual Foundations

**Color — Aura Noir scale + one violet.** The system is dark-only (`forcedTheme="dark"`). The page lives on a layered grayscale: `#0e0e0e` (surface-lowest, section bg), `#131313` (surface), `#1b1b1b`, `#1f1f1f` (cards), up to `#353535`. A single accent — `#7b39fc` (Aura Violet) — carries all emphasis: CTAs, dots, eyebrows, bullet markers, glow, borders. Its soft variant `#d0bcff` (on-primary-container) is used for hyperlink hover states and small text where `#7b39fc` would be too saturated. Foreground hierarchy: `#f0e6ff` (primary fg), `#ccc3d9` (secondary fg), `#4a4456` (outline-variant / muted meta). There are **no other colors** in the brand palette — no red, no green, no yellow. Emphasis is always violet.

**Type — DM Sans + DM Mono + Instrument Serif.** Sans (DM Sans 400/500/600/700/800) handles everything readable. Mono (DM Mono 400/500) carries metadata: eyebrows, sequence numbers (`001 / 006`), scatter decor, pricing units, nav bottom bars — anything that wants to read as "system chrome." Serif (Instrument Serif, italic-only) is reserved for editorial flourishes — subheads under H1s (`Crafted for impact.`, `How we build excellence.`), the footer name, watermark quotes inside panels. Three-voice pairing is the core typographic signature.

**Headlines** are heavy (700), tight (`letter-spacing: -0.03em`, `line-height: 1.0`), on `#f0e6ff`. Italic italic subheads under them are Instrument Serif, 1 size down, in `#ccc3d9`. Eyebrows are 10–11px, uppercase, wide-tracked, mono, in `#ccc3d9/50`.

**Backgrounds — two signatures.** (1) **Grid**: `linear-gradient(rgba(123,57,252,0.09) 1px, transparent 1px) / 40px 40px` — a 40px violet grid on the hero and select sections. (2) **Dot grid**: `radial-gradient(rgba(123,57,252,0.15) 1px, transparent 1px) / 32px 32px` — used in process section, calmer. (3) **Ambient glow**: a single `radial-gradient` of `rgba(123,57,252,0.11)` off-canvas, top-left of hero, to warm the cold grid. No photographic backgrounds, no gradients as fills.

**Motifs.** Corner markers (`L` and `⌐` drawn with 1px violet borders, 20×20) anchor corners of the hero. A 2px solid violet bar runs the full height of the hero's left edge — a recurring "accent rail." A watermark glyph (`v1`) sits in the bottom-right at 120–200px, 4% opacity — faint. The bottom of every full-bleed dark section ends with a `linear-gradient(to bottom, transparent, #0e0e0e)` over 30% height to kill the grid before the seam.

**Animation — cinematic, long, decelerated.** Headlines use a **clip-from-bottom reveal** (`y: 110% → 0`, wrapped in `overflow: hidden` containers), staggered 0.13s per line, `duration: 0.95`, `ease: [0.16, 1, 0.3, 1]` (a custom heavy ease-out). Body/chips/CTAs fade in after the headline completes, staggered by +0.14s each. Scroll-in animations (section enters): `y: 24 → 0` + `opacity`, `duration: 0.5–0.65`, `ease: "easeOut"`, `viewport: { once: true, margin: "-80px" }`. Stagger children by `0.08–0.12s`. Scatter text loops on 4–7s cycles with delayed opacity pulses. **No bouncy overshoots, no spring, no easeInOut.** The system feels engineered, not playful.

**Hover states.** Primary CTA: `background: #7b39fc → #9b59ff`. Secondary links: opacity `0.6 → 1.0` OR color `text-white/60 → text-white`. Underline reveal: a `0 → 100%` width `#7b39fc` underline under process-step titles. Cards: `opacity: 0.5–0.8 → 1` plus `scale: 1.02–1.05` on images; cursor ring pulses. **No color shifts on hover for solid surfaces** — only opacity/scale.

**Press states.** CTAs shrink: `hover:scale-[0.97]` on the main "Let's talk" button. That's the only shrink pattern in the system.

**Borders.** Effectively all borders are `0.5px` or `1px`, in `rgba(123,57,252,0.1–0.35)` (violet at 10–35% alpha) or `rgba(255,255,255,0.05–0.15)` (neutral, "hairline"). Thick borders do not exist. The 0.5px hairline at violet-10% is the dominant divider across the site.

**Cards.** `bg-[#161616]` or `bg-white/[0.03]`, `border border-white/5`, `rounded-xl` (0.75rem) for small pills and `rounded-2xl` (1rem) for content cards. **No drop shadows on cards** — elevation comes from background contrast and violet glow, never from shadow. The only shadow in the system is `shadow-lg shadow-[#7b39fc]/20` on pill-shaped CTAs (a violet glow, not a drop).

**Transparency & blur.** The `glass-panel` utility: `rgba(255,255,255,0.05)` + `backdrop-filter: blur(24px)` — used for summary panels and the floating navbar. Rest of the system is opaque. Backdrop blur is rare, never layered.

**Corner radii.** `--radius: 0.625rem`. Derived: `sm 60%`, `md 80%`, `lg 100%`, `xl 140%`, `2xl 180%`, `3xl 220%`, `4xl 260%`. Practical usage: chips & pills → `rounded-full`. Small cards → `rounded-xl`. Content panels → `rounded-2xl`. Large CTAs → `rounded-full`. Very little is square — even checkboxes are `rounded` (not `rounded-none`).

**Layout.** `max-w-screen-xl` (1280px) centered container. Sections padded `py-24` or `py-32`, `px-6 sm:px-10`. Hero is `min-h-[100svh]`, content is `max-w-screen-xl` inside. Floating nav is `fixed top-5 left-1/2 -translate-x-1/2` — a pill that shifts background opacity after scrolling 70% of viewport height. Bottom fade gradient is fixed at every dark-section seam.

**Imagery.** Work thumbnails and brand walls are grayscaled (`grayscale`, `opacity: 0.25–0.50`), brightening on hover to `opacity: 0.55–0.80` — grayscale never fully lifts. `.webm`/`.mp4` loops swap in on hover. The look is editorial-cold, newspaper-archive energy, never sunny or warm.

**Cursor.** The site **removes the native cursor** on hover-capable devices (`cursor: none !important`) and replaces it with a custom pulsing ring (`CustomCursor.tsx`). This is a strong signature; treat it as part of the brand when demoing in a prototype.

---

## Iconography

**Approach — minimal, stroke-only Lucide.** The codebase uses `lucide-react` (`^0.577.0`) — SVG icon components loaded as needed. Stroke-only, weight `~1.5–2px`, inherit currentColor, sized `w-4 h-4` or `w-5 h-5` at most. Icons appear sparingly: a handful in the footer (social glyphs), directional arrows (`↗`, `→`) as text characters, and the occasional lucide icon in a UI-kit context. **Icons are never the headline** — text carries the site; icons are supporting chrome.

**Social logos — hand-drawn SVG paths in `<svg viewBox="0 0 24 24">` inline, `fill="currentColor"`.** Facebook, TikTok paths are inlined in `Footer.tsx` as a single-path glyph. Zalo uses an external SVG (`public/zalo.svg`, copied into `assets/`). All social icons render in `#4a4456` (muted) and brighten to `#d0bcff` (lavender hover).

**Arrows as characters.** The site uses `↗` (North-East arrow, U+2197) for external/visit, `→` (U+2192) for primary CTA and `see all`, and `&middot;` (`·`) for inline separators in meta lines. These are text characters, not SVG or icon font — they inherit the text color and animate via `translate-x-1` on hover.

**No icon font installed.** There is no Font Awesome / Material Icons / etc. in `package.json`. All icons come from Lucide (per-component import) or inline SVG.

**Emoji — only one place.** A single `👆` (index-finger emoji) appears inside the BoidsCanvas tap hint on mobile. That's it. No emoji in nav, products, CTAs, blog, or headings.

**Decorative scatter.** The hero uses dozens of tiny `9px` mono-text fragments — `0xf3a1`, `node_14`, `lat: 1.2ms`, `sig: 0xfe`, `∇: 3.7e-4` — positioned absolutely and pulsed in on randomized opacity loops. These are **not icons** but serve a related role: they texture the background with "live system" feel.

**Logo — `assets/logo.jpg`.** The personal mark shows "NEVA" in deep navy on a black ground with a cyan-teal snake/laptop glyph. **Note:** this is an older / alternate personal identity of the developer (Minh Tam also builds under other names). In most places on the portfolio, the brand is rendered **typographically** as a word-mark (Instrument Serif italic `Minh Tâm` in the footer) rather than with the logo image. Use the logo only where an image mark is explicitly required.

**Substitution flags.**
- **Fonts:** The production codebase uses `next/font/google` (DM Sans, DM Mono). For this design system we load the same families via Google Fonts CDN in CSS — identical families, no visual drift. **Instrument Serif** is also Google Fonts. No substitution needed.
- **Icons:** The live site uses Lucide via per-component imports (`lucide-react`). UI kits in this system load Lucide via `https://unpkg.com/lucide@latest` and use `lucide.createIcons()` — same icons, CDN delivery.

---

## Voice exceptions & anti-patterns

- **Do not** use bluish-purple gradients (blue→purple). The single violet (`#7b39fc`) is flat; tint with alpha, not with a hue shift.
- **Do not** add colored left-border accent cards ("info/warning" rails).
- **Do not** use shadows as elevation. Contrast + optional violet glow only.
- **Do not** add emoji to nav, cards, or CTAs.
- **Do not** introduce secondary accent colors (green/yellow/red). Violet + grayscale only.
- **Do not** use sentence-level italics outside Instrument Serif display moments.
- **Do not** use AI/agency tropes — "elevate your business," "unlock growth," "empower." Plain verbs: build, ship, launch, keep, own.
