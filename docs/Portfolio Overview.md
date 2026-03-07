# Portfolio Overview

## Goal
8 scaffolds in one repo — UI scaffolds + admin dashboards. Generate in batches due to token cost.

## Project
Single repo, each scaffold is a route/section. One deployment.

## Scaffolds

| # | Name | Type | Batch | Status |
|---|------|------|-------|--------|
| 1 | Card Shop (wedding / birthday / party) | Ecommerce | 1 | Execution — specs + design system done, building out pages |
| 2 | Hair Salon (female) | Booking | 1 | Not started |
| 3 | Ecommerce - Food | Ecommerce | 1 | Not started |
| 4 | Ecommerce - Floral | Ecommerce | 2 | Not started |
| 5 | Ecommerce - Phone / Tech | Ecommerce | 2 | Not started |
| 6 | Barbershop (male) | Booking | 2 | Not started |
| 7 | Admin Dashboard - Booking | Dashboard | 3 | Not started |
| 8 | Admin Dashboard - Ecommerce | Dashboard | 3 | Not started |

## Batch Strategy
- **Batch 1** (generate first — portfolio core): Card Shop, Hair Salon, Food Ecommerce. Most visual variety, covers common client types.
- **Batch 2** (add after): Floral, Phone/Tech Ecommerce, Barbershop. Fills out the range.
- **Batch 3** (defer until needed): Admin dashboards. Least visual, most functional — generate when a client conversation requires it.
- **DEADLINE:** Batch 1 MUST be completed before Monday (Mar 9) to serve as landing pages for aggressive prospect outreach.

## Backend Showcase (Phase 2 — starts after all 8 scaffolds are done)

This is a separate project from the scaffolds. The 8 scaffolds above are pure UI — no backend involved. Once those are done, this backend showcase is built as its own thing on top.

### What it is
A standalone page: **"What can I do?"** — a grid of interactive feature cards, each demonstrating one backend capability live. The visitor triggers it themselves and sees it work in real time. Not descriptions — actual running features.

### Phase rules
- **Phase 1 (now):** Build the 8 UI scaffolds. No backend, no feature cards. The showcase page can exist in the repo but cards are hidden until Phase 2.
- **Phase 2 (after scaffolds):** Build the NestJS backend + all feature cards together. Each card ships complete or not at all — no half-working demos.

### Stack & Hosting
- **Frontend:** portfolio site on Vercel, calls the NestJS API
- **Backend:** NestJS on a VPS

### Feature Cards (planned)
| Category | Feature | Demo interaction |
|----------|---------|-----------------|
| Performance | Caching | Call an API, toggle cache on/off, see response time difference |
| Performance | Compression | Send a payload, toggle gzip/brotli, see raw vs compressed size |
| Performance | Debounce | Type in a box, see raw API calls vs debounced side by side with call counter |
| Performance | Connection pooling | Send N concurrent requests with/without pooling, see wait time difference |
| Real-time | Public chat | Anyone on the page can type, everyone sees it live (WebSocket) |
| Real-time | SSE | Subscribe to a stream, receive live updates without WebSocket |
| Real-time | Chunked streaming | LLM-style token streaming vs waiting for full response — same content, visible latency gap |
| Real-time | Notifications | Trigger an event, receive a real notification |
| Search | Full-text vs semantic | Same query, results from both side by side — shows what keyword search misses |
| Reliability | Rate limiting | Hit a button repeatedly, watch the endpoint throttle and recover |
| Reliability | Circuit breaker | Call a flaky endpoint, watch it fail → open → half-open → close with state indicator |
| Reliability | Retry with backoff | Trigger a failing request, watch it retry with exponential backoff, see attempt log |
| Reliability | Optimistic UI | Toggle on/off with a simulated slow API — shows the UX difference immediately |
| Auth / Security | JWT lifecycle | Login, see encoded token, decode it live, watch it expire, trigger refresh |
| Auth / Security | CORS | Send requests from allowed vs blocked origins, see response header difference |
| Payments | Checkout | Full checkout flow with a test payment (Stripe test mode) |
| Jobs / Events | Background job queue | Submit a task, watch it move through queued → processing → done with live status |
| Jobs / Events | Webhook delivery | Trigger an event, watch it deliver, simulate failure + retry |
| Monitoring | Live metrics | Requests, latency, errors panel — updating in real time |
| Storage / Media | Image optimization | Upload an image, see WebP/AVIF output at multiple sizes with file size comparison |
| Storage / Media | Presigned URL | Generate a time-limited upload URL, watch it expire and reject after timeout |

### Notes
- No priority order yet — all cards are equal for now, pick when Phase 2 starts
- All cards should work without login — low friction, instant payoff

## Notes
- All scaffolds use the established pipeline: `/design` → `/design-system` → `/scaffold`
- Token cost is high — generate Batch 1 first, validate pipeline, then continue
- All projects are scaffolds — structure and UI, minimal logic

## Design Preferences
- Parallax hero = preferred hero design direction

## TikTok → Portfolio Funnel
TikTok bio links to **About Me** page, not homepage.

- **Homepage (Landing)** — professional face: normal format, showcases the scaffolds/works sections, CTAs, testimonials, etc.
- **About Me** — personal: absolutely separated from the landing page. Shares the same domain but strictly personal/not business. Who you are, what you find interesting, the kind of work you do and why. Portfolio pieces embedded naturally to match the personality TikTok visitors liked.

Visitor flow: funny clip → curious about the person → About Me keeps that energy → portfolio closes it. Works because the audience comes in through personality, not a service search. Bio copy direction: "I make websites, take a look: [link]" — soft signal, not a pitch.

> **DEADLINE**: The outstanding Batch 1 scaffolds AND this impressive About Me page MUST be built and live before Monday. Portfolio needs to land when they click.
