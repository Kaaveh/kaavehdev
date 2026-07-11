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

- [x] Both roles render fully, bullets verbatim from `src/data/experience.ts`.
- [x] Metrics visually emphasized without breaking copy or semantics (screen
      reader reads sentences naturally).
- [x] Scroll-reveal stagger works; reduced-motion shows everything statically.
- [x] Heading order on the page remains logical (h1 → h2 → h3).
- [x] Layout holds at 320 px and 1440 px, both themes.

## Out of scope

Other sections; nav (013).

## Implementation notes

- **Metric emphasis uses an explicit `highlights` data shape, not regex.**
  `ExperienceEntry` gained an optional `highlights?: string[]` — the exact metric
  literals present in that entry's copy (`['10M+', '55%']` for Footballi;
  `['1,000+', '~25%', '~10%', '~20%', '40%']` for GityMarket). These aren't new
  facts, just a pointer at substrings already in the verbatim text. The spec's
  seven listed metrics are the full set emphasized; `~2 months` / `2026` were left
  plain to match the spec's explicit list and avoid over-highlighting.
- **`Highlighted.astro`** (new shared component) does the wrapping: it splits a
  string on those exact literals (longest-match, left-to-right — no regex over the
  copy, no `innerHTML`) and emits `<strong class="metric">` around each match with
  plain text nodes between, which Astro escapes. Reassembling the segments
  reproduces the source string character-for-character, so screen readers read each
  sentence unchanged; `<strong>` adds only inline emphasis. Applied to both the
  blurb and every bullet — the entry's highlight literals are unique enough within
  the entry that no false matches occur.
- **Timeline structure**: an `<ol role="list">` of `<li>` entries, each with an
  `<h3>` "Company — Role", a mono date line using `<time datetime="YYYY-MM">`
  (parsed from the "Month YYYY" data by a small controlled helper; current role
  renders a plain "Present"), the italic blurb, and a `<ul>` of bullets with an
  accent chevron marker. Heading order on the page stays h1 → h2 → h3.
- **Spine**: one continuous `var(--gradient)` line drawn as `.timeline::before`
  (violet at top → green at bottom across the whole rail), with a `mask-image`
  fade so the tail below the last node dissolves instead of cutting off. Nodes are
  gradient beads with a `box-shadow` ring in `--bg` so the line reads as passing
  behind them. The spine sits at the left edge on every width (single column
  throughout); desktop just widens the content indent. Spine top and node top
  share the same `em` offset (same font base) so they always align — verified node
  center vs. heading first-line center within ~2–5px at 320 and 1440.
- **Motion**: entries reveal with a per-index stagger (`data-reveal-delay`
  160/260) via the 002 primitive; the node under the cursor scales up and gains
  the `--glow` shadow. Both are fully gated by `prefers-reduced-motion: reduce`
  (reveal handled globally in 002; the node hover accent reset in this component).
- Verified via Chromium at 320 and 1440 in both themes: 1 `<h1>`, h2/h3 order
  correct, all seven metrics wrapped and colored `--accent` (700 weight,
  `tabular-nums`), zero horizontal overflow, and the reduced-motion state renders
  both entries statically with the spine fully drawn.
