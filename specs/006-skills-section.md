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

- [ ] All 8 groups and every skill render, verbatim from data, in order.
- [ ] Grid holds at 320 px / 768 px / 1440 px in both themes.
- [ ] Hover states don't shift layout; chips are inert to keyboard/AT (plain
      list items).
- [ ] Reveal stagger works; reduced-motion static.

## Out of scope

Filtering/search, proficiency meters (explicitly unwanted — the resume doesn't
rank skills), other sections.
