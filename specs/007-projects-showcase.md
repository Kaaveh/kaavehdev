# 007 — Projects Showcase

## Context

Open-source is a differentiator (500+ combined stars). Projects come from
`src/data/projects.ts`: ComposeNews (377★), SDP-Compose (48★), optional
ComposeBreak (11★). Star counts should be **live at build time** with committed
fallbacks — never fetched client-side.

## Goal

`src/components/sections/Projects.astro` on `/` after Skills, anchor `#projects`,
with build-time GitHub star counts.

## Dependencies

002, 003.

## Requirements

1. Standard section header; then a card grid: **ComposeNews and SDP-Compose
   required; ComposeBreak optional** (include it — data exists — unless it
   crowds the layout).
2. Card contents: project name, description (from data), star count badge
   (★ + number), language tag (Kotlin, mono chip), and the GitHub link — the
   whole card clickable with a single real `<a>` (no nested/duplicated links).
3. **Build-time stars**: in component frontmatter (runs at build), fetch
   `https://api.github.com/repos/<owner>/<repo>` per project; use
   `stargazers_count` on success. On any failure (non-200, network, rate limit)
   or count lower than `fallbackStars`, use `fallbackStars` from data. Wrap in
   try/catch with a short timeout (~5 s via AbortController) — **a dead GitHub
   API must never fail or hang `npm run build`**. Round display ≥1000 as `1.2k`.
4. Motion: cards `.reveal` stagger; `.hover-lift` + accent border on hover.
   Reduced-motion: static.
5. Under the grid, a ghost link: **"More on GitHub →"** →
   https://github.com/Kaaveh.

## Design & UX notes

- ComposeNews is the flagship (teaching reference, 377★) — it may take a wider
  card or lead position.
- Star badge in accent — it's the proof point of the section.

## Acceptance criteria

- [ ] Cards render from data; star counts are live when the API is reachable
      (verify by comparing a build log/console note against the fallback).
- [ ] Build offline / with the fetch forced to fail still succeeds and shows
      fallback stars (377 / 48 / 11) — test by temporarily breaking the URL.
- [ ] Zero client-side JS shipped by this section.
- [ ] Each card is one link; card grid holds at 320 px / 768 px / 1440 px, both
      themes; reveal + reduced-motion behavior correct.

## Out of scope

Client-side/live star refresh, GitHub contribution graphs, pinned-repo API.
