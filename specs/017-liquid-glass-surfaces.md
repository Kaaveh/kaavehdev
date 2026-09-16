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

- [x] No component or page still fills a content surface with opaque
      `var(--surface)` / `var(--surface-2)` (grep clean; sanctioned exceptions
      — e.g. timeline node rings, fallback blocks — noted).
- [x] Both pages read as one consistent glass system in both themes at 320px,
      768px, and ≥ 1440px.
- [x] Interactive cards lift with glow + sheen on hover; nothing moves under
      `prefers-reduced-motion: reduce`; focus rings visible on every card.
- [x] Emulated `prefers-reduced-transparency: reduce` and a
      no-`backdrop-filter` check each yield fully readable opaque cards.
- [x] Worst-case composite contrast verified AA for every migrated surface in
      both themes (documented in Implementation notes).
- [x] Lighthouse (mobile) ≥ 90 in all categories on both built pages; scroll
      trace shows no glass-attributable jank (or the glass-lite fallback was
      taken and documented).
- [x] `npm run build` clean.

## Out of scope

- Chrome surfaces (nav, overlay, toggle, CTAs) — done in 016.
- Layout, content, or IA changes; new sections.
- OG image refresh (possible follow-up outside this migration).

## Implementation notes

### Card recipe — `.glass-card` / `.glass-card-strong`

Added to `global.css` per the spec: same look as `.glass` but at
`--glass-blur-sm` (8px) and `--radius-lg`. `.glass-card-strong` swaps in
`--glass-bg-strong`; assigned per card by whether it carries body-size prose
directly on the glass (not counting text on a nested opaque inlay):

| Card | Variant | Why |
|---|---|---|
| `.project-card` | strong | `.project-desc` paragraph |
| `.channel-card` (YouTube) | strong | `.channel-tagline` |
| `.podcast-tile` | strong | `.podcast-desc` (renders once descriptions exist — `TODO(Kaaveh)` in `data/podcasts.ts`) |
| `.channel-tile` (beyond) | strong | `.channel-tagline` |
| `.mentoring-stat` | strong | `.mentoring-label` |
| `.skill-group` | plain | only a mono heading sits on the glass; chip labels sit on the opaque inlay below |
| `.interest-tile` (beyond) | plain | one short bold label, no prose |

Both `@supports not (backdrop-filter)` and `prefers-reduced-transparency:
reduce` fallbacks from 016 were extended to cover `.glass-card` /
`.glass-card-strong`, resolving to opaque `--surface` — verified against the
built (minified) CSS, which keeps 016's nested-`@supports` structure (the
`or`-form rewrite that would drop the `-webkit-` branch on Safari ≤17 is
still avoided).

### Inlays — `--glass-inlay-bg`

A single token in `tokens.css`: `color-mix(in srgb, var(--surface-2) 72%,
transparent)`. Because it's built from `--surface-2`, one declaration is
correct in both themes with no `[data-theme='light']` override. No
`backdrop-filter` — these sit *inside* a `.glass-card`, and an ancestor with
backdrop-filter is already a backdrop root, so a nested blur would only
re-blur the card's own flat fill (a no-op that still costs a pass — the same
reasoning 016 used for Nav's controls). Applied to:

- `.lang-chip` (Projects footer)
- `.chip` (Skills — 46 chips across 8 groups; at `--glass-blur-sm` each,
  blurring all of them individually would have been the "twenty blurs" case
  the spec warns against, hence the inlay treatment instead of nested glass)
- `.video-frame` (YouTube facade chrome — named explicitly in the spec)

Both fallbacks override the token to the fully opaque `--surface-2` (`:root {
--glass-inlay-bg: var(--surface-2) }` inside the same `@supports`/`@media`
blocks that flatten `.glass-card`), verified both by rendered pixel (exactly
`rgb(26 32 41)` dark / `rgb(241 244 249)` light — `--surface-2`'s literal
values) and in the built CSS.

### Sheen

Reused 016's own hero-CTA pattern rather than inventing a new one:
`.glass-card.hover-lift:hover/:focus-visible { box-shadow: var(--glass-highlight), var(--glow); }`
— `.hover-lift` alone swaps the whole box-shadow for `--glow`, which would
erase the specular top edge; keeping both is the sheen. Several cards
additionally already transition `border-color` to `--accent` on hover
(`.project-card`, inherited from 007) — left as-is, it's the same
"brighten the border" idea the spec asks for. No `backdrop-filter` in any
transition. Markup didn't need new `hover-lift` placement — every card that
should sheen already carried the class from its own spec (007/009/012/011),
and non-interactive cards (`.mentoring-stat`, private `.project-card`s)
correctly never did.

### Sanctioned no-ops

- **Experience timeline node ring** stays `box-shadow: 0 0 0 4px var(--bg)`,
  per the spec's own allowance — the ambient orbs are subtle enough it never
  reads as a disc sitting on one. No other surface in that section needed
  migration (the timeline has no card fill at all).
- **Education** and **Footer** have no opaque content-surface fill to
  migrate — Education's three groups were built "no per-group cards" (010's
  own words), and Footer only carries a `border-top`. Confirmed by grepping
  the built source for `var(--surface` before and after: the only remaining
  hit outside the glass system itself is `Nav.astro`'s skip-link, explicitly
  named as a 016 leftover to leave alone.

### Contrast — verified pairs

Same worst-case methodology as 016: headless Chromium renders the real
built site, each measured element's own text is hidden (not the page's), its
content-box is screenshotted, and every pixel is scored against that
element's foreground colour (worst pixel wins). Both themes, 375×812 and
1440×900. 76/76 checks pass.

| Surface / pair | Dark | Light | Min |
|---|---:|---:|---|
| `.project-card` (strong) vs `--text` (name) | 16.75–17.63 | 17.36–18.07 | 4.5 |
| `.project-card` (strong) vs `--text-2` (desc) | 7.32–7.47 | 7.43–7.51 | 4.5 |
| `.project-card` (strong) vs `--accent` (stars) | 10.17–10.33 | 4.94–5.01 | 4.5 |
| `.lang-chip` inlay vs `--text-2` | 5.76 | 5.83 | 4.5 |
| `.skill-group` (plain) vs `--text` (title) | 16.82–17.16 | 17.84–17.96 | 4.5 |
| `.chip` inlay vs `--text-2` | 5.76 | 5.83 | 4.5 |
| `.channel-card` (strong) vs `--text` (name) | 16.75–16.87 | 17.91–18.07 | 4.5 |
| `.channel-card` (strong) vs `--text-2` (tagline) | 7.42–7.48 | 7.45–7.51 | 4.5 |
| `.mentoring-stat` (strong) vs `--text-2` (label) | 7.40–7.42 | 6.85–7.09 | 4.5 |
| `.podcast-tile` (strong) vs `--text` (name) | 16.75–16.87 | 17.91–18.07 | 4.5 |
| `.podcast-tile` (strong) vs `--accent` (listen) | 10.18–10.33 | 4.97–5.01 | 4.5 |
| `.interest-tile` (plain) vs `--text` (label) | 17.04–17.16 | 17.88–17.96 | 4.5 |
| `.channel-tile` beyond (strong) vs `--text` (name) | 16.75–16.87 | 17.91–18.07 | 4.5 |
| `.channel-tile` beyond (strong) vs `--text-2` (tagline) | 7.37–7.48 | 7.45–7.51 | 4.5 |
| `.channel-tile` beyond (strong) vs `--accent` (visit) | 10.18–10.33 | 4.96–5.01 | 4.5 |
| Focus ring `--accent-2` on `.project-card` | 4.20 | 5.79 | 3.0 |
| Focus ring `--accent-2` on `.channel-cta` | 3.95–4.00 | 5.95–5.99 | 3.0 |
| Focus ring `--accent-2` on `.podcast-listen` | 3.97–4.00 | 5.94–5.99 | 3.0 |
| Focus ring `--accent-2` on `.channel-visit` | 3.97–4.00 | 5.94–5.99 | 3.0 |

`.mentoring-stat` and `.interest-tile` have no `<a>`/focusable child of their
own to ring-check (the card is decorative chrome around a stat or a plain
label); every other migrated card either is itself a link (`.project-card`)
or hosts one that was checked.

Two measurement pitfalls worth recording since they'd otherwise look like
real regressions: (1) decorative `::before` group-marker swatches (Skills,
Writing, Education headings) share their heading's bounding box but sit
beside the text, never under it — scoring the full box against those pixels
produces a false low ratio; excluded from the sample. (2) the site's own
`scroll-behavior: smooth` animates any programmatic scroll, so a fixed
post-scroll wait can sample a mid-scroll frame; the verification forced
`prefers-reduced-motion: reduce` (which the site's own CSS turns into
`scroll-behavior: auto`) to make every scroll instant.

### Performance

Lighthouse (mobile emulation, `npx lighthouse@latest` against the production
build), unchanged from 016's baseline:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|:-:|:-:|:-:|:-:|
| `/` | 99 | 100 | 100 | 100 |
| `/beyond` | 99 | 100 | 100 | 100 |

Scroll trace: both pages, both themes, full-height programmatic scroll under
a 4× CPU throttle (CDP `Emulation.setCPUThrottlingRate`), frame-to-frame
gaps measured via `requestAnimationFrame`. Zero frames over 50ms (20fps) in
any run — worst single gap 20.2ms. The 8px content-card blur (vs 016's 16px
chrome blur) held the budget with no glass-lite fallback needed.

### Behavioural verification

`prefers-reduced-transparency: reduce` (real CDP media emulation, since
Playwright's `emulateMedia` has no built-in option for it) resolves every
migrated card and inlay to a fully opaque fill with `backdrop-filter: none`
— 20/20 checks pass across both themes. `prefers-reduced-motion: reduce`
leaves the new `.glass-card` transitions at `0.01ms` (the universal net) and
zero running animations. Both pages visually checked at 320px/768px/1440px
in both themes.
