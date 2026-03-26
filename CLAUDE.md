# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

> You are permitted to append entries to the ## Learned section of this file. No other section may be modified.

## Architecture

**This is a personal portfolio site** — not a multi-page app with shared state. Pages are mostly independent. The Works section links *out* to separately deployed scaffold projects; nothing is embedded here.

**Two distinct pages:**
- `/` — Homepage (editorial, dark-only). Professional face: full-bleed video hero, skills, works, dot grid, process, pricing, CTA.
- `/about` — Personal page for TikTok funnel traffic. Separate vibe from homepage — personal, not business.

**Homepage design:** `plans/design-discussion.md` is the spec. Dark-only (forcedTheme="dark"). Section-based layout, no bento grid.

**shadcn style is `radix-nova`** — not the standard `default` or `new-york`. Don't run `shadcn init` again; it will overwrite the style. Add components with `npx shadcn@latest add <component>` only.

**Tailwind 4** — no `tailwind.config.js`. All CSS custom properties and theme overrides go in `src/app/globals.css`. The plan-6 design tokens (e.g. `--accent: #a3b899` sage green) belong there too.

## Project Structure

```text
src/
├── app/
│   └── [locale]/
│       ├── about/page.tsx      # Personal immersive archive route
│       ├── works/page.tsx      # Dedicated works/projects route
│       ├── layout.tsx          # Root layout with i18n & ThemeProvider
│       ├── page.tsx            # Homepage (Bento Grid)
│       └── portfolio.css       # Homepage-specific styles
├── components/                 # React components
│   ├── about-room/             # Immersive archive specific components
│   ├── ui/                     # shadcn/ui (radix-nova style)
│   ├── HeroSection.tsx         # Full-bleed video hero
│   ├── SkillsSection.tsx       # Split: capability pills + demo video
│   ├── WorksSection.tsx        # Project cards with .webm hover
│   ├── CurrentlyBuildingSection.tsx  # Active projects grid
│   ├── DotGrid.tsx             # Interactive dot grid (cursor pull)
│   ├── ProcessSection.tsx      # 3-step process with large numbers
│   ├── PricingSection.tsx      # 3-tier pricing
│   ├── CtaSection.tsx          # Full-width CTA
│   ├── WindingLine.tsx         # SVG scroll-progress winding line
│   ├── CustomCursor.tsx        # Pulsing ring cursor (desktop only)
│   ├── Navbar.tsx              # Floating pill, scroll-aware opacity
│   └── Footer.tsx              # Dark copyright bar
├── data/                       # Localized data (owner.ts, about-room.json)
├── hooks/                      # use-mobile.ts, etc.
├── i18n/                       # routing.ts, request.ts
├── lib/                        # placeholder-vi.ts (mock project data)
├── messages/                   # en.json, vi.json (next-intl messages)
└── types/                      # about-room.ts, etc.
```

## Learned

### Context
- `@/` alias resolves to `./src/` — all feature code goes under `src/app/`, `src/components/`, `src/lib/`. Stray `components/` or `lib/` directories at the project root are artifacts from a bad copy attempt and should be deleted.
- `landing-page` repo (`C:/Users/MSI/Documents/GitHub/landing-page`) is where design variants were explored. Plan-6 won. Its files are the source of truth for the homepage build.
- The pre-built plan-6 source imports from `@/lib/placeholder-vi` — that module holds typed mock data (`works`, `testimonials`, `owner`). It needs to live at `src/lib/placeholder-vi.ts`.
- shadcn components are already extensively installed (full suite in `src/components/ui/`). Check there before adding new ones.
- `src/app/globals.css` is the only stylesheet entry point. Plan-scoped CSS (like `plan6.css` from the landing-page repo) should either be inlined there or imported from the page file.
- `next-themes`, `framer-motion`, and `@faker-js/faker` are already installed.

### Failures
<!-- Recurring agent mistakes and their corrections.
     Each entry: short description + pointer to .claude/failures/<slug>.md
     Only log when you understand the pattern, not just that something went wrong. -->
