# Portfolio Redesign — Design Discussion

## Locked Decisions

### Theme
- **Dark only** — drop light mode entirely. The video hero and dot grid section already push the site dark-first. No ThemeToggle needed.

### Layout
- **Drop bento grid entirely.** Moving to editorial, section-based layout — more studio/cinematic, less dashboard.
- **Drop TopBar** — phone/email/socials live in the contact section and footer. The top bar breaks the cinematic hero.
- **Drop TiltCard 3D tilt effect** — reads as bento grid era.

### Navbar
- Keep the **floating pill** design — already works perfectly over a full-bleed video
- Keep the **separate "About" black pill** — signals /about is a different world
- Keep the **active users green dot** — subtle social proof
- Keep the **shimmer on hover**
- Add **scroll-aware opacity** — slightly more transparent over the hero, firms up after scroll past it
- Remove ThemeToggle (dark only now)

### Page Structure (top to bottom)
1. **Hero** — full-bleed video, name + subtitle floating over it, two CTAs
2. **Skills** — split layout: capability pills left, looping `.webm` demo video right
3. **Works** — project cards, `.webm` plays on hover (replaces `.jpg` thumbnail)
4. **Currently Building** — active projects grid with phase pills + open slot card
5. **Dot grid** — interactive dark section (see below)
6. **Process** — 3 steps with large numbers, text only
7. **Pricing** — 3 tiers
8. **CTA** — "Let's build something worth visiting."
9. **Footer**

### Winding Line
- SVG path that runs the full page height in a winding/snaking pattern
- Draws itself via `stroke-dashoffset` driven by scroll progress — 1:1 mapping
- **Starts after the hero** — doesn't compete with the video
- Retraces on scroll back up (honest reflection of scroll position)
- `mix-blend-mode: difference` so it auto-inverts on dark sections (white on dark, dark on light)
- `pointer-events: none`, sits behind content
- Native CSS scroll-driven animations (`animation-timeline: scroll()`) — no GSAP

### Dot Grid Section
- Black background, regular grid of small white dots — **static at rest**
- On cursor move: dots **pull toward** cursor (attraction, not repulsion)
- Cursor leaves: dots ease/snap back to grid positions
- No idle drift animation — stillness vs motion contrast is the whole effect
- Write to DOM via `useRef` + `rAF`, never `setState` in animation loop
- Pulsing Ring Cursor layers on top site-wide
- Role: interstitial "statement" break between Currently Building and Process

### Cursor
- **Pulsing Ring Cursor** site-wide (from `~/.claude/ui-patterns/pulsing-ring-cursor.md`)

### Per-Section Entry Animations (scroll into view)
| Section | Entry |
|---|---|
| Skills | Heading fades up → capability pills stagger in L→R, scale from 0.9 |
| Works | Heading fades up → project cards stagger in, 60ms delay between each |
| Currently Building | Whole block slides up + fade. Phase pills animate in sequentially |
| Dot grid | No entry animation — appears instantly, stillness is the point |
| Process | Steps stagger in: 01 → 02 → 03, longer delay, feels deliberate |
| Pricing | Center card (Growth) comes in first, flanks follow 80ms later |
| CTA | First line fades up → second line 100ms later → button fades in last |

### Hover Animations
| Element | Hover |
|---|---|
| Work cards | `translateY -4px` + shadow deepens, tag pill brightens, `.webm` plays |
| Pricing cards | Border brightens. Featured card gets subtle glow pulse |
| Process steps | Number scales up slightly, underline draws in |
| CTA button | Arrow slides right 4px |

### Line + Section Entry Relationship
- On **first scroll**: section content only animates in after the line has "reached" that section
- On **subsequent scroll / scroll-back**: section entries are instant
- Makes the line feel causal, not just decorative

### Assets
| File | Used for |
|---|---|
| `public/works/card-shop.jpg` + `.webm` | Wedding Cards project |
| `public/works/food-shop.jpg` + `.webm` | DUSK F&B project |
| `public/works/hair-salon-men.jpg` + `.webm` | Barber District project |
| Sweet Origins | Image TBD — mark as **coming soon** |
| Shine & Drive | Image TBD — mark as **coming soon** |
| `public/logo.jpg` | Used instead of personal photo throughout |
| `public/hero.mp4` | Hero background video — **drop file here when ready** |

- Skills split right side: use `hair-salon-men.webm` or `food-shop.webm` looping silently
- Hero video placeholder name: **`hero.mp4`** — user will download and drop in

### Patterns NOT used on homepage (reserved for /about)
- **Fog Reveal** — better fit for the atmospheric `/about` room page
- **Magnetic Dark Section** — already used in another demo

---

## Content Inventory (keep all of this in the redesign)

### Owner
- **Name:** Minh Tâm · **Title:** Web Developer
- **Logo:** `/logo.jpg` (used in place of personal photo)
- **Location:** An Giang based, in-person available
- **Email:** hmtam110501@gmail.com · **Phone:** 0853151319
- **Socials:** Facebook, Messenger, Zalo, TikTok

### Hero copy
- Title: "Hi, I'm Minh Tâm"
- Subtitle: "I design websites that make a real impression."
- Description: "Clean layouts, thoughtful features, and nothing you don't need."
- CTAs: "View projects" + "Contact now"

### Availability
- "Taking on new clients · Available now · Finished in 2–3 weeks"

### Skills
- Badge: "What I do" · Title: "What goes into your site"
- 8 capabilities: Book appointments, Online shop, Mobile friendly, Google optimized, Manage your content, Custom designs, Multilingual support, Photo gallery

### Works (5 projects)
1. **Thiệp Cưới Đình Toàn** — Wedding Cards — `card-shop.jpg/.webm`
2. **DUSK** — F&B — `food-shop.jpg/.webm`
3. **Barber District** — Barbershop — `hair-salon-men.jpg/.webm`
4. **Sweet Origins** — Bakery — coming soon
5. **Shine & Drive** — Auto Detailing — coming soon

### Testimonials (3) — placeholder, may revisit
1. Maria Santos, Bloom & Co.
2. James Park, FixIt Fast
3. Aisha Nguyen, The Cut Studio

### Process
- 01 Consult · 02 Build · 03 Launch

### Currently Building
- Active projects grid + open slot card ("1 slot open · Taking on new clients")

### Pricing (3 tiers)
- Essential · Growth *(Popular)* · Studio

### CTA
- "Let's build something worth visiting." → "Let's talk →"

### Footer
- "Let's make something meaningful together."

---

## Open Questions
- [ ] Testimonials — are these real clients or placeholders? May hurt trust if they read generic
- [ ] Hero video style — montage of demo sites, or something else?
- [ ] How many "coming soon" project slots to show in Works? (currently 2)
