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

- [ ] All education/certificates/languages facts render verbatim from data; the
      IEEE note appears exactly once site-wide.
- [ ] No fabricated credential links; unresolved certs are plain text.
- [ ] Footer renders on `/` with working contact links, PDF link, and computed
      year; no dead `/beyond` link if 011 isn't done.
- [ ] Reveal + reduced-motion correct; layout holds at 320 px / 1440 px, both
      themes.

## Out of scope

Nav header (013), the `/beyond` page itself (011).
