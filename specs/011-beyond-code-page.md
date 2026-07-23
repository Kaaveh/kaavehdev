# 011 — Beyond Code Page

## Context

Kaaveh's brand is deliberately whole-person: philosophy, life coaching, cycling,
meditation, martial arts, mountaineering, plus five non-engineering YouTube
channels. This page gives that its own space so the home page stays a focused
resume. Data: `src/data/channels.ts`, `src/data/interests.ts`.

## Goal

`src/pages/beyond.astro` — the `/beyond` route with intro, interests
(`#interests`), and the channels grid (`#channels`), sharing Base layout, design
system, and footer.

## Dependencies

002, 003 (Footer from 010 if available — if 010 isn't ✅ yet, note it and ship
without footer rather than blocking).

## Requirements

1. Page uses `Base.astro` with its own title/description ("Beyond Code — Kaaveh
   Mohamedi", description drafted at implementation time and approved by Kaaveh).
2. **Page hero** (smaller than home's): an `<h1>` like "Beyond Code" with the
   gradient treatment, plus a 1–2 sentence intro. **Draft the intro copy and get
   Kaaveh's approval as part of this spec** — his voice, not marketing filler.
   Theme to draw from (his own bio line): philosopher-engineer; interests below.
3. **Interests** (`#interests`): the six interests from data as a bold card/tile
   row — each with an inline SVG icon or emoji-scale glyph and its label. These
   are not links.
4. **Channels** (`#channels`): grid of the **five non-featured** channels (With
   Kaaveh; Cycling with Kaaveh; RunningWithKaaveh; MyImmigration; Übermensch),
   each: name, tagline from data, "Visit channel →" link. **URLs known only for
   With Kaaveh** — ask Kaaveh for the rest as part of this spec; channels whose
   URL stays unknown render without a link (name + tagline only) rather than
   guessed handles. Include a small pointer back to Code With Kaaveh / home
   (`/#youtube`).
5. Uncomment/enable the home → beyond cross-links deferred by specs 009/010
   (check their Implementation notes) once this page exists.
6. Motion & semantics: same standards as home (reveal stagger, reduced-motion
   static, h1→h2→h3 order, one h1).

## Design & UX notes

- Same design system, slightly warmer register than the resume page — this is the
  human side. Podcasts (spec 012) will slot in after `#channels`; leave the
  composition open for it.
- Übermensch: keep the umlaut everywhere (check font coverage).

## Acceptance criteria

- [ ] `/beyond` builds and renders with intro (Kaaveh-approved), 6 interests, 5
      channels from data.
- [ ] No guessed channel URLs; unlinked channels carry no link affordance.
- [ ] Cross-links between home and beyond now live in both directions (009/010
      deferrals resolved).
- [ ] Theme toggle, fonts, tokens all work identically on this page; both
      themes, 320 px / 1440 px checked.
- [ ] Reveal + reduced-motion correct; exactly one h1.

## Out of scope

Podcasts section (012), nav header (013), per-page OG images (014).

## Implementation notes

- **Intro copy** (Kaaveh-approved 2026-07-23, "Whole person" draft): "The resume
  is only half the story. Beyond the code I'm a philosopher-engineer — chasing
  ideas, mountains, and better questions through coaching, cycling, meditation,
  and martial arts." Lives inline in `beyond.astro` (page copy, not a resume
  fact), alongside the drafted meta description.
- **Interests** render as a bold, non-link tile grid with emoji glyphs mapped by
  label in `beyond.astro` (fallback `✦` for any unmapped label) — spec allows
  emoji-scale glyphs.
- **Channel URLs**: still only "With Kaaveh" is known. The other four render as
  name + tagline with no link (data-driven off `channels.ts`); when Kaaveh
  supplies URLs, add them to `channels.ts` and the links appear with no page
  change.
- Cross-links deferred by 009 (`YouTube.astro` → `/beyond#channels`) and 010
  (`Footer.astro` → `/beyond`) are now uncommented; `beyond.astro` links back via
  a "Back to the resume" hero link and an inline `/#youtube` pointer.
