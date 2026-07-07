# 005 — Experience Section

## Context

The core of the resume: Footballi and GityMarket, with impact-heavy bullets whose
metrics (55%, ~25%, 40%, …) deserve visual emphasis.

## Goal

`src/components/sections/Experience.astro` on `/` under the hero, anchor
`#experience`, rendering `src/data/experience.ts` as an animated vertical timeline.

## Dependencies

002, 003.

## Requirements

1. Section header pattern (reused by all later sections): mono `.section-label`
   kicker (e.g. `// experience`) + `<h2>` (e.g. "Where I've worked").
2. Vertical timeline: a gradient spine (the 002 signature gradient) with a node
   per role; roles ordered most recent first, from data.
3. Each entry: company + role, date range (mono), the one-line platform blurb
   (e.g. *Live-streaming sports platform, 10M+ MAU, real-time data.*), then the
   bullet list — bullet text verbatim from data.
4. **Metric emphasis**: numbers/percentages inside bullets (55%, ~25%, ~10%,
   ~20%, 40%, 10M+, 1,000+) rendered in accent color/weight. Implement via a
   `highlights`-aware data shape or a safe formatting helper — no fragile
   innerHTML regex over arbitrary strings; adjust `experience.ts` types if needed
   (note it in Implementation notes).
5. Motion: entries `.reveal` in with stagger as they scroll into view; subtle
   node/spine accent (e.g. node glow) on the entry under the cursor. All gated by
   reduced-motion.
6. Semantics: the timeline is a list (`<ol>`/`<ul>`) with headings per entry
   (`<h3>` company — role); dates in `<time>` where sensible.

## Design & UX notes

- Two employers only — give each room; this is not a cramped LinkedIn list.
- On mobile the spine moves to the left edge with content in a single column.

## Acceptance criteria

- [ ] Both roles render fully, bullets verbatim from `src/data/experience.ts`.
- [ ] Metrics visually emphasized without breaking copy or semantics (screen
      reader reads sentences naturally).
- [ ] Scroll-reveal stagger works; reduced-motion shows everything statically.
- [ ] Heading order on the page remains logical (h1 → h2 → h3).
- [ ] Layout holds at 320 px and 1440 px, both themes.

## Out of scope

Other sections; nav (013).
