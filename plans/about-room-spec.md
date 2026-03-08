# About Room Build Spec
### Immersive Card Archive

This spec adapts the existing plan template to a single-room interactive page instead of a landing page. The page is a self-contained environment with one functional exit, no business messaging, no scroll-based storytelling, and no visual dependency on any other part of the site.

---

## 1. Creative Direction

**Aesthetic name:** Midnight Archive

**Core tension principle:** The room is dark and withholding at the page level, but tactile and intimate at the object level. The interface should feel concealed until the visitor moves, then briefly personal where the light lands.

**Personality markers:**
- Quiet, nocturnal, and slightly game-like rather than editorial
- Object-first: cover art is the primary content, text is secondary and delayed to the card back
- Controlled eeriness: fog, glow, and drift create mood without becoming horror or fantasy UI
- Physical interaction bias: drag, swipe, tilt, and flip matter more than copy blocks

**What this is not:**
- Not a portfolio section
- Not a timeline, scrapbook, blog, or essay page
- Not a content-heavy “about me” layout with paragraphs, profile photo, and social links
- Not a continuation of the landing page visual language

**Non-negotiable rules:**
- The room must feel already present on load. No theatrical entry sequence.
- Browsing is the main mechanic. Reading is optional and secondary.
- Cover art stays clean on the card front. No title text, badges, or overlay chrome on the front face.
- The only persistent navigation is the back arrow and the bottom navigation zone.

---

## 2. Global Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--room-bg` | `#050505` | Base page background |
| `--room-vignette` | `#0B0B0B` | Outer radial falloff |
| `--fog` | `rgba(0, 0, 0, 0.82)` | Desktop fog-of-war layer |
| `--fog-soft` | `rgba(0, 0, 0, 0.54)` | Feathered edge in light mask |
| `--halo` | `rgba(255, 255, 255, 0.18)` | Cursor light halo |
| `--trail-core` | `rgba(255, 255, 255, 0.15)` | Cursor wake core stroke |
| `--trail-glow` | `rgba(255, 255, 255, 0.22)` | Cursor-head bloom |
| `--surface` | `rgba(255, 255, 255, 0.06)` | Bottom bar and subtle panels |
| `--surface-strong` | `rgba(255, 255, 255, 0.10)` | Hovered controls |
| `--border` | `rgba(255, 255, 255, 0.14)` | Lines and control outlines |
| `--text-primary` | `#F4F1E8` | Primary UI text |
| `--text-muted` | `rgba(244, 241, 232, 0.58)` | Secondary text |
| `--text-dim` | `rgba(244, 241, 232, 0.08)` | Scene badge and distant UI |
| `--dot-active` | `#F4F1E8` | Active pagination dot |
| `--dot-inactive` | `rgba(244, 241, 232, 0.26)` | Inactive pagination dot |
| `--accent-games` | `#7DA0FA` | Category accent: Games |
| `--accent-creators` | `#F48FB1` | Category accent: Creators |
| `--accent-food` | `#E8A75A` | Category accent: Food |
| `--accent-work` | `#86C9A6` | Category accent: Work |
| `--card-radius` | `22px` | Card shell radius |
| `--panel-radius` | `999px` | Bottom nav pill radius |
| `--note-radius` | `18px` | Card back note block radius |
| `--space-1` | `4px` | Micro spacing |
| `--space-2` | `8px` | Tight spacing |
| `--space-3` | `12px` | Small spacing |
| `--space-4` | `16px` | Standard spacing |
| `--space-5` | `24px` | Large spacing |
| `--space-6` | `32px` | Section spacing |
| `--space-7` | `48px` | Wide spacing |
| `--space-8` | `64px` | Desktop frame spacing |

**Typography**

| Role | Font | Source | Weight | Usage |
|---|---|---|---|---|
| Display badge | `Bricolage Grotesque` | `next/font/google` | 700 | Decorative category badge label |
| UI sans | `Space Grotesk` | `next/font/google` | 400 / 500 / 700 | Navigation, counters, tags, notes |
| Meta mono | `IBM Plex Mono` | `next/font/google` | 400 / 500 | Ratings, dimensional tags, count labels |

**Type scale**

| Token | Value | Usage |
|---|---|---|
| `--text-xs` | `0.75rem` | Count labels, note metadata |
| `--text-sm` | `0.875rem` | Bottom bar controls, note copy |
| `--text-md` | `1rem` | Primary labels |
| `--text-lg` | `1.25rem` | Card back emphasis |
| `--text-watermark` | `clamp(1rem, 2vw, 1.25rem)` | Decorative category badge label |

**Motion constants**

| Token | Value | Usage |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Fade and slide transitions |
| `--ease-tilt-reset` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Card tilt return |
| `--dur-fast` | `160ms` | Hover state changes |
| `--dur-med` | `280ms` | Flip and index transitions |
| `--dur-slow` | `480ms` | Float drift loops and frame fade |

---

## 3. Layout Structure

### Desktop page skeleton

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Back Arrow]                                                       │
│                                                                      │
│                      faint watermark: CATEGORY                        │
│                                                                      │
│        card deck stage / centered spread / drag lane                 │
│                                                                      │
│                                                                      │
│                                                                      │
│  [ CATEGORY · COUNT ]    [ ● ● ● ● ]    [ ‹ ] [ › ]                 │
│  [ GAMES ] [ CREATORS ] [ FOOD ] [ WORK ]                           │
└──────────────────────────────────────────────────────────────────────┘
```

### Structural layers

1. `RoomFrame`
   Fixed viewport container, `min-height: 100svh`, `overflow: hidden`, radial vignette background.
2. `BackExit`
   Top-left fixed control, visually detached from the bottom nav.
3. `SceneBadge`
   Large decorative category badge floating off-center above the deck on desktop only, `pointer-events: none`.
4. `DeckStage`
   Main interaction zone, vertically centered, width constrained to `min(1180px, calc(100vw - 96px))`.
5. `FogLayer`
   Full-screen overlay on desktop only, masking scene content except around cursor light.
6. `TraceLayer`
   Independent full-screen canvas/SVG for the tapered cursor light wake, desktop only.
7. `BottomNav`
   Bottom-fixed compound control containing active category label, item count, dot indicators, arrows, and category switch buttons.

### Breakpoints

| Breakpoint | Behavior |
|---|---|
| `>= 1280px` | Stage width `1180px`, multi-card spread visible, nav centered with max width `920px` |
| `768px - 1279px` | Stage width `calc(100vw - 64px)`, spread tightens, cards shrink slightly, scene badge repositions inward |
| `< 768px` | One card only, full-width carousel, fog disabled, trace disabled, bottom nav becomes two-row fixed panel |

### Spatial rules

- Deck stage is vertically centered between the back arrow safe zone and the bottom nav safe zone.
- Cards may overlap one another, but never overlap the bottom navigation zone.
- The scene badge sits behind cards at `z-index: 0`; cards at `z-index: 20`; fog at `z-index: 30`; trace at `z-index: 40`; nav at `z-index: 50`; back arrow at `z-index: 60`.
- The frame may fade in from `opacity: 0` to `1` on initial mount, but no child element may animate independently into the room.

---

## 4. Screen Breakdown

This project has one screen with five functional zones rather than multiple landing-page sections.

### 4.1 Room Frame

**Purpose:** Establish the page as a self-contained dark room before any interaction starts.

**Layout:** Full viewport container with background:
- Base fill: `linear-gradient(180deg, #050505 0%, #080808 100%)`
- Vignette overlay: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 34%, rgba(0,0,0,0.72) 100%)`

**Content:**
- No hero copy
- No profile header
- No supplemental labels beyond the scene badge and navigation

**Animation:**
- Trigger: initial mount
- Property: `opacity`
- From: `0`
- To: `1`
- Duration: `320ms`
- Easing: `var(--ease-out-soft)`

**Responsive behavior:**
- Desktop preserves full atmospheric layers.
- Mobile keeps only the base fill and vignette. Remove fog and trace entirely.

### 4.2 Back Exit

**Purpose:** Provide the only explicit way back to the portfolio without turning the page into a full nav system.

**Layout:**
- Position: `fixed; top: 28px; left: 28px`
- Hit area: `44px x 44px`
- Icon: left arrow, `18px`
- Button shell: transparent by default, no pill chrome until hover/focus

**Content:**
- Icon only on desktop
- Icon plus visually hidden label `"Back to portfolio"`

**Animation:**
- Trigger: hover/focus
- Property: `background-color`, `border-color`, `translateX`
- From: transparent, transparent border, `0px`
- To: `rgba(255,255,255,0.06)`, `rgba(255,255,255,0.14)`, `-2px`
- Duration: `160ms`
- Easing: `var(--ease-out-soft)`

**Responsive behavior:**
- On mobile, keep top-left placement but increase hit area to `48px x 48px`.
- Keep label screen-reader only; never add visible text.

### 4.3 Scene Badge

**Purpose:** Add a faint decorative object that echoes the active category without acting like a second primary label.

**Layout:**
- Desktop only
- Rounded pill or softened square, minimum visual size `160px x 52px`
- Positioned off-center, slightly above the deck, never directly behind the active card
- Preferred anchor point on wide desktop: `left: 22%`, `top: 21%`, clamped within viewport-safe bounds
- Border: `1px solid rgba(244, 241, 232, 0.08)`
- Fill: `rgba(244, 241, 232, 0.03)`
- Visibility controlled by opacity only; no blend mode

**Content:**
- Active category word in uppercase, centered within the badge

**Animation:**
- Trigger: category change
- Property: `opacity`, `filter: blur()`, `translateY`
- From: `opacity 0`, `blur(8px)`, `translateY(12px)`
- To: `opacity 0.08`, `blur(0px)`, `translateY(0px)`
- Duration: `280ms`
- Easing: `var(--ease-out-soft)`

**Idle motion:**
- Independent from cards
- `translateY` drift range `±8px`
- `rotateZ` drift range `±1deg`
- Duration random between `7.5s` and `10s`

**Responsive behavior:**
- Omit entirely on mobile.

### 4.4 Deck Stage

**Purpose:** Hold the card collection and make browsing feel physical rather than list-like.

**Layout:**
- Desktop:
  - `display: flex`
  - `align-items: center`
  - `justify-content: center`
  - Stage height target: `min(62vh, 620px)`
- Mobile:
  - Use full-width embla carousel
  - One card visible at a time
  - Side padding `16px`

**Content:**
- Active category deck only
- Front faces show cover art only
- Back faces show metadata template specific to the category

**Animation:**
- Trigger: category mount or category switch
- Property: `opacity`
- From: `0.92`
- To: `1`
- Duration: `220ms`
- Easing: `linear`
- No card fly-in, no scale-up entrance, no staged stagger

**Responsive behavior:**
- On desktop:
  - If item count `<= 5`, render centered spread with visible gaps.
  - If item count `>= 6`, render draggable/swipeable lane with the active card centered and neighboring cards partially visible.
- On mobile:
  - Always render one card at a time.
  - Use infinite looping carousel.

### 4.5 Bottom Navigation Zone

**Purpose:** Consolidate every persistent control into one low, stable anchor.

**Layout:**
- Position: `fixed; bottom: 24px; left: 50%; transform: translateX(-50%)`
- Width: `min(920px, calc(100vw - 32px))`
- Container: rounded capsule with subtle blur, `background: rgba(10,10,10,0.68)`, `backdrop-filter: blur(10px)`, 1px border
- Internal structure:
  - Row 1: active category label + count, dot indicators, arrows
  - Row 2: category switch buttons

**Content:**
- Format: `GAMES · 12`
- Dot indicators reflect current item index within the category
- Arrows move one card backward/forward
- Category switch labels: `GAMES`, `CREATORS`, `FOOD`, `WORK`

**Animation:**
- Trigger: hover/focus on controls
- Property: `background-color`, `opacity`
- From: base surface state
- To: `var(--surface-strong)`, `opacity 1`
- Duration: `160ms`
- Easing: `var(--ease-out-soft)`

**Responsive behavior:**
- On desktop, align the three information clusters on one row, categories on the second row.
- On mobile, keep the same two-row model but reduce padding and allow category buttons to scroll horizontally if needed.

---

## 5. Card System

### 5.1 Card Shell

**Front face**
- Cover art only
- Aspect ratio `3 / 4`
- Border radius `var(--card-radius)`
- Soft outer shadow: `0 20px 40px rgba(0,0,0,0.34)`
- No border on the face itself

**Back face**
- Same card shell dimensions as the front
- Matte dark surface with subtle grain overlay
- Padding `20px`
- Layout split:
  - Top row: title or item name
  - Meta cluster: rating + dimension tags
  - Note block: 2-4 lines maximum

**Flip behavior**
- Desktop:
  - Flip on click only
- Mobile:
  - Tap toggles front/back for the current card
  - Swiping must not accidentally flip; tap target is the card body only

**Deliberateness rule**
- The back face is revealed only by explicit user action.
- Hover, pointer pause, or focus alone must never flip a card.

**Flip animation**
- Trigger: click/tap
- Property: `rotateY`
- From: `0deg`
- To: `180deg`
- Duration: `280ms`
- Easing: `var(--ease-out-soft)`

### 5.2 Card Sizing

| Breakpoint | Width | Max Height | Notes |
|---|---|---|---|
| `>= 1280px` | `220px` | `293px` | Standard desktop deck size |
| `768px - 1279px` | `190px` | `253px` | Tighter spread |
| `< 768px` | `calc(100vw - 32px)` | `min(72vh, 560px)` | Full-width single card |

### 5.3 Spread and Lane Rules

**For 1-5 cards**
- Render all cards simultaneously.
- Compute centered spread with card overlap of `0px`; visible gap `20px` at desktop, `14px` at tablet.
- Active card remains visually dominant through `translateY(-8px)` and stronger shadow.

**For 6+ cards**
- Use horizontal lane with snap positions.
- Center the active card.
- Previous and next cards remain visible at `72%` scale and `0.65` opacity.
- Do not render a second-neighbor tier.

### 5.4 Idle Float and Tilt

**Idle float**
- Every visible card runs a slow vertical and rotational drift.
- Range:
  - `translateY`: between `-6px` and `6px`
  - `rotateZ`: between `-1.2deg` and `1.2deg`
- Duration: random per card between `4.8s` and `7.2s`
- Delay: random negative offset so no two cards sync

**Hover tilt**
- On hover, idle float pauses for that card only.
- Card tilts toward pointer position:
  - `rotateX`: max `±6deg`
  - `rotateY`: max `±6deg`
- On leave:
  - Tilt returns to zero
  - Idle float resumes from current phase after `120ms`

**Mobile tilt**
- Use device orientation only if permission is granted and motion values are available.
- Clamp gyroscope tilt:
  - `rotateX`: max `±6deg`
  - `rotateY`: max `±6deg`
- If gyroscope is unavailable or permission denied, keep cards static. Do not create a fake tilt from finger drag.

---

## 6. Category Content Model

All content is JSON-managed and static. No CMS, database, or admin UI.

### 6.1 Shared data shape

```ts
export interface AboutCategory {
  id: "games" | "creators" | "food" | "work";
  label: string;
  accent: string;
  items: AboutItem[];
}

export interface AboutItem {
  id: string;
  title: string;
  cover: string;
  rating?: string;
  tags: string[];
  note: string;
  meta?: Record<string, string>;
}
```

### 6.2 Category-specific back templates

#### Games

**Fields**
- `title`
- `rating`
- `tags`: exact count 3
- `note`
- `meta.playMode`
- `meta.era`

**Back layout**
- Title at top
- Rating rendered mono and large
- Three tags in one wrapped row
- Two-column meta line: `PLAY MODE / ERA`
- Note block at bottom

**Example tags**
- `immersive sim`
- `co-op chaos`
- `build-heavy`

#### Creators

**Fields**
- `title`
- `rating`
- `tags`: exact count 2 or 3
- `note`
- `meta.format`
- `meta.energy`

**Back layout**
- Title
- Small line: `FORMAT · ENERGY`
- Tag row
- Note block occupying most of the card

#### Food

**Fields**
- `title`
- `rating`
- `tags`: exact count 2
- `note`
- `meta.craving`
- `meta.context`

**Back layout**
- Title
- Rating + craving line
- Two tag chips
- Note block
- Small footer line for context such as `late-night`, `weekend only`, `rainy day`

#### Work

**Fields**
- `title`
- `rating`
- `tags`: exact count 2 or 3
- `note`
- `meta.mode`
- `meta.reason`

**Back layout**
- Title
- Two-column meta row: `MODE / WHY IT WORKS`
- Tags
- Note block

### 6.3 Data authoring rules

- Every note stays below 140 characters.
- Ratings use one system only across all categories. Use `x/10`, for example `8.9/10`.
- Tags are lowercase and concise, max 16 characters each.
- Cover art files live in category folders under `public/about-room/`.
- JSON order determines default card order.

---

## 7. Interactions

### 7.1 Desktop fog of war

**Mechanic**
- A full-screen dark overlay hides the room.
- A circular-to-elliptical mask follows the pointer and reveals content locally.
- The mask edge must be feathered, not hard clipped.

**Technical direction**
- Use a fixed `div` overlay with CSS `mask-image` or a canvas mask, whichever yields smoother performance in this repo.
- Recommended implementation: CSS radial-gradient mask driven by CSS variables updated from pointer coordinates.

**Mask spec**
- Center: pointer coordinates
- Inner reveal radius: `72px`
- Outer feather radius: `220px`
- Secondary subtle halo ring: additional `40px` falloff with `var(--halo)`

**Animation**
- Trigger: pointer move
- Property: mask center position
- From: previous pointer position
- To: current pointer position
- Duration: `70ms` interpolation
- Easing: linear

### 7.2 Cursor trace layer

**Mechanic**
- Moving the cursor drags a brief tapered wake of light through the fog.
- The trail should read strongest at the cursor head and dissolve sharply behind it.
- This layer is decorative and independent from the fog mask.

**Technical direction**
- Use a fixed `<canvas>` over the room.
- Store only the minimum recent points needed to render a continuous tapered segment, capped at `12` points.
- Maximum rendered trail length is `120px`.
- Fade the trail out over `280ms`.

**Stroke spec**
- Head width: `28px`
- Tail width: `0px`
- Core color: `rgba(255, 255, 255, 0.15)`
- Head glow: `rgba(255,255,255,0.22)` with bloom radius `24px` concentrated at the cursor point
- Tail opacity: `1 -> 0`
- Tail easing: `cubic-bezier(0.4, 0, 1, 1)`
- The glow is concentrated at the front rather than evenly distributed along the entire trail

**Animation**
- Trigger: pointer move
- Property: canvas stroke redraw and alpha decay
- Duration: real-time; decay per frame over `280ms`
- Easing: linear

### 7.3 Card drag and swipe

**Desktop lane**
- Pointer drag moves the deck horizontally.
- Snap to the nearest card on release.
- Minimum drag distance to change card: `56px`
- Minimum release velocity to change card even below distance threshold: `0.35px/ms`

**Mobile carousel**
- Use infinite loop mode.
- Snap exactly one card at a time.
- Disable free-scroll.

### 7.4 Category switch

**Mechanic**
- Clicking a category in the bottom bar replaces the entire deck context.
- Reset item index to `0` for the new category.
- Preserve room state, back arrow, and bottom nav position.

**Transition**
- Outgoing deck: `opacity 1 -> 0.82`, `filter blur(0px -> 8px)`, `duration 120ms`
- Incoming deck: `opacity 0.82 -> 1`, `filter blur(8px -> 0px)`, `duration 180ms`
- Easing: `var(--ease-out-soft)`

### 7.5 Dot indicators

**Mechanic**
- Each visible dot maps to one item in the active category.
- Clicking a dot jumps directly to that item.
- For categories above 8 items on desktop, use condensed dot rendering:
  - first dot
  - previous
  - active
  - next
  - last

**Animation**
- Active dot scales from `0.9 -> 1`
- Inactive dots remain at `0.78`
- Duration `160ms`
- Easing `var(--ease-out-soft)`

### 7.6 Focus and accessibility behavior

- Back arrow, category buttons, arrows, and dots must all be keyboard reachable.
- Left/right arrow keys move cards within the current category on desktop.
- Up/down keys do nothing.
- `Tab` order:
  1. Back arrow
  2. Previous card arrow
  3. Next card arrow
  4. Dot indicators
  5. Category buttons
  6. Active card flip control if implemented as button
- When a card flips, announce the change with `aria-live="polite"` only if the back face contains hidden text not otherwise accessible.

---

## 8. Libraries Needed

| Library | Version / Source | Purpose | Required |
|---|---|---|---|
| `framer-motion` | existing dependency | Float drift, tilt, flip, category change transitions | Required |
| `embla-carousel-react` | existing dependency | Mobile infinite swipe carousel and optional desktop lane snap | Required |
| `lucide-react` | existing dependency | Back arrow and nav arrows | Required |
| `next/image` | Next built-in | Cover art rendering and responsive image handling | Required |
| `next/font/google` | Next built-in | `Bricolage Grotesque`, `Space Grotesk`, `IBM Plex Mono` loading | Required |

Do not add a particle, WebGL, shader, or custom effects library for this page. The atmosphere should be achieved with CSS, Framer Motion, and a lightweight canvas layer only.

---

## 9. File / Folder Structure

```text
src/
  app/
    about/
      page.tsx                  # route entry for the room
      about-room.css            # page-scoped tokens, fog, trace, and nav styling
  components/
    about-room/
      AboutRoom.tsx             # top-level orchestration
      RoomFrame.tsx             # background, watermark, desktop layers
      BackExit.tsx              # fixed top-left arrow
      DeckStage.tsx             # desktop spread/lane + mobile carousel switch
      DeckCard.tsx              # card shell, flip logic, front/back faces
      CardFront.tsx             # cover art only
      CardBack.tsx              # category-template renderer
      BottomNav.tsx             # label/count/dots/arrows/category buttons
      FogLayer.tsx              # desktop-only mask layer
      TraceLayer.tsx            # desktop-only canvas trail
      useDeckMotion.ts          # drag, snap, idle offsets, active index logic
      useGyroTilt.ts            # optional device orientation handling
  data/
    about-room.json             # all category and item content
  types/
    about-room.ts               # AboutCategory/AboutItem interfaces
public/
  about-room/
    games/
    creators/
    food/
    work/
```

### File responsibilities

- [`src/app/about/page.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\app\about\page.tsx)
  Imports `about-room.css`, sets route metadata, renders `AboutRoom`.
- [`src/components/about-room/AboutRoom.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\AboutRoom.tsx)
  Owns active category and active item state.
- [`src/components/about-room/DeckStage.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\DeckStage.tsx)
  Chooses centered spread vs draggable lane vs mobile carousel based on item count and viewport.
- [`src/data/about-room.json`](c:\Users\MSI\Documents\GitHub\Portfolio\src\data\about-room.json)
  Static data source for all collections.

---

## 10. Asset Requirements

| Asset Type | Path Pattern | Dimensions | Notes |
|---|---|---|---|
| Card cover art | `/public/about-room/{category}/{slug}.jpg` | `900 x 1200` minimum | Portrait crop, front face only |
| Optional PNG cover art | `/public/about-room/{category}/{slug}.png` | `900 x 1200` minimum | Use only if transparency is intentional |
| Category fallback cover | `/public/about-room/{category}/fallback.jpg` | `900 x 1200` | Used if an item image is temporarily missing |

**Asset style rules**
- Covers may be poster art, screenshots, thumbnails, or food photography depending on category.
- All assets should be color-corrected to remain legible under a dark room and partial fog reveal.
- Avoid visible text overlays added by the site. If text exists, it must be part of the source image only.

### 10.1 Image spec for fetched or downloaded assets

This page depends on the front face reading cleanly at a small portrait size, so source selection must be opinionated. Favor images that already survive aggressive cropping rather than trying to rescue weak source material later.

| Field | Requirement |
|---|---|
| Primary display ratio | `3:4` portrait |
| Preferred source size | `1800 x 2400` or larger |
| Working master size | `1350 x 1800` |
| Minimum acceptable source | `1200 x 1600` |
| Hard reject floor | below `900 x 1200` |
| Preferred file type | `jpg` or `webp` |
| Allowed transparency | `png` only when transparency is native and meaningful |
| Max delivered weight target | `<= 250 KB` per display image after optimization |
| Color mode | `sRGB` |
| Orientation policy | Portrait native preferred; landscape allowed only if it crops cleanly to `3:4` |

### 10.2 Safe crop and composition rules

- Keep the primary subject inside the central `70%` width and `80%` height of the frame.
- Avoid crops where the subject touches the top edge; leave at least `6%` top breathing room when possible.
- If an image contains faces, keep eyes in the upper-middle third, never at the very top.
- Avoid source images with critical logos, subtitles, or UI text near the left or right outer `12%` edges because they will often be clipped.
- Default focal point is `50% x / 45% y`.
- If an image needs a non-central crop, store focal metadata in JSON:

```ts
{
  "cover": "/about-room/games/inside.jpg",
  "focalX": 42,
  "focalY": 38
}
```

### 10.3 Category image selection heuristics

#### Games
- Prefer official key art, capsule art, or clean screenshots with one dominant subject.
- Avoid HUD-heavy gameplay screenshots unless the UI is part of the appeal.
- Prefer moody or high-contrast frames over bright flat marketing art.

#### Creators
- Prefer portrait, studio, or thumbnail imagery with a strong face or silhouette.
- Avoid busy collage graphics with multiple competing faces.
- Avoid tiny text-heavy thumbnails that become noise at card size.

#### Food
- Prefer one clear dish or drink as the subject.
- Avoid overhead table shots with many plates unless one item clearly dominates.
- Warm highlights are acceptable, but clipped whites should be avoided because they flare under the halo.

#### Work
- Prefer object or environment shots that read as tools, craft, routine, or workspace.
- Avoid corporate stock imagery, handshake photography, or laptop-on-desk clichés.
- Images should feel personal and tactile, not aspirational or promotional.

### 10.4 Processing pipeline

When sourcing via API or download, normalize every chosen image through the same pipeline before committing it.

1. Fetch the largest available asset that is at least `1200px` wide for portrait or `1600px` on the short side for landscape.
2. Crop to `3:4` using the detected focal point or the default `50 / 45` focal position.
3. Resize the cropped master to `1350 x 1800`.
4. Export display asset as `webp` when possible; keep `jpg` if the source API or image content compresses poorly in `webp`.
5. Let Next.js generate runtime responsive variants from the committed master.
6. Keep the original raw download outside the public folder if you want archival safety, but only commit the normalized display master to `public/about-room/`.

### 10.5 Automated fetch rules

If an API can return multiple variants, prefer this ranking order:

1. Native portrait `3:4` or taller
2. Portrait `2:3`
3. Square
4. Landscape with a single dominant subject

Reject an image automatically if any of these are true:
- width or height is below the hard minimum
- subject is unreadable after simulated crop to `3:4`
- visible watermark is baked into the source
- compression artifacts are already obvious at source resolution
- the image is mostly text, UI chrome, or multi-subject clutter

### 10.6 Naming and placeholder rules

- File naming pattern: `{category}-{slug}.jpg` or `{category}-{slug}.webp`
- Example: `games-disco-elysium.jpg`
- Fallback image naming: `fallback.jpg` inside each category folder
- Placeholder fallback style:
  - background: muted category accent over deep charcoal gradient
  - centered title text only if a real image is unavailable
  - no fake photography effects
- If a fetched image does not meet the rules, use the category fallback rather than forcing a poor crop into the deck

---

## 11. Build Order

1. Create [`src/types/about-room.ts`](c:\Users\MSI\Documents\GitHub\Portfolio\src\types\about-room.ts) with the shared interfaces and category IDs.
2. Create [`src/data/about-room.json`](c:\Users\MSI\Documents\GitHub\Portfolio\src\data\about-room.json) with placeholder items across the four categories and correct per-category `meta` fields.
3. Create [`src/app/about/about-room.css`](c:\Users\MSI\Documents\GitHub\Portfolio\src\app\about\about-room.css) with all page-scoped tokens, layer z-indexes, navigation styling, fog mask styles, and motion utility classes.
4. Create [`src/components/about-room/AboutRoom.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\AboutRoom.tsx) to load JSON data, manage active category, and pass state down.
5. Create [`src/components/about-room/RoomFrame.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\RoomFrame.tsx) and [`src/components/about-room/BackExit.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\BackExit.tsx).
6. Create [`src/components/about-room/FogLayer.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\FogLayer.tsx) with pointer-tracked mask behavior for desktop only.
7. Create [`src/components/about-room/TraceLayer.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\TraceLayer.tsx) using canvas and point decay logic.
8. Create [`src/components/about-room/useDeckMotion.ts`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\useDeckMotion.ts) to centralize drag thresholds, active card snapping, and random idle offsets.
9. Create [`src/components/about-room/DeckCard.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\DeckCard.tsx), [`src/components/about-room/CardFront.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\CardFront.tsx), and [`src/components/about-room/CardBack.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\CardBack.tsx).
10. Create [`src/components/about-room/DeckStage.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\DeckStage.tsx) and integrate desktop spread/lane plus mobile embla carousel.
11. Create [`src/components/about-room/BottomNav.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\BottomNav.tsx) with all persistent controls and keyboard support.
12. Create [`src/components/about-room/useGyroTilt.ts`](c:\Users\MSI\Documents\GitHub\Portfolio\src\components\about-room\useGyroTilt.ts) and gate it behind mobile permission checks.
13. Create [`src/app/about/page.tsx`](c:\Users\MSI\Documents\GitHub\Portfolio\src\app\about\page.tsx) and wire the full room together.
14. Add placeholder cover art assets to `/public/about-room/`.
15. Verify desktop performance with fog and trace enabled at 60fps target on a typical laptop trackpad/mouse path.
16. Verify tablet and mobile behavior with fog disabled, one-card carousel enabled, and gyroscope handling gracefully degraded.
17. Run lint and fix any accessibility or typing issues before visual polish.

---

## 12. Acceptance Criteria

- The page reads as a separate immersive project, not a subsection of a portfolio layout.
- The only persistent exit is the top-left back arrow.
- On desktop, the fog-of-war reveal and cursor trace are visibly separate effects.
- On mobile, both fog and trace are absent.
- Front faces show cover art only with no extra overlay text.
- Back faces differ by category template.
- Cards flip on click/tap only. Hover never flips a card.
- When a category has 5 or fewer items, the cards appear as a centered spread with gaps.
- When a category has 6 or more items, browsing becomes drag/swipe based.
- Cards idle-float out of sync, pause float on hover, tilt toward the pointer, and reset on leave.
- Only one neighbor tier is visible in deck mode.
- The decorative scene badge appears on desktop only and is omitted on mobile.
- The bottom navigation zone contains the active category label, item count, dot indicators, arrows, and category switching.
- Data is fully driven from static JSON.

---

## 13. Complexity Summary

| Dimension | Rating |
|---|---|
| Visual design difficulty | High |
| Motion complexity | High |
| Data complexity | Low |
| Accessibility complexity | Medium |
| Implementation risk | Medium-High due to atmospheric desktop layers |
