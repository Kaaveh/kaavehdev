# 017 — Liquid Glass: Content Surfaces

## Context

Spec 016 built the glass material (tokens, `.glass`/`.glass-strong`, ambient
background, fallbacks) and migrated the site chrome. This spec finishes the
migration: every content surface on `/` and `/beyond` — cards, tiles, the
timeline, the footer — adopts the glass language, replacing flat `--surface`
fills, **without** giving back any of the performance or accessibility budget.
A page can hold one or two chrome-grade blurs cheaply; it cannot hold twenty —
so content glass is a deliberately lighter recipe with a sanctioned fallback.

## Goal

A visually unified Liquid Glass site: all content surfaces on both pages share
one glass card recipe with tuned hover/focus states, verified AA contrast, and
Lighthouse mobile ≥ 90 intact.

## Dependencies

016.

## Requirements

### Card recipe

- Add `.glass-card` to `global.css`: the `.glass` look but with
  `--glass-blur-sm` (8px) instead of chrome-grade blur, and `--radius-lg`.
  Cards are numerous and `backdrop-filter` cost scales with blurred area —
  content glass is the cheap grade by design.
- Cards carrying body-size text use the `--glass-bg-strong` fill, per 016's
  contrast rule.
- **No nested glass**: a glass element inside another glass element is
  forbidden (muddy visually, doubled blur cost). Inner inlays that today use
  `--surface-2` (e.g. project-card footers, YouTube facade chrome) become
  simple translucent fills — `color-mix` of the surface color, **no**
  `backdrop-filter` — since they sit on the card, not the page, and blur adds
  nothing there.
- Both fallbacks from 016 (`@supports` no-backdrop-filter,
  `prefers-reduced-transparency`) must cover `.glass-card` and the inlay fills,
  resolving to opaque `--surface` / `--surface-2`.

### Surface inventory

Migrate every opaque content-surface fill in components and pages. Known
instances (grep for `var(--surface` to confirm the list is complete at
implementation time):

| File | Surface |
|---|---|
| `sections/Projects.astro` | `.project-card` + its `--surface-2` footer inlay |
| `sections/Skills.astro` | skill group cards |
| `sections/Experience.astro` | timeline entry cards |
| `sections/Writing.astro` | article/talk cards |
| `sections/YouTube.astro` | `.channel-card` + `--surface-2` facade inlay |
| `sections/Education.astro` | education / certificate surfaces |
| `sections/Podcasts.astro` | `.podcast-tile` |
| `pages/beyond.astro` | `.interest-tile`, `.channel-tile` |
| `components/Footer.astro` | any surface fills |

- The Experience timeline's node rings (`box-shadow: 0 0 0 4px var(--bg)`) mask
  the timeline line with `--bg`; over the ambient layer this reads as a solid
  disc where an orb happens to sit. The orbs are subtle, so keeping `--bg` is
  acceptable — implementer judges by eye and records the call if changed.
- `ThemeToggle`, `Nav`, skip link, hero buttons were done in 016 — leave them.

### Hover & interaction

- Interactive cards keep `.hover-lift` (transform + `--glow` — the glow is
  identity, it stays) and add a **sheen**: on hover, brighten the glass border
  and/or specular highlight via border-color/box-shadow transition. No
  `backdrop-filter` in any transition (016 rule).
- The universal reduced-motion net already covers these; verify nothing new
  escapes it.
- Focus rings visible on every migrated surface in both themes.

### Performance (hard requirement)

- Verify Lighthouse (mobile) ≥ 90 in all categories on **both** pages of the
  built site.
- Scroll both pages end-to-end with DevTools performance tracing under a
  mid-tier mobile CPU throttle: no sustained frame-drops attributable to the
  glass layers.
- If the budget cannot hold with blurred cards, the **sanctioned fallback** is
  glass-lite for content: cards keep the translucent fill, border, and specular
  edge but drop `backdrop-filter` entirely (chrome from 016 keeps full glass).
  Record the measurement and the call in Implementation notes. Visual
  consistency never justifies a busted budget.

### Contrast

Same worst-case verification as 016: composite each card fill over the most
extreme ambient-layer color it can sit on, both themes; `--text`/`--text-2`
≥ 4.5:1, accent/UI usages ≥ 3:1, for every migrated surface. Record the pairs
in Implementation notes.

## Acceptance criteria

- [ ] No component or page still fills a content surface with opaque
      `var(--surface)` / `var(--surface-2)` (grep clean; sanctioned exceptions
      — e.g. timeline node rings, fallback blocks — noted).
- [ ] Both pages read as one consistent glass system in both themes at 320px,
      768px, and ≥ 1440px.
- [ ] Interactive cards lift with glow + sheen on hover; nothing moves under
      `prefers-reduced-motion: reduce`; focus rings visible on every card.
- [ ] Emulated `prefers-reduced-transparency: reduce` and a
      no-`backdrop-filter` check each yield fully readable opaque cards.
- [ ] Worst-case composite contrast verified AA for every migrated surface in
      both themes (documented in Implementation notes).
- [ ] Lighthouse (mobile) ≥ 90 in all categories on both built pages; scroll
      trace shows no glass-attributable jank (or the glass-lite fallback was
      taken and documented).
- [ ] `npm run build` clean.

## Out of scope

- Chrome surfaces (nav, overlay, toggle, CTAs) — done in 016.
- Layout, content, or IA changes; new sections.
- OG image refresh (possible follow-up outside this migration).
