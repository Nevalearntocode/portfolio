# Plan B — "Bento Grid" Build Spec
### Modern Card Layout + Glassmorphism

**Vibe:** Like Linear meets a personal portfolio. Everything lives on one scrollable page in a mosaic bento grid. Feels designed, organized, and approachable.

---

## 1. Global Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#fafaf7` | Page background (warm cream) |
| `--card` | `rgba(255, 255, 255, 0.60)` | Glass card fill |
| `--card-dark` | `#111111` | Inverted cards (CTA row) |
| `--text` | `#111111` | Primary body text |
| `--text-muted` | `#888888` | Secondary / label text |
| `--text-inverted` | `#f5f5f0` | Text on dark cards |
| `--accent` | `#a3b899` | Sage green — tags, borders, hover states |
| `--accent-dark` | `#7a9470` | Hover shade of accent |
| `--border` | `rgba(0, 0, 0, 0.08)` | Card borders |
| `--blur` | `12px` | `backdrop-filter: blur()` on glass cards |
| `--radius-card` | `20px` | All bento cards |
| `--radius-badge` | `9999px` | Pill badges |
| `--radius-btn` | `10px` | Buttons |

**Typography:**

| Role | Font | Weight | Size |
|---|---|---|---|
| Display (hero name) | `Geist` or `Inter` | 700 | `clamp(2rem, 4vw, 3.5rem)` |
| Heading (card titles) | `Inter` | 600 | `1rem` |
| Body | `Inter` | 400 | `0.9rem` |
| Label / muted | `Inter` | 400 | `0.75rem` |
| CTA headline | `Inter` | 700 italic | `clamp(2rem, 5vw, 4rem)` |

**Spacing scale (base 4px):** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`

**Dark mode:** All `--bg` → `#111111`, `--card` → `rgba(255,255,255,0.06)`, `--text` → `#f5f5f0`, `--card-dark` → `#1e1e1e`, `--border` → `rgba(255,255,255,0.10)`. Swap via `next-themes` class strategy on `<html>`.

---

## 2. Layout Structure

### Page skeleton

```
                ○ ○  [  logo  ·  Work  ·  About  ·  Contact  ·  ◑  ]  ○ ○
                      ↑ fixed pill navbar, centered, top: 20px

┌──────────────────────────────────────────────────────────────────┐
│  pt-[100px] px-6 max-w-[1100px] mx-auto                         │
│                                                                  │
│  ┌────────────────────────┬──────────────┬──────────────────┐   │
│  │                        │              │  🟢 Available     │   │
│  │  Hi, I'm Alex.         │  Skills      │  for projects    │   │
│  │  I build fast, modern  │  ──────────  ├──────────────────┤   │
│  │  apps for local biz.   │  badge  tag  │  alex@email.com  │   │
│  │                        │  badge  tag  │  [Book a call]   │   │
│  └────────────────────────┴──────────────┴──────────────────┘   │
│                                                                  │
│  ┌──────────┬────────────────────────────┬──────────────────┐   │
│  │          │  ←── Works ──→             │                  │   │
│  │  About   │  ┌────┐ ┌────┐ ┌────┐    │  "Great work,    │   │
│  │  3 lines │  │ P1 │ │ P2 │ │ P3 │    │  highly          │   │
│  │  of bio  │  └────┘ └────┘ └────┘    │  recommend"      │   │
│  │          │  horizontal scroll inside  │  — Jane D.       │   │
│  └──────────┴────────────────────────────┴──────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  "Let's build something."                [Get in Touch]  │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Grid implementation

Container: `display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px;`

| Card | `grid-column` | `grid-row` |
|---|---|---|
| Hero | `span 5` | `span 2` |
| Skills | `span 4` | `span 2` |
| Availability | `span 3` | `span 1` |
| Contact | `span 3` | `span 1` |
| About | `span 3` | `span 1` |
| Works | `span 6` | `span 1` |
| Testimonial | `span 3` | `span 1` |
| CTA | `span 12` | `span 1` |

**Breakpoints:**

| Breakpoint | Grid behavior |
|---|---|
| `>= 1024px` | Full 12-col bento as described |
| `768–1023px` | Hero `span 12`, Skills `span 6`, Avail `span 6`, Contact `span 6`, About `span 6`, Works `span 12`, Testimonial `span 12`, CTA `span 12` |
| `< 768px` | All cards `span 12` — single column stack |

Card min-height: Hero `280px`, Skills `280px`, Availability `128px`, Contact `128px`, About `200px`, Works `200px`, Testimonial `200px`, CTA `120px`.

---

## 3. Section-by-Section Breakdown

---

### 3.1 Navbar

**Purpose:** Persistent navigation that lets the user jump between sections without cluttering the hero.

**Layout:** `position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 50;` — glass pill: `backdrop-filter: blur(16px); background: rgba(255,255,255,0.7); border: 1px solid var(--border); border-radius: 9999px; padding: 8px 20px;` — flex row, gap 24px, items centered.

**Content:**
- Left: logo mark (16×16 SVG or `●` character in accent color)
- Center links: `Work` (scrolls to Works card) · `About` (scrolls to About card) · `Contact` (scrolls to CTA)
- Right: theme toggle icon button (sun/moon, 18px)

**Animation:** On mount, `y: -30 → 0`, `opacity: 0 → 1`, duration `0.5s`, ease `easeOut`, delay `0s`.

**Responsive:** Below 640px, hide center links. Show hamburger — tapping opens a full-screen overlay menu.

---

### 3.2 Hero Card

**Purpose:** Establish identity and purpose in one glance — the largest card.

**Layout:** Glass card, flex column, `justify-between`, padding `32px`. Card occupies `grid-column: span 5; grid-row: span 2`.

**Content:**
- Top: `<h1>` "Hi, I'm Alex." — display weight, large
- Sub: `<p>` "I build fast, modern web apps for local businesses — restaurants, salons, and shops that deserve better than a template."
- Bottom-left: Avatar `<img>` 56px circle, `src="/avatar/avatar.jpg"`, alt "Alex"
- Bottom-right: `<span>` "Open to work" in accent color, 0.75rem

**Animations:** `y: 40 → 0`, `opacity: 0 → 1`, duration `0.5s`, ease `easeOut`, delay `0.05s`. Card tilts with mouse: `rotateX` and `rotateY` max ±6deg (see §4 Interactions).

**Responsive (mobile):** `span 12`, `min-height: 240px`. Avatar moves inline with text.

---

### 3.3 Skills Card

**Purpose:** Communicate the tech stack without a wall of text.

**Layout:** Glass card, padding `28px`, flex column. Title row at top. Badge cloud below: `display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start`.

**Content:**
- Label: `"Skills"` — 0.75rem muted, uppercase, letter-spacing 0.08em
- Badges (in order): `Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Supabase` · `Node.js` · `Vercel` · `Figma` · `PostgreSQL`
- Badge style: `background: rgba(163,184,153,0.15); border: 1px solid var(--accent); border-radius: 9999px; padding: 4px 12px; font-size: 0.78rem; color: var(--text)`

**Animations:** Parent `variants: { show: { transition: { staggerChildren: 0.05 } } }`. Each badge: `scale: 0.7 → 1`, `opacity: 0 → 1`, spring `{ stiffness: 300, damping: 20 }`. Trigger: `whileInView`, `once: true`.

**Responsive:** Same layout, wraps naturally.

---

### 3.4 Availability Card

**Purpose:** Signal hiring/project status without a separate "hire me" page.

**Layout:** Glass card, padding `20px 24px`, flex row, items centered, gap `12px`. Occupies top half of the right column.

**Content:**
- Pulsing green dot: `<span>` 10px circle, `background: #4ade80`, CSS `pulse` keyframe (scale 1→1.4→1, opacity 1→0.4→1, 1.8s infinite)
- Text column: `<p>` "Available for projects" (0.875rem, font-weight 500) / `<p>` "Est. start: March 2025" (0.75rem, muted)

**Animations:** Card fades in `opacity: 0 → 1`, `y: 20 → 0`, `0.4s`, delay `0.15s`.

**Responsive:** Full width on mobile.

---

### 3.5 Contact Card

**Purpose:** Remove all friction between intent and reaching out.

**Layout:** Glass card, padding `20px 24px`, flex column, gap `12px`. Occupies bottom half of the right column.

**Content:**
- Label: `"Get in touch"` — 0.75rem muted
- Email row: envelope icon (16px) + `"alex@alexbuilds.dev"` — clicking copies to clipboard and shows "Copied!" tooltip for 2s
- Button: `"Book a call →"` — links to cal.com/alex. Style: `background: var(--accent); color: white; border-radius: var(--radius-btn); padding: 8px 16px; font-size: 0.85rem; width: 100%`

**Hover state (button):** `background` transitions to `var(--accent-dark)` in `0.15s`.

**Animations:** Same as Availability card, delay `0.2s`.

---

### 3.6 About Card

**Purpose:** Add personality and backstory — makes the person real, not just a list of skills.

**Layout:** Glass card, padding `28px`, flex column, gap `16px`. Narrow column (`span 3`).

**Content:**
- Label: `"About"` — 0.75rem muted uppercase
- Bio (3 lines): "I'm a self-taught developer based in [City]. I focus on small businesses that need a real web presence — not just a Squarespace page. When I'm not building, I'm usually at the farmers market or reading design books."
- Optional: secondary avatar or illustrated graphic (20×20 emoji as fallback: `🌿`)

**Animations:** `opacity: 0 → 1`, `y: 30 → 0`, `0.4s`, ease `easeOut`, triggered `whileInView`, `once: true`.

**Responsive:** `span 12`, stacks below hero.

---

### 3.7 Works Card

**Purpose:** Show proof of work — the most important conversion element.

**Layout:** Glass card, padding `28px`, flex column, gap `16px`. Wide column (`span 6`). Inner area: `overflow-x: auto; display: flex; gap: 12px; scroll-snap-type: x mandatory; padding-bottom: 8px` — mini horizontal carousel.

**Content — Card header:** Label `"Work"` + `"→ 3 projects"` muted on right.

**Content — Each project mini-card (3 total):**
- Size: `min-width: 180px; height: 140px`, `border-radius: 12px`, `scroll-snap-align: start`
- Background: screenshot image `object-fit: cover`
- Bottom overlay strip: semi-transparent dark, project name + 2-word descriptor

| Project | Image | Name | Tag |
|---|---|---|---|
| 1 | `/works/flower-shop.png` | Bloom & Co. | Flower Shop |
| 2 | `/works/hair-salon.png` | Shear Studio | Hair Salon |
| 3 | `/works/phone-repair.png` | FixIt Fast | Phone Repair |

**Click interaction:** Clicking any mini-card opens a `Dialog` (shadcn). Modal content: full mockup image (16:9), project name, 2-sentence description, tech stack used (3 badges), "View Live →" link. Modal enters with `scale: 0.92 → 1`, `opacity: 0 → 1`, `0.25s`, ease `easeOut` via `AnimatePresence`.

**Responsive:** Carousel works the same on all screen sizes. Card goes `span 12` on mobile.

---

### 3.8 Testimonial Card

**Purpose:** Passive social proof without asking the user to read a dedicated section.

**Layout:** Glass card, padding `28px`, flex column, justify `center`, gap `12px`. Narrow column (`span 3`).

**Content:** Quote text (italic, 0.9rem) + attribution line (`"— [First Name] [Last Initial]., [Role]"`, muted 0.75rem). Three quotes rotate automatically; each generated with `@faker-js/faker` at build time in `data/testimonials.ts`.

Sample (faker-generated format):
```
"Working with Alex was seamless. Our booking site launched in two weeks and customers actually use it."
— Maria S., Salon Owner

"Fast turnaround, clean code, and he explained everything clearly. Would hire again without hesitation."
— Tom R., Restaurant Manager

"We went from no online presence to getting 40% of our orders through the site. Incredible value."
— Priya K., Shop Owner
```

**Rotation:** `setInterval` every 4000ms cycles index. Outgoing quote: `opacity: 1 → 0`, `y: 0 → -8`, `0.25s`. Incoming quote: `opacity: 0 → 1`, `y: 8 → 0`, `0.25s`. Use `AnimatePresence` with `mode="wait"`.

**Responsive:** `span 12` on mobile.

---

### 3.9 CTA Row

**Purpose:** Convert — close the page with a clear action.

**Layout:** Full-width dark card (`background: var(--card-dark)`), padding `48px 64px`, flex row, `justify-between`, `align-items: center`.

**Content:**
- Left: `<h2>` "Let's build something." — italic, display font, `color: var(--text-inverted)`, `font-size: clamp(2rem, 5vw, 4rem)`
- Right: Button `"Get in Touch →"` — `background: var(--accent); color: white; border-radius: var(--radius-btn); padding: 14px 28px; font-size: 1rem` — links to `mailto:alex@alexbuilds.dev`

**Hover state (button):** Scale `1 → 1.03`, background `var(--accent-dark)`, `0.15s`.

**Animations:** `opacity: 0 → 1`, `y: 40 → 0`, `0.5s`, `easeOut`, `whileInView`, `once: true`. Headline and button staggered: headline delay `0s`, button delay `0.1s`.

**Responsive:** Column direction on mobile (`flex-col`, `gap: 24px`, centered text).

---

## 4. Interactions

### Card tilt (all bento cards)

Implemented in `TiltCard.tsx` wrapper. Uses `useMotionValue(0)` for `rotateX` and `rotateY`. On `onMouseMove`: compute cursor offset from card center, map to `±6deg` range, update motion values. On `onMouseLeave`: spring back to `0, 0` (`{ stiffness: 200, damping: 20 }`). Apply via `motion.div` style prop with `transformStyle: "preserve-3d"`. Wrap every bento card with `<TiltCard>`.

### Stagger grid reveal

Page grid container uses Framer Motion variants:
```
container: { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
item: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }
```
Each bento card is an `item`. Parent grid is `animate="show"` on mount.

### Works modal

`WorksCard` manages `selectedProject: Project | null` state. Clicking a mini-card sets `selectedProject`. `AnimatePresence` wraps a shadcn `Dialog`. On open: overlay `opacity: 0 → 1`, content `scale: 0.92 → 1` + `opacity: 0 → 1`, `duration: 0.25s`. On close: reverse. Click outside or `×` button closes.

### Email copy-to-clipboard

Contact card email: `onClick` calls `navigator.clipboard.writeText(email)`, then shows a tooltip "Copied!" positioned above the element. Tooltip: `opacity: 0 → 1 → 0` over 2s total (`0.15s` in, 1.5s hold, `0.35s` out) via a timed state reset.

### Theme toggle

`next-themes` `useTheme()` hook. Button toggles `dark` ↔ `light`. Icon animates: on switch, rotate `0 → 180deg` + `scale: 0 → 1` for incoming icon, `0.3s`. All CSS variables swap via `.dark` class on `<html>`.

### Availability dot pulse

Pure CSS `@keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.35; } }` applied to the dot span. Duration `1.8s`, infinite.

---

## 5. Libraries

| Library | Purpose | Required |
|---|---|---|
| `framer-motion` | Tilt, stagger, modal, testimonial transitions | Required |
| `tailwindcss` | All layout and utility styling | Required |
| `shadcn/ui` | `Dialog`, `Badge`, `Button` primitives | Required |
| `next-themes` | Dark/light mode toggle | Required |
| `@faker-js/faker` | Generate testimonial quotes + names at build time | Required |
| `clsx` / `tailwind-merge` | Conditional class utility (comes with shadcn) | Required |

---

## 6. File / Folder Structure

```
app/
└── plan-6/
    ├── page.tsx              ← Bento grid, imports all cards, stagger container
    └── plan6.css             ← Plan-scoped CSS vars, @keyframes pulse, dark mode overrides

components/
└── plan-6/
    ├── Navbar.tsx            ← Fixed pill nav, theme toggle, scroll-to links
    ├── TiltCard.tsx          ← motion.div tilt wrapper, used by all bento cards
    ├── HeroCard.tsx
    ├── SkillsCard.tsx
    ├── AvailabilityCard.tsx
    ├── ContactCard.tsx
    ├── AboutCard.tsx
    ├── WorksCard.tsx         ← owns selectedProject state, renders modal
    ├── WorksModal.tsx        ← AnimatePresence + shadcn Dialog
    ├── TestimonialCard.tsx
    ├── CtaRow.tsx
    ├── works.ts              ← typed Project[] array: { id, name, tag, image, description, url, stack }
    └── testimonials.ts       ← faker-generated Quote[]: { text, name, role } — run once, commit output

public/
├── avatar/
│   └── avatar.jpg            ← 400×400px, face centered (shared across plans)
├── works/
│   ├── flower-shop.png       ← 800×500px screenshot or mockup
│   ├── hair-salon.png
│   └── phone-repair.png
└── logo/
    └── logo.svg              ← simple mark, works at 16×16 and 32×32
```

Note: `app/layout.tsx` and `lib/utils.ts` already exist at the root level — no need to create them. `plan6.css` is imported at the top of `page.tsx`.

**Data shape — `works.ts`:**
```ts
export interface Project {
  id: string
  name: string
  tag: string
  image: string           // public path e.g. "/works/flower-shop.png"
  description: string     // 2 sentences max
  stack: string[]         // e.g. ["Next.js", "Supabase", "Tailwind"]
  url: string             // live link or "#"
}
```

**Data shape — `testimonials.ts`:**
```ts
export interface Testimonial {
  text: string
  name: string            // faker first + last initial
  role: string            // e.g. "Salon Owner"
}
```
Generate 3 entries with `@faker-js/faker`, commit as static data — do not call faker at runtime.

---

## 7. Asset Requirements

| Asset | Path | Dimensions | Placeholder |
|---|---|---|---|
| Avatar photo | `/public/avatar/avatar.jpg` | 400×400px | Use placeholder.co/400 with initials "A" |
| Flower shop screenshot | `/public/works/flower-shop.png` | 800×500px | Gradient fill `#e8f0e4` with text "Bloom & Co." |
| Hair salon screenshot | `/public/works/hair-salon.png` | 800×500px | Gradient fill `#f0e4ea` with text "Shear Studio" |
| Phone repair screenshot | `/public/works/phone-repair.png` | 800×500px | Gradient fill `#e4eaf0` with text "FixIt Fast" |
| Logo mark | `/public/logo/logo.svg` | 32×32px | Single letter "A" in accent color, no border |

All images use `next/image` with `fill` or explicit `width`/`height`. Works mini-cards use `object-fit: cover`. Avatar uses `rounded-full`.

---

## 8. Build Order

<!-- These steps are done by default
1. `npx create-next-app@latest` — TypeScript, Tailwind, App Router (no src/ dir)
2. `npx shadcn@latest init` — default style, neutral base color
3. `npx shadcn@latest add dialog badge button`
4. `npm install framer-motion next-themes @faker-js/faker` -->
5. Create `app/plan-6/plan6.css` — CSS custom properties for all design tokens, `@keyframes pulse`, dark mode `.dark` overrides
6. Create `app/plan-6/page.tsx` — import `plan6.css`, Framer Motion container + item variants, 12-col grid skeleton with 8 placeholder slots
7. Build `components/plan-6/TiltCard.tsx` — `useMotionValue` tilt logic, export as wrapper
8. Build `components/plan-6/Navbar.tsx` — glass pill, fixed position, scroll-to links, theme toggle
10. Build and slot `components/plan-6/HeroCard.tsx`
11. Build and slot `components/plan-6/SkillsCard.tsx` — stagger badge animation
12. Build and slot `components/plan-6/AvailabilityCard.tsx` — CSS pulse dot
13. Build and slot `components/plan-6/ContactCard.tsx` — clipboard copy logic
14. Build and slot `components/plan-6/AboutCard.tsx`
15. Populate `components/plan-6/works.ts` with 3 project entries
16. Build `components/plan-6/WorksModal.tsx` — `AnimatePresence`, `Dialog`, project detail layout
17. Build and slot `components/plan-6/WorksCard.tsx` — carousel scroll, click → modal
18. Populate `components/plan-6/testimonials.ts` (run faker script once, paste output)
19. Build and slot `components/plan-6/TestimonialCard.tsx` — interval rotation with `AnimatePresence`
20. Build and slot `components/plan-6/CtaRow.tsx`
21. Add all placeholder assets to `public/` folders
22. Test responsive breakpoints: 1280px, 900px, 375px
23. Test dark mode — verify all tokens swap cleanly
24. Final pass: verify stagger timing feels right, tilt isn't too aggressive, modal open/close is smooth

---

## Complexity Summary

| Dimension | Rating |
|---|---|
| Effort | Medium |
| Mobile | Excellent (single-column collapse) |
| Animations | Moderate (Framer Motion throughout, no custom physics) |
| Best impression | Clients who want clarity and trust — feels like a product, not a portfolio |
