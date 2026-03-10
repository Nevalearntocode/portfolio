# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

> You are permitted to append entries to the ## Learned section of this file. No other section may be modified.

## Commands

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # eslint
```

## Architecture

**This is a personal portfolio site** — not a multi-page app with shared state. Pages are mostly independent. The Works section links *out* to separately deployed scaffold projects; nothing is embedded here.

**Two distinct pages:**
- `/` — Homepage (bento grid). Professional face: showcases work, skills, CTAs.
- `/about` — Personal page for TikTok funnel traffic. Separate vibe from homepage — personal, not business.

**Homepage design:** `plans/plan-6.md` is the spec. Pre-built components live in the `landing-page` repo at `components/plan-6/` and `app/plan-6/`. When copying them here, all paths must be under `src/` — the `@/` alias maps to `./src/`, not the project root.

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
│   ├── HeroCard.tsx            # Sage green intro block
│   ├── WorksCard.tsx           # Project grid with dialog previews
│   ├── SkillsCard.tsx          # Capabilities grid
│   ├── ContactCard.tsx         # Unified email/social/phone footer
│   ├── BentoGrid.tsx           # Layout Orchestrator
│   └── *.tsx                   # CtaRow, Pricing, Process, etc.
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
