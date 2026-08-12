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

- [x] Ambient background renders in both themes; body text over its most
      colorful region measures ≥ 4.5:1 (verified programmatically; pairs
      recorded in Implementation notes).
- [x] `.glass` / `.glass-strong` utilities exist with specular edge, blur +
      saturate, and both fallbacks (no `backdrop-filter` support;
      `prefers-reduced-transparency: reduce`) resolving to opaque `--surface`.
- [x] Header is a floating glass capsule at mobile and desktop widths;
      scroll-spy, skip link, and keyboard navigation still work; anchored
      sections still land clear of it.
- [x] Mobile menu is a glass sheet; focus trap and scroll lock unchanged; link
      contrast AA in both themes.
- [x] ThemeToggle and hamburger are circular glass buttons ≥ 44px; hero CTAs
      are capsules; focus rings visible on all glass surfaces in both themes.
- [x] No transition or animation touches `backdrop-filter`; with emulated
      `prefers-reduced-motion: reduce` nothing moves (including any ambient
      drift).
- [x] Emulated `prefers-reduced-transparency: reduce` and a no-`backdrop-filter`
      check each yield fully readable opaque surfaces.
- [x] Both themes checked at 320px and ≥ 1440px; the circular theme reveal
      still works.
- [x] Lighthouse (mobile) ≥ 90 in all categories on the built site.
- [x] `npm run build` clean.

## Out of scope

- Content surfaces — cards, tiles, timeline, footer (spec 017).
- Any layout, copy, or content change.
- Pixel-faithful refraction (SVG displacement/distortion filters).
- Refreshing the OG image (spec 014's asset) to the new identity — possible
  follow-up, not this spec.

## Implementation notes

### Ambient background: two static orbs, not three drifting ones

- **Two orbs, not three.** The spec allows 2–3. Three could not be placed so
  that no pair overlaps at every viewport: at 768×900 the centre orb's visible
  disc met the bottom-left one, and **where two orbs overlap their tints
  compound**, which the light theme has no contrast budget for (measured: light
  `--accent` on the overlap fell to 4.35:1 at 768×400 and 1024×600). Two orbs on
  opposite diagonals — violet top-right dominant, green bottom-left secondary —
  never overlap, so the layer's peak colour is always a single orb's alpha.
- **Sized in `vmin`, not `vw`.** A `vw`-sized orb on a short landscape viewport
  (768×400) is taller than the screen, which pulled the two together again.
  `vmin` keeps them proportionate to the smaller axis.
- **Static, no drift.** The spec makes the slow drift optional and says to skip
  it if it costs paint. It does, structurally: the header capsule is a
  `backdrop-filter` element that sits over this layer permanently, so any
  animation behind it forces the blurred region to re-composite every frame for
  the life of the page — an idle cost on every page, not just during motion.
  A static layer is explicitly sanctioned, and the hero keeps spec 004's own
  drifting orbs, so the animated moment is not lost.
- **Alphas** (dark / light): violet `0.14` / `0.045`, green `0.10` / `0.085`.
  Dark sits mid-band. **Light violet is well below the spec's suggested 8–12%**,
  deliberately: violet is a dark hue on a white page, and spec 002 chose
  `--accent: #0b8043` because it clears 4.5:1 on flat `--bg` by only 0.35
  (4.85:1). A 10% violet wash dropped `.section-label` to **4.21:1** — a real
  regression, caught by the sweep. Even at the band's 8% floor it measured
  4.38:1. Green is a light hue and costs far less, so it stays near the band.
  The spec's contrast rule is the hard constraint and the 8–12% figure is a
  starting point, so the alphas were tuned until the peak passed.
- Mounted once in `Base.astro` at `z-index: -1` (above the canvas background,
  below every in-flow element), `aria-hidden`, `pointer-events: none`,
  `contain: strict`. Pure CSS gradients — no images, no JS, no extra requests.

### Tokens

Shipped as the spec's table, with two adjustments and one addition:

- **Light `--glass-bg` is `0.68`, not `0.55`.** At 0.55 the hero ghost CTA's
  `--accent` label measured 4.54:1 — passing by 0.04, too thin to defend
  against a viewport change. 0.68 puts it at 4.89:1. Dark stays at 0.55 (that
  label measures 10.66:1 there).
- **`--glass-shadow-lifted` added** (dark `0 12px 40px rgb(0 0 0 / 0.5)`, light
  `0 12px 40px rgb(18 22 31 / 0.16)`). The scrolled header needs a deeper
  shadow, and the spec requires that scrolling deepen `--glass-shadow` rather
  than toggle a background. `.site-header.is-scrolled .nav` simply reassigns
  `--glass-shadow: var(--glass-shadow-lifted)`, so `.glass`'s existing
  `box-shadow` re-resolves and transitions — no second box-shadow declaration.
- `--radius-lg: 24px` and `--radius-full: 999px` added; `--radius`/`--radius-sm`
  untouched.

### `@supports` fallback survives minification

Written as **nested** `@supports` blocks rather than the spec's
`not ((backdrop-filter: …) or (-webkit-backdrop-filter: …))`. The CSS minifier
rewrites the `or` form to `@supports not (backdrop-filter:blur(1px))` alone,
dropping the prefixed test — which would have flattened the glass to an opaque
panel on **Safari ≤ 17**, where only `-webkit-backdrop-filter` exists. Verified
against the built CSS, which now keeps both conditions.

### Nav controls wear `.glass` but not its blur

`ThemeToggle` and the hamburger take the `.glass` class — so they get the fill,
border, specular edge and both fallbacks from the tokens — but re-declare
`backdrop-filter: none`. They sit **inside** the glass capsule, and an ancestor
with `backdrop-filter` is a backdrop root: a nested blur can only re-blur the
capsule's own flat fill, so it is a visual no-op that still costs a blur pass.
This is the same rule spec 017 states for inlays on cards.

### Header geometry

Floating capsule: `.site-header` is a full-width fixed strip inset
`--space-3` from the top with `pointer-events: none`, and `.nav` is the capsule
itself (`max-width: 72rem`, `--radius-full`, `.glass`, `pointer-events: auto`) —
so clicks either side of the capsule reach the page. Measured 12px clear of the
top and both sides at 320/375/768/1440px, and never wider than the 72rem
container. Asymmetric inner padding (`--space-5` leading, `--space-2` trailing)
seats the round controls against the capsule's end; at <768px it tightens to
`--space-4`/`--space-2` so the wordmark plus two 44px controls still fit a
320px-wide capsule with no horizontal overflow.

`section[id] { scroll-margin-top }` went **5rem → 6rem**: the capsule's bottom
edge is at 74px (84px at 768px, where the wordmark wraps), so 5rem/80px left an
anchored section touching or under it. At 6rem every anchor clears the capsule
by 12–22px. `#top` is exempt by nature — the browser cannot scroll above 0, so
the hero always starts behind the capsule, as it did before.

### Contrast — verified pairs

Measured from **real rendered pixels**, not modelled: headless Chromium 141
renders the built site, all text is made transparent, the viewport is
screenshotted, the PNG is decoded, and every pixel of each element's *content
box* is scored against that element's own foreground colour (worst pixel wins).
This captures the actual composite — backdrop blur, `saturate(1.4)` and the
ambient layer included. Both themes, 375px and 1440px. Full log:
`ALL PASS`, 130 pairs.

| Surface / pair | Dark | Light | Min |
|---|---:|---:|---|
| Ambient layer peak vs `--text` | 14.99 | 16.42 | 4.5 |
| Ambient layer peak vs `--text-2` | 6.64 | 6.83 | 4.5 |
| Ambient layer peak vs `--accent` | 9.18 | 4.55 | 4.5 |
| Header capsule behind nav link vs `--text-2` | 7.35 | 7.30 | 4.5 |
| Header capsule behind nav link vs `--accent` (hover/active) | 10.16 | 4.87 | 4.5 |
| Header capsule behind "Beyond Code" vs `--text` | 15.92 | 17.29 | 4.5 |
| Header capsule behind "Beyond Code" vs `--accent` | 9.75 | 4.80 | 4.5 |
| Theme-toggle glass behind icon vs `--text` | 11.90 | 14.55 | 3.0 |
| Theme-toggle glass behind icon vs `--accent` (hover) | 7.29 | 4.04 | 3.0 |
| Hamburger glass behind icon vs `--text` / `--accent` | 12.22 / 7.48 | 14.77 / 4.10 | 3.0 |
| Mobile glass sheet behind link vs `--text` | 16.35 | 17.40 | 4.5 |
| Mobile glass sheet behind link vs `--accent` | 10.01 | 4.83 | 4.5 |
| Hero ghost CTA glass behind label vs `--accent` | 10.66 | 4.89 | 4.5 |
| Focus ring `--accent-2` around `.theme-toggle` | 3.53 | 5.12 | 3.0 |
| Focus ring `--accent-2` around `.hamburger` | 3.67 | 5.27 | 3.0 |
| Focus ring `--accent-2` around `.btn-ghost` | 4.15 | 5.31 | 3.0 |
| Focus ring `--accent-2` around `.btn-primary` | 3.08 | 5.19 | 3.0 |
| Focus ring `--accent-2` around `.nav-beyond` | 3.76 | 5.60 | 3.0 |

The ambient peak was swept across **eight viewports** (320×780 → 1920×1080),
because the orbs are sized and placed in `vmin`/`%` — where they land, and
therefore how colourful the peak gets, changes with the viewport. It measures
4.55:1 vs light `--accent` at every one of them.

Focus rings are sampled in the band 1–7px outside the element's **rounded**
outline (the ring is 2px at 3px offset and follows the element's own radius). An
earlier square-band version reported a false 2.90:1 on the theme toggle — that
pixel was on the capsule's curved edge, 3px beyond the ring's outer radius.

**Regression sweep.** Every text element on both pages was additionally scored
at every scroll step with the ambient layer on and off. The layer's largest cost
anywhere is **2.69 contrast points**, always from a baseline above 14:1. No
element that passed without the layer fails with it.

### Performance

Lighthouse (mobile emulation, `npx lighthouse@latest` against the production
build), unchanged from spec 015's baseline:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|:-:|:-:|:-:|:-:|
| `/` | 99 | 100 | 100 | 100 |
| `/beyond` | 99 | 100 | 100 | 100 |

### Behavioural verification

81 automated checks, all passing: glass properties and radii in both themes;
`prefers-reduced-transparency: reduce` (real CDP media emulation) resolving
every glass surface to opaque `--surface` with `backdrop-filter: none`; the
no-`backdrop-filter` path measured readable (16.67:1 dark / 18.10:1 light on the
mobile sheet); `prefers-reduced-motion: reduce` leaving zero animations running
on either page; no `transition` or `@keyframes` in the built CSS touching
`backdrop-filter`; capsule geometry, 44px hit targets and no horizontal overflow
at 320/375/768/1440px; anchor landings; scroll-spy; skip link; the mobile menu's
scroll lock, focus trap and Escape-restores-focus; and the circular theme reveal
still flipping, persisting and clearing `data-theme-switching`.

### Pre-existing issues found while verifying — deliberately not fixed here

Each was confirmed identical on pre-016 `main` and is outside this spec's scope:

- **Opening the mobile menu does not move focus into it.** `openMenu()` calls
  `first?.focus()` immediately after adding `.is-open`, but `.mobile-menu` is
  still `visibility: hidden` at that instant (the property only flips once the
  transition advances), so the link is not focusable and the call is a no-op —
  focus stays where it was. The focus trap, scroll lock and Escape handling all
  work. This is spec 013 behaviour, which this spec is required to leave
  unchanged; worth a follow-up.
- **Nav and mobile-menu list items render bullet markers** (`list-style-type:
  disc` on flex items; neither list resets `list-style`). Also spec 013's.
- Two sweep flags are sampler artefacts, not contrast defects: the 10px gradient
  swatch in `.skill-group-title::before` sits inside the heading's content box,
  and `.podcast-listen`'s box catches an antialiased edge sliver. Both score
  identically with the ambient layer off.
