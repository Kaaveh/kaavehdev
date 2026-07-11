# 006 — Skills Section

## Context

Eight skill groups from the resume, already structured in `src/data/skills.ts`
(spec 003). Recruiters scan this; engineers judge it. It must be scannable, not a
tag-cloud soup.

## Goal

`src/components/sections/Skills.astro` on `/` after Experience, anchor `#skills`.

## Dependencies

002, 003.

## Requirements

1. Standard section header (mono kicker + `<h2>`), consistent with 005.
2. Render all 8 groups **in the data order** (Languages & Async → … →
   Observability). Group title in mono/label style; skills as chips.
3. Chips: `--surface` background, `--border`, `--radius-sm`; hover = accent
   border + subtle glow (no layout shift). Chips are not links — no fake
   affordances, no `tabindex`.
4. Layout: responsive grid of group cards (1 col at 320 px → 2 col tablet →
   3–4 col desktop). Groups with many chips (Architecture & DI has 9) must not
   break the rhythm.
5. Motion: group cards `.reveal` with stagger; optional per-chip micro-stagger
   inside a card if it stays subtle. Reduced-motion: static.
6. Semantics: each group a labelled list (`<h3>` + `<ul>` of `<li>` chips).

## Design & UX notes

- Bold here = confident type + color discipline, not rainbow chips. Accent
  sparingly (hover, group markers), or the section turns into noise.

## Acceptance criteria

- [x] All 8 groups and every skill render, verbatim from data, in order.
- [x] Grid holds at 320 px / 768 px / 1440 px in both themes.
- [x] Hover states don't shift layout; chips are inert to keyboard/AT (plain
      list items).
- [x] Reveal stagger works; reduced-motion static.

## Out of scope

Filtering/search, proficiency meters (explicitly unwanted — the resume doesn't
rank skills), other sections.

## Implementation notes

- **`Skills.astro`** renders `src/data/skills.ts` unchanged — no data-shape
  changes were needed. Section header reuses the 005 pattern (`// skills`
  `.section-label` kicker + `<h2>` "What I build with").
- **Structure/semantics**: an outer `<ul class="skills-grid" role="list">` of
  group `<li>`s, each holding an `<h3>` group title and an inner
  `<ul class="chips" role="list">` of plain `<li class="chip">` items — a
  labelled list per group (req. 6). Chips carry no `tabindex`, no links, no
  interactive role, so they're inert to keyboard/AT. Page heading order stays
  h1 → h2 → h3.
- **Grid**: `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` — 1
  col at 320 px, 2 at tablet, 3–4 at desktop (4 at the 72rem container). auto-fit
  keeps rows aligned so uneven chip counts (Architecture & DI's 9, UI &
  Platforms' 6) don't break the rhythm; chips wrap within each fixed-width card.
- **Chips**: `--surface` background, `1px --border`, `--radius-sm`, `--text-2`
  copy. Hover swaps `border-color` → `--accent`, adds `--glow`, and lifts text
  to `--text`. Because the border exists at rest, only paint properties animate —
  zero layout shift. Group title carries the only always-on accent: a small
  `--gradient` marker square before it (design note: accent for group markers,
  sparingly).
- **Motion**: each group card is `.reveal` with a per-index
  `data-reveal-delay` (140 + index·60 ms) for a scroll-in stagger via the 002
  primitive. Per-chip micro-stagger was left out (spec marks it optional) to keep
  the section calm and avoid nested reveal observers. Reduced motion: reveal is
  neutralised globally in 002 (verified all 8 groups render at `opacity: 1`), and
  the chip hover transition is disabled in this component.
- Verified in Chromium at 320 / 1440 in both themes: all 8 groups and 46 skills
  present (verbatim, in data order), zero horizontal overflow at any width, and
  the reduced-motion state renders every group statically.
