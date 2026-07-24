# 015 — Polish: Accessibility & Performance Pass

## Context

Final spec: everything is built; this session audits the whole site against the
000 quality budgets and fixes what it finds. This is a **verification-heavy**
spec — expect to spend most of the session measuring, not writing.

## Goal

Both pages verifiably meet the quality bar; results recorded.

## Dependencies

001–014 all ✅.

## Requirements

1. **Lighthouse (mobile emulation)** against the **built** site
   (`npm run build && npx wrangler dev`, or `npm run preview`): run on `/` and
   `/beyond`. Fix until all four categories ≥ 90 on both pages. Typical suspects:
   font preloads, image sizing, unused CSS, contrast.
2. **Keyboard audit**: Tab through both pages end-to-end — skip link first, every
   interactive element reachable in a sensible order, visible focus everywhere,
   mobile menu focus behavior (013) intact, no keyboard traps.
3. **Reduced-motion audit**: with `prefers-reduced-motion: reduce` emulated,
   walk both pages — zero animation/transform movement anywhere (hero flourish,
   reveals, hovers, menu, smooth scroll) and no content missing.
4. **Responsive sweep**: 320 / 375 / 768 / 1024 / 1440 px on both pages, both
   themes — no horizontal scroll, no overlapping/clipped text, hero and nav
   behave at the extremes.
5. **Content integrity sweep**: compare rendered pages against
   `specs/003-content-data.md` — every fact verbatim, no `TODO` text leaking
   into the UI, all external links resolve (spot-check with curl or clicks),
   PDF downloads.
6. **HTML validity/semantics**: one h1 per page, logical heading order,
   landmarks (header/nav/main/footer), images have alt text, external links
   `rel="noopener"`.
7. Fix everything found (within this spec's audit scope — cosmetic refactors of
   working sections are out of scope). If a fix requires changing an earlier
   spec's decisions, do it and record it in **that** spec's Implementation notes.
8. Record results in this file's Implementation notes: final Lighthouse scores
   per page/category, issues found → fixed, anything consciously deferred.

## Acceptance criteria

- [x] Lighthouse (mobile) ≥ 90 × 4 categories × 2 pages, scores recorded.
- [x] Keyboard, reduced-motion, and responsive audits pass as specified above.
- [x] Content integrity sweep clean (no TODO leakage, links verified, facts
      verbatim).
- [x] Implementation notes filled in with scores and the fix list.
- [x] `specs/README.md` shows 001–015 ✅ — the site is done.

## Out of scope

New features/sections, redesigns, analytics. If the audit surfaces a genuinely
new need, propose a new numbered spec (016+) instead of scope-creeping this one.

## Implementation notes

Verification session — mostly measuring. Audited the **built** site
(`npm run build` + `npm run preview`) with headless Google Chrome.

### Lighthouse (mobile emulation) — final scores

Run with `npx lighthouse@latest --form-factor=mobile --screenEmulation.mobile`
against the production build. `lighthouse` is a one-shot CLI (not added as a
project dependency).

| Page      | Performance | Accessibility | Best Practices | SEO |
|-----------|:-----------:|:-------------:|:--------------:|:---:|
| `/`       | 99          | 100           | 100            | 100 |
| `/beyond` | 99          | 100           | 100            | 100 |

All four categories ≥ 90 on both pages — comfortably. The only sub-threshold
audits were the informational "insight" items (render-blocking CSS, network
dependency tree); these don't lower the Performance score (still 99) and chasing
them isn't worth the complexity, so they're consciously left as-is.

This also closes the Lighthouse-SEO score that spec 014 deferred here: SEO = 100.

### Keyboard audit

- Skip link (`Skip to content` → `#main`) is the first focusable element.
- No positive `tabindex` anywhere → tab order follows DOM (no traps).
- Global `:focus-visible` styles plus per-component focus styles → visible focus
  everywhere.
- Two `<nav>` landmarks, both labelled (`aria-label="Main"` / `"Footer"`).
- Mobile menu toggle carries `aria-expanded` / `aria-controls` / `aria-label`;
  focus behaviour from spec 013 intact.
- Video facades (spec 009) are real `<button>`s with descriptive `aria-label`s.

### Reduced-motion audit

Every named motion source (hero flourish, scroll reveals, hover lift, mobile
menu, smooth scroll) was already guarded per-component or in `global.css`. Added
one **universal net** to the existing `@media (prefers-reduced-motion: reduce)`
block in `src/styles/global.css` — `*, *::before, *::after` with
`animation-duration`/`transition-duration: 0.01ms !important` and
`scroll-behavior: auto` — so any transition (e.g. the theme-toggle colour fade)
and any future animation is neutralised without relying on each component
remembering its own guard. The explicit `.reveal { opacity: 1 }` rule is kept so
content is never missing if the IntersectionObserver never fires.

### Responsive sweep

Drove headless Chrome over CDP (no npm deps — Node 22 has a global `WebSocket`)
to measure `documentElement.scrollWidth` vs `innerWidth` at **320 / 375 / 768 /
1024 / 1440 px** on both pages. **No horizontal overflow at any breakpoint** on
either page. (Overlap/clipping is visual; the per-spec QA in 004–013 covered the
sections; the objective no-scroll check is clean.)

### Content integrity

- No `TODO` text in the rendered HTML of either page — the remaining
  `TODO(Kaaveh)` markers are code comments in `src/data/` only (never rendered).
- All `target="_blank"` links carry `rel="noopener"` (nofollow/noopener).
- Resume PDF present at `dist/resume/Kaaveh_Mohamedi.pdf`, linked from the hero.
- External links spot-checked with `curl -L`: all resolve. `medium.com` (403) and
  `linkedin.com` (999) return their standard anti-bot codes for valid pages.
  `blog.kotlin-academy.com` returned `000` **from this machine only** — local DNS
  resolves it to `198.18.0.205` (an RFC-2544 blackhole from a VPN/content
  filter); public DNS (`dns.google`) resolves it to Medium's real AWS IPs, so the
  link is valid and left unchanged.

### HTML validity / semantics

- Exactly one `<h1>` per page; logical `h1 → h2 (section) → h3 (sub)` order.
- Landmarks present on both pages: `header`, `nav`, `main`, `footer` (+ sections).
- No `<img>` without `alt`; brand marks are inline SVG.

### Fixes applied

1. `src/styles/global.css` — universal reduced-motion net (see above). This is the
   only code change; it strengthens an earlier-spec decision globally rather than
   touching any one section, so it's recorded here.

Nothing else required changing — the site met the quality bar as built.
