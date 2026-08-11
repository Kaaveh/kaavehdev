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

- [x] Cards render from data; star counts are live when the API is reachable
      (verify by comparing a build log/console note against the fallback).
- [x] Build offline / with the fetch forced to fail still succeeds and shows
      fallback stars (377 / 48 / 11) — test by temporarily breaking the URL.
- [x] Zero client-side JS shipped by this section.
- [x] Each card is one link; card grid holds at 320 px / 768 px / 1440 px, both
      themes; reveal + reduced-motion behavior correct.

## Out of scope

Client-side/live star refresh, GitHub contribution graphs, pinned-repo API.

## Implementation notes

- **`Projects.astro`** renders `src/data/projects.ts` unchanged and is composed
  on `/` after `Skills` (anchor `#projects`). Header reuses the 005/006 pattern
  (`// projects` `.section-label` kicker + `<h2>` "Open source"). All three cards
  (ComposeNews, SDP-Compose, ComposeBreak) render — the layout has room, so the
  optional card was kept.
- **Build-time stars** live entirely in the frontmatter (runs at build, ships no
  JS). `resolveStars()` fetches `api.github.com/repos/<repo>` per project behind a
  5 s `AbortController` timeout, resolves all repos in parallel, and never throws:
  any non-200 / network error / timeout, or a live count that isn't strictly
  greater than the committed `fallbackStars`, falls back to `fallbackStars`. So a
  dead, slow, or rate-limited GitHub API can neither fail nor hang `npm run build`.
  A `console.log` note per project (`live`/`fallback`) makes the source verifiable
  in the build log. `formatStars()` renders ≥1000 as `1.2k`.
- **Verified**: `npm run build` succeeds. In this sandbox `api.github.com` is
  blocked by the network policy, so the build log printed the fallback path
  (`377 / 48 / 11`) and stayed fast — the exact offline/failure case in the
  acceptance criteria, proven without needing to break the URL. The live branch
  runs on Cloudflare's deploy build where the API is reachable.
- **One link per card**: each card *is* a single `<a class="project-card">`
  (name, star badge, description, language chip, and a decorative `GitHub ↗`
  hint are all inside it) — no nested or duplicated anchors. Below the grid a
  ghost `More on GitHub →` link points at https://github.com/Kaaveh.
- **Layout**: 1 col at 320 px; from 768 px a 2-col grid where the flagship
  (ComposeNews, first in data) spans both columns as a full-width lead, and the
  two remaining cards share the row below. Footers are pinned to the card bottom
  (`margin-block-start: auto`) so uneven descriptions keep the chip/link row
  aligned. Star badge is the section's only always-on accent (the proof point).
- **Motion**: cards `.reveal` with a per-index `data-reveal-delay` stagger and
  `.hover-lift`; hover/focus also lifts the border to `--accent`. Because the
  1px border exists at rest, hover only repaints — no layout shift. Reduced
  motion is neutralised by the 002 primitives plus a local override on the card /
  link transitions; verified in Chromium that every card renders at `opacity: 1`
  and static under `prefers-reduced-motion: reduce`.
- Checked in Chromium at 320 / 768 / 1440 in both themes: no horizontal overflow
  at any width, all three cards + star badges + Kotlin chips present, reveal
  stagger fires on scroll (6/6 `is-visible`), and the section ships zero
  client-side JS (no `<script>` in the rendered section).

### Amendment 2026-08-11 — private projects (ComposeBreak → Komposer)

Content update requested by Kaaveh: **ComposeBreak was replaced by Komposer** in
`src/data/projects.ts`. Komposer's repository is **private** (confirmed by Kaaveh;
both `github.com/Kaaveh/Komposer` and the `github.com/Gity-Market/Komposer` slug
printed on the resume PDF return 404 to a logged-out visitor), which requirement 2
above did not anticipate — it assumed every card has a public GitHub URL and a
star count. Rather than ship a card whose link 404s, the deviation:

- **`Project.repo` / `url` / `fallbackStars` are now optional**, plus a new
  `isPrivate?: boolean`. A project with no public repo renders as a plain `<div>`
  card with **no link, no click affordance, and no star badge** — the same
  "never a guessed URL" rule spec 008 already applies to talks with no recording.
  A `Private repo` chip sits where `GitHub ↗` normally does, so the absent link
  reads as deliberate rather than broken.
- `resolveStars()` short-circuits to `stars: null` for such a project without
  touching the network; the build log prints `no public repo` instead of
  `live`/`fallback`. Requirement 3's timeout/fallback behaviour is unchanged for
  the two public cards.
- Hover/focus affordances (`border-color`, `.project-link` accent) are now scoped
  to `a.project-card`, so the private card has no interactive styling.
- The `<h2>` changed from **"Open source"** to **"Projects"** — the section is no
  longer exclusively open source, and "Projects" already matches the nav label.
- Komposer's description comes from Kaaveh's own README/resume wording; no star
  count is invented for it.

**Verified**: `npm run build` → `astro check` 0 errors / 0 warnings; build log
shows `ComposeNews: 377★ (fallback) · SDP-Compose: 48★ (fallback) · Komposer: —★
(no public repo)` (api.github.com is blocked in this sandbox, so the two public
cards took the offline path as before). Rendered HTML confirms the Komposer card
is a `<div class="project-card">` with no `href`, no `star-badge`, and the
`Private repo` chip; the two public cards still render as single `<a>` elements
with their star badges.
