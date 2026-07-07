# 002 — Design System

## Context

Every visual spec (004–013) consumes what this spec produces: tokens, themes,
typography, the base layout, and motion primitives. Direction: **bold &
animated**, dark-first, per `000-overview.md`.

## Goal

A complete, demonstrated design foundation: CSS custom-property tokens, dark/light
theming with a toggle, self-hosted fonts, fluid type scale, and reusable motion
utilities — applied to the placeholder page as living proof.

## Dependencies

001.

## Requirements

### Tokens — `src/styles/tokens.css`

CSS custom properties on `:root` (dark values) with a `[data-theme="light"]`
override block. Exact shades may be fine-tuned for contrast/taste; the
green+violet identity is fixed (see 000).

| Token group | Dark (default) | Light |
|---|---|---|
| `--bg` | deep near-black navy, e.g. `#0B0E14` | near-white, e.g. `#FAFBFD` |
| `--surface` / `--surface-2` | e.g. `#12161F` / `#1A2029` | `#FFFFFF` / `#F1F4F9` |
| `--text` / `--text-2` | e.g. `#F2F5FA` / `#9BA6B5` | `#12161F` / `#4A5568` |
| `--accent` | Android green `#3DDC84` | darker green for AA on white, e.g. `#0E9F5B` |
| `--accent-2` | Kotlin violet `#7F52FF` | `#6B3FE8` or similar |
| `--gradient` | `linear-gradient(135deg, var(--accent-2), var(--accent))` | same |
| `--border` | subtle line color | subtle line color |

Also: spacing scale (`--space-1..8`, 4 px base), radii (`--radius: 16px`,
`--radius-sm: 8px`), shadows + an accent glow (`--glow`) for hover states, and
`--transition: 200ms cubic-bezier(.2,.8,.2,1)`.

**Contrast is a hard requirement**: body text ≥ 4.5:1 against `--bg` and
`--surface` in both themes; accent-on-background usage ≥ 3:1 for large/UI text.
Verify the pairs you actually use.

### Typography

- Headings: **Space Grotesk** (700). Body: **Inter**. Mono accents: **JetBrains
  Mono** (a deliberate Kotlin-ecosystem nod) for section labels, dates, tags.
- Self-hosted woff2 (e.g. `@fontsource-variable/*` packages or committed woff2 +
  `@font-face`), `font-display: swap`, preload the heading font. No font CDN
  requests at runtime.
- Fluid scale with `clamp()` — e.g. `--text-hero` ≈ clamp(2.5rem → 5rem),
  `--text-h2` ≈ clamp(1.75rem → 2.5rem), body 1rem–1.125rem. Headings tight
  (`line-height` ≈ 1.05–1.15, slight negative letter-spacing); body relaxed (≈1.6).

### Global styles — `src/styles/global.css`

Modern reset, `box-sizing`, smooth scrolling (gated by reduced-motion), selection
color using `--accent`, visible `:focus-visible` outlines using `--accent-2`,
`.container` (max-width ≈ 72rem, side padding), `.section` vertical rhythm, and a
`.section-label` style (mono, uppercase, accent) for the kicker above each `<h2>`.

### Theming

- `data-theme` on `<html>`; inline `<head>` script (pre-paint, no flash):
  localStorage `theme` → else `prefers-color-scheme` → default dark.
- `src/components/ThemeToggle.astro`: accessible button (`aria-label`, sun/moon
  inline SVG), persists to localStorage. Place it top-right of the page for now;
  spec 013 relocates it into the nav.
- Set `color-scheme: dark light` appropriately so form controls/scrollbars match.

### Motion primitives

- `src/scripts/reveal.ts`: IntersectionObserver that adds `.is-visible` to
  `.reveal` elements once (~15% visibility, then unobserve). Support
  `--reveal-delay` (set inline or via `data-reveal-delay`) for stagger.
- CSS in `global.css`: `.reveal` = opacity 0 + translateY(~24px) →
  `.is-visible` = opacity 1 / translateY(0), ~600ms ease-out; a `.hover-lift`
  utility (translateY(-4px) + `--glow` shadow on hover).
- `@media (prefers-reduced-motion: reduce)`: `.reveal` elements are fully visible
  with no transition, hover lift disabled, smooth-scroll off. **Every** later
  animation must live behind this same guard — establish the pattern cleanly here.

### Base layout — `src/layouts/Base.astro`

Props: `title`, `description`. Renders `<html data-theme>` + head (charset,
viewport, title, description, theme script, global CSS, font preloads), `<body>`
with `<main id="main"><slot/></main>` and the reveal script. All pages use it from
now on.

### Demo

Restyle the placeholder `index.astro` with the system (fonts, tokens, gradient
text on the name, a `.reveal` entrance, theme toggle) — enough to prove every
piece works; it will be replaced by spec 004.

## Acceptance criteria

- [ ] Both themes render correctly; toggle persists across reloads; no
      flash-of-wrong-theme on a hard reload in either theme.
- [ ] With DevTools "emulate prefers-reduced-motion", nothing animates and all
      content is visible.
- [ ] Fonts load self-hosted (network tab shows no external font requests).
- [ ] Contrast of used text/background pairs verified AA in both themes.
- [ ] `.reveal` elements animate in on scroll once, with working stagger.
- [ ] Keyboard: toggle reachable and operable; focus ring visible in both themes.
- [ ] `npm run build` clean.

## Out of scope

Real content/sections (003+), nav (013), OG/meta (014).
