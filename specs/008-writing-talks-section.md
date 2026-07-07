# 008 — Writing & Talks Section

## Context

Community contribution is a headline claim of the resume (3 conference talks,
7 Medium articles, Droidcon course, 20+ mentees). Data: `src/data/writing.ts` and
`src/data/talks.ts` — **several URLs are `TODO(Kaaveh)` and must be resolved with
the user before shipping items as links** (see 000: never fabricate).

## Goal

`src/components/sections/Writing.astro` on `/` after Projects, anchor `#writing`,
covering articles, talks, the Droidcon course, and mentoring.

## Dependencies

002, 003.

## Requirements

0. **First action of this spec**: ask Kaaveh to (a) confirm the final article list
   (resume says 7; `writing.ts` lists ~8 known titles) with canonical URLs,
   (b) provide LogCat talk titles/years (+ links if any), and (c) the Droidcon
   course title/URL. Items whose URL stays unknown render as plain text (title +
   source), not links — or are dropped if Kaaveh prefers.
1. Standard section header; content in three visually distinct groups:
   - **Articles** — list/cards: title, one mono meta line (e.g. "Medium" /
     "ProAndroidDev"). Footer link: **"All articles on Medium →"** →
     https://medium.com/@Kaaveh (always shown).
   - **Talks & teaching** — the three LogCat conference talks; the SqlDelight
     master course via Droidcon Academy (link the verified instructor page
     https://academy.droidcon.com/kaaveh-mohamedi if no course URL is provided;
     keep the resume's framing: *published via Droidcon, the global Android
     developer conference organization partnered with Google, Meta, and Amazon*).
   - **Mentoring** — a bold stat treatment: **20+ engineers mentored** (plus the
     IEEE Android-teaching note if it reads well here; it also lives in
     Education — don't duplicate it in both, pick one and note the choice).
2. Motion: groups/items `.reveal` with stagger; linked items get hover feedback;
   non-linked items must not look clickable.
3. Semantics: lists of items with h3-level group headings.

## Design & UX notes

- Mixed link/non-link lists are the trap here — differentiate clearly (e.g. only
  linked titles get accent + arrow-out icon).
- The mentoring stat can echo the metric treatment from Experience (005) for
  cross-section cohesion.

## Acceptance criteria

- [ ] Every displayed link was confirmed by Kaaveh or verified in data; no
      guessed URLs (grep for TODO leakage into rendered output).
- [ ] Unlinked items render as plain text without link affordances.
- [ ] Articles/talks/course/mentoring all present; Medium profile link works.
- [ ] Reveal + reduced-motion correct; layout holds at 320 px / 1440 px, both
      themes.
- [ ] `src/data/writing.ts` / `talks.ts` updated with whatever Kaaveh confirmed
      (data updated, not component-hardcoded).

## Out of scope

Auto-fetching Medium RSS at build time (Medium blocks anonymous scraping
unreliably — keep the list curated); article thumbnails.
