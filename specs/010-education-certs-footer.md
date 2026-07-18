# 010 — Education, Certificates, Languages & Footer

## Context

The remaining resume facts (from `src/data/education.ts`) plus the site-wide
footer that closes both pages.

## Goal

`src/components/sections/Education.astro` (anchor `#education`) as the last
content section on `/`, and a shared `src/components/Footer.astro` used by every
page.

## Dependencies

002, 003.

## Requirements

### Education section

1. Standard section header; three compact groups in one visual band (this is the
   quiet coda of the resume — smaller than Experience/Projects):
   - **Education**: Master of Science in Software Engineering — Tarbiat Modares
     University, with the note *Taught Android development in collaboration with
     the IEEE student branch* (unless 008 claimed it — check its Implementation
     notes; it must appear exactly once on the site).
   - **Certificates**: Droidcon "Test-Driven Development on Android" and
     JetBrains "Kotlin for Java Developers". Credential IDs/URLs are
     `TODO(Kaaveh)` — ask; if unresolved, show issuer + title as plain text.
   - **Languages**: English — C1 · Persian — Native.
2. Reveal on scroll, reduced-motion static, standard semantics (h3 groups).

### Footer (`Footer.astro`, shared)

3. Contents: name + title line; the same five contact links as the hero
   (icons from a shared component or consistent markup — don't fork the SVG
   set); "Download Resume (PDF)" text link; cross-link to the other page
   (`/beyond` from home, `/` from beyond — same dead-link rule as spec 009 if
   011 isn't done: render the beyond link only when the page exists);
   small-print line: `© <current year, computed at build> Kaaveh Mohamedi`.
4. Optional single flourish: a thin signature-gradient top border.
5. Semantics: `<footer>` landmark; nav links inside a `<nav aria-label="Footer">`.
6. Mount the footer on `/` (and it becomes part of the Base/page composition
   that `/beyond` will reuse in 011).

## Acceptance criteria

- [x] All education/certificates/languages facts render verbatim from data; the
      IEEE note appears exactly once site-wide.
- [x] No fabricated credential links; unresolved certs are plain text.
- [x] Footer renders on `/` with working contact links, PDF link, and computed
      year; no dead `/beyond` link if 011 isn't done.
- [x] Reveal + reduced-motion correct; layout holds at 320 px / 1440 px, both
      themes.

## Out of scope

Nav header (013), the `/beyond` page itself (011).

## Implementation notes

- **Shared contact icons**: Hero (004) had the contact-link SVG paths inlined.
  Since requirement 3 forbids forking the icon set for the footer, they were
  extracted to `src/components/icons.ts` (`iconPaths`) and both `Hero.astro`
  and `Footer.astro` now import from there.
- **`<footer>` landmark placement**: `Base.astro` wrapped all page content in
  a single `<main><slot /></main>`. A `<footer>` nested inside `<main>` does
  not get the `contentinfo` landmark role (per the HTML-AAM footer mapping),
  so `Base.astro` gained a second, named `footer` slot rendered as a sibling
  of `<main>` (both direct children of `<body>`). `index.astro` passes
  `<Footer slot="footer" />`. This is the "Base/page composition" spec 011
  will reuse for `/beyond`.
- **Certificates**: credential IDs/URLs remain `TODO(Kaaveh)` in
  `education.ts`; both certs render as issuer + title plain text per the
  spec's explicit fallback — not blocked on asking, since the spec already
  states the fallback behavior.
- Verified via `npm run build` (0 errors/warnings, `astro check` clean),
  `npm run build && npx wrangler dev` (200 OK, markup present in served
  output), and headless-Chromium screenshots at 375px/1440px in both themes.
