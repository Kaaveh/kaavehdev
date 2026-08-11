# 016 — Liquid Glass: Foundation & Site Chrome

## Context

The site migrates its visual identity to a **Liquid Glass** look — the translucent
material language Apple introduced across iOS 26 / macOS Tahoe: frosted,
light-refracting surfaces with a specular top edge, floating above a colorful
background. We adapt the *language* to the web within this site's constraints
(fully static, CSS-only effects, WCAG AA, Lighthouse mobile ≥ 90). We do **not**
chase pixel-faithful refraction (no SVG displacement-map filters — fragile and
expensive cross-browser); `backdrop-filter` blur + saturation + a specular edge is
the web-honest version.

The migration is two specs. This one builds the material and migrates the
**chrome layer** — nav, controls, overlays, CTAs — which is where Apple's HIG
actually puts glass. Spec 017 then sweeps the content surfaces (cards/tiles).

Everything else established by 000/002 stays: green+violet identity, dark-first
theming, fonts, type scale, motion primitives, layout, content, IA. This spec
restyles surfaces; it changes nothing about what the site says or how it is
organized.

## Goal

A reusable glass material (tokens + utilities), an ambient background that gives
the glass something visible to blur, and the site chrome (header, mobile menu,
theme toggle, hamburger, hero CTAs) rendered in that material — with airtight
fallbacks and zero regression of the accessibility and performance budgets.

## Dependencies

002 (tokens/theming), 013 (nav), 015 (budgets are green; this spec must keep
them green).

## Requirements

### Ambient background layer

Glass only reads as glass when something colorful sits behind it. Today `--bg` is
flat, so blur would be invisible.

- Add a fixed, full-viewport decorative layer behind all content, mounted once in
  `Base.astro` (`aria-hidden="true"`, `pointer-events: none`, behind `<main>` in
  stacking order). Painted with 2–3 large, very soft radial-gradient orbs of the
  identity colors over `--bg` — violet `--accent-2` dominant, green `--accent`
  secondary, echoing the signature gradient.
- Pure CSS gradients: no images, no JS, no extra requests.
- **Subtlety is the bar**: body text rendered directly over the *most colorful
  point* of this layer must still be ≥ 4.5:1 in both themes. Start around
  10–16% orb opacity (dark) / 8–12% (light) and tune with contrast checks.
- Optional: an extremely slow drift of the orbs (≥ 60s cycle, `transform` only,
  no filter/opacity animation), strictly behind
  `prefers-reduced-motion: no-preference`. Skip it entirely if it costs
  measurable scroll/paint performance — a static layer is fully acceptable.

### Glass tokens — `src/styles/tokens.css`

Extend both theme blocks (exact alphas may be tuned; contrast below is the hard
constraint):

| Token | Dark (default) | Light |
|---|---|---|
| `--glass-bg` | translucent surface, e.g. `rgb(18 22 31 / 0.55)` | e.g. `rgb(255 255 255 / 0.55)` |
| `--glass-bg-strong` | more opaque for text-dense surfaces, e.g. `/ 0.78` | e.g. `/ 0.82` |
| `--glass-border` | light edge, e.g. `rgb(255 255 255 / 0.12)` | e.g. `rgb(18 22 31 / 0.10)` |
| `--glass-highlight` | specular inset top edge as a box-shadow value, e.g. `inset 0 1px 0 rgb(255 255 255 / 0.10)` | e.g. `inset 0 1px 0 rgb(255 255 255 / 0.80)` |
| `--glass-shadow` | soft ambient drop shadow | lighter equivalent |
| `--glass-blur` | `16px` (chrome-grade) | same |
| `--glass-blur-sm` | `8px` (reserved for 017's cards) | same |
| `--glass-saturate` | `1.4` | same |

Also add radii — Liquid Glass is rounder than the current system:
`--radius-lg: 24px` and `--radius-full: 999px` (controls become capsules and
circles). Existing `--radius`/`--radius-sm` stay for anything not migrated yet.

### Material utilities — `src/styles/global.css`

- `.glass`: `background: var(--glass-bg)`; `backdrop-filter` (+
  `-webkit-backdrop-filter`) `blur(var(--glass-blur)) saturate(var(--glass-saturate))`;
  `border: 1px solid var(--glass-border)`;
  `box-shadow: var(--glass-highlight), var(--glass-shadow)`.
- `.glass-strong`: same, with `--glass-bg-strong` — required wherever the surface
  carries body-size text.
- **Fallbacks** (both mandatory, both resolving to fully opaque, fully readable
  surfaces):
  - `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))`
    → `background: var(--surface)`, no blur.
  - `@media (prefers-reduced-transparency: reduce)` → `background: var(--surface)`,
    no blur. This is the web analogue of Apple's "Reduce Transparency" and gets
    the same respect `prefers-reduced-motion` already gets.
- **Never animate `backdrop-filter`** — it forces full repaints. Transitions on
  glass elements may animate transform, box-shadow, border-color, and
  background-color only. The existing `.site-header` rule transitions
  `backdrop-filter`; remove that as part of the nav migration.

### Contrast (hard requirement — the crux of glass)

A translucent surface's effective background is the glass fill composited over
whatever sits behind it. Verify AA the way 002 did, but against the **worst
case**: composite `--glass-bg` (and `-strong`) over the most extreme
ambient-layer color that surface can sit on, in both themes.

- `--text` and `--text-2` ≥ 4.5:1 on every glass surface that carries them;
  accent/UI usages ≥ 3:1.
- If a pair fails on `.glass`, that context must use `.glass-strong` (or the
  alphas get bumped) — never ship the failing pair.
- Record every verified pair in this spec's Implementation notes, like 002 did.

### Chrome migration

- **Header (`Nav.astro`)**: from a full-width bar to a **floating glass
  capsule** — inset from the viewport edges (≈ `--space-3` top/sides), max-width
  as today, `--radius-full`, `.glass` material. It is glass from the start (it
  floats over the ambient layer even at scroll 0), so the sentinel/`is-scrolled`
  logic now only deepens `--glass-shadow` rather than toggling the background.
  Scroll-spy, skip link, wordmark, and all keyboard behavior are untouched.
  Re-check `scroll-margin-top` on `section[id]` against the new header geometry.
- **Mobile menu overlay**: from opaque `--bg` to a full-viewport glass sheet
  (`.glass-strong`; a heavier blur, e.g. 24px, is fine here — it is one layer).
  Focus trap, scroll lock, staggered link entrance all unchanged; link contrast
  on the sheet AA in both themes.
- **ThemeToggle + hamburger**: circular glass buttons (`--radius-full`),
  keeping the ≥ 44px hit target.
- **Hero CTAs**: `.btn-ghost` becomes a glass capsule. `.btn-primary` keeps its
  identity gradient fill but adopts `--radius-full` and the specular inset
  highlight, so both buttons read as one glass family.
- Focus rings (`--accent-2` outline) must remain clearly visible on every glass
  surface in both themes — verify, don't assume.

### What must not change

Theme resolution + the circular-reveal theme swap (002 Implementation notes),
scroll-reveal primitives, the universal reduced-motion net, fonts, layout,
content, IA, and every budget in 000.

## Acceptance criteria

- [ ] Ambient background renders in both themes; body text over its most
      colorful region measures ≥ 4.5:1 (verified programmatically; pairs
      recorded in Implementation notes).
- [ ] `.glass` / `.glass-strong` utilities exist with specular edge, blur +
      saturate, and both fallbacks (no `backdrop-filter` support;
      `prefers-reduced-transparency: reduce`) resolving to opaque `--surface`.
- [ ] Header is a floating glass capsule at mobile and desktop widths;
      scroll-spy, skip link, and keyboard navigation still work; anchored
      sections still land clear of it.
- [ ] Mobile menu is a glass sheet; focus trap and scroll lock unchanged; link
      contrast AA in both themes.
- [ ] ThemeToggle and hamburger are circular glass buttons ≥ 44px; hero CTAs
      are capsules; focus rings visible on all glass surfaces in both themes.
- [ ] No transition or animation touches `backdrop-filter`; with emulated
      `prefers-reduced-motion: reduce` nothing moves (including any ambient
      drift).
- [ ] Emulated `prefers-reduced-transparency: reduce` and a no-`backdrop-filter`
      check each yield fully readable opaque surfaces.
- [ ] Both themes checked at 320px and ≥ 1440px; the circular theme reveal
      still works.
- [ ] Lighthouse (mobile) ≥ 90 in all categories on the built site.
- [ ] `npm run build` clean.

## Out of scope

- Content surfaces — cards, tiles, timeline, footer (spec 017).
- Any layout, copy, or content change.
- Pixel-faithful refraction (SVG displacement/distortion filters).
- Refreshing the OG image (spec 014's asset) to the new identity — possible
  follow-up, not this spec.
