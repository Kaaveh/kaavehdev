# 004 — Hero Section

## Context

First impression of the site and home of the "bold & animated" signature moment.
Replaces the placeholder content from specs 001/002.

## Goal

`src/components/sections/Hero.astro` rendered at the top of `/` (anchor `#top`):
identity, summary, contact links, and the resume-download CTA.

## Dependencies

002, 003.

## Requirements

Content — all from `src/data/site.ts`, nothing hardcoded:

1. `<h1>` **Kaaveh Mohamedi** — the page's only h1, display-size
   (`--text-hero`), with the signature gradient applied to all or part of it.
2. Role line: **Senior Android Engineer**, prominent.
3. Location line: *Yerevan, Armenia · Open to relocation* (mono/label styling).
4. Summary paragraph (the 7+ years… text), max-width ~60ch for readability.
5. Contact links: Email, LinkedIn, GitHub, Medium, YouTube — inline SVG icons
   (no icon-font/CDN), each a real `<a>` with accessible name (`aria-label` or
   visible text), opening external links in a new tab with `rel="noopener"`.
6. CTAs: primary button **"Download Resume (PDF)"** → `site.resumePdf` with the
   `download` attribute; secondary ghost link **"View experience ↓"** →
   `#experience` (smooth scroll comes free from 002's global styles).

Behavior & motion:

7. Staggered entrance on load (name → role → summary → links → CTAs) using the
   002 reveal/stagger primitives.
8. One signature animated flourish, chosen at implementation time — e.g. an
   animated gradient sweep on the name, or a slow ambient gradient glow/orb
   behind the hero. Pure CSS, GPU-friendly (transform/opacity only), fully
   disabled under `prefers-reduced-motion`.
9. Hero fills most of the initial viewport (~85–100 svh) on desktop and mobile
   without clipping content at 320 px width.

## Design & UX notes

- This is a resume: recruiters must get name + role + download-CTA within one
  second. The flourish supports that hierarchy, never competes with it.
- Buttons: primary = gradient background with dark text (check contrast); ghost =
  border + text in `--accent`. Both get `.hover-lift`-style feedback and visible
  focus states.

## Acceptance criteria

- [ ] All content renders from `src/data/site.ts`; grep confirms no resume facts
      in the component.
- [ ] PDF downloads via the CTA in `npm run dev` and from `npx wrangler dev`.
- [ ] All five contact links resolve to the correct destinations.
- [ ] Entrance stagger plays once; with reduced-motion emulated, hero is fully
      static and complete.
- [ ] Only one `<h1>` on the page; links keyboard-reachable with visible focus.
- [ ] Layout holds at 320 px, 768 px, 1440 px in both themes.

## Out of scope

Nav bar (013), other sections, SEO meta (014).
