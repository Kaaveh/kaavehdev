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

- [x] Every displayed link was confirmed by Kaaveh or verified in data; no
      guessed URLs (grep for TODO leakage into rendered output).
- [x] Unlinked items render as plain text without link affordances.
- [x] Articles/talks/course/mentoring all present; Medium profile link works.
- [x] Reveal + reduced-motion correct; layout holds at 320 px / 1440 px, both
      themes.
- [x] `src/data/writing.ts` / `talks.ts` updated with whatever Kaaveh confirmed
      (data updated, not component-hardcoded).

## Out of scope

Auto-fetching Medium RSS at build time (Medium blocks anonymous scraping
unreliably — keep the list curated); article thumbnails.

## Implementation notes

- **What Kaaveh confirmed (2026-07-11)** via the spec's Requirement-0 questions:
  - *Articles*: Kaaveh flagged that "Stability of Composable function
    parameters" was **not his article** (removed) and asked for every remaining
    article to be a real link. All seven canonical URLs were then verified
    against his own sources (GitHub profile "Latest articles", the ComposeNews
    README, and the Towards AI byline) — none guessed — and `source` corrected to
    the real publication per article (Towards AI / ProAndroidDev / Kotlin
    Academy). So all seven articles now render as links. (Resume says 8; one slot
    is still open — see the follow-up note below.)
  - *Talks*: the three LogCat talk titles + years were provided and written into
    `talks.ts` — "A Refactoring Odyssey: An Introduction to SQLDelight" (2025),
    "Mindful Developer" (2025), "Cognitive Debt: Staying Sharp When AI Writes
    Most of Your Code" (2026). No recording URLs were given, so talks render as
    plain text (title + `LogCat conference · year`), not links.
  - *Course*: Kaaveh provided the real course URL
    (`academy.droidcon.com/course/mastering-sqldelight-database-android-jetpack-compose`)
    and it now renders under its actual title, "Mastering SQLDelight Database in
    Android with Jetpack Compose" (the verified instructor page remains the
    fallback in `talks.ts`).
  - *IEEE note*: render it **only in Education (010)**. `Writing.astro` therefore
    does not render `talks.ts`'s `teaching` export, and the Mentoring group is
    just the `20+` stat. (The `teaching` string stays in `talks.ts` unused by 008
    so 010 can consume it — noted here to satisfy the "pick one and note it" rule.)
- **`Writing.astro`** renders `writing.ts` + `talks.ts` unchanged (no hardcoded
  facts). Header reuses the 005/006/007 pattern (`// writing` `.section-label`
  kicker + `<h2>` "Writing & talks"), composed on `/` after `Projects`
  (anchor `#writing`). Three `<section>` groups, each `aria-labelledby` its
  h3-level heading (`Articles`, `Talks & teaching`, `Mentoring`), each with the
  Skills-style gradient bullet marker.
- **Link vs plain-text differentiation** (the spec's named trap): only items with
  a real URL become an `<a class="article-link|talk-link">` — accent-coloured
  title + an `↗` arrow-out icon + hover/focus nudge. Un-linked items are bare
  `<span>`s with the default text colour and zero affordance. Verified in the
  built HTML: all 7 articles link out and 1 `talk-link` (the course); the three
  LogCat talks stay plain text (no recording URLs). The mechanism still handles
  un-linked items — it's just that every current article now has a verified URL.
- **Mentoring** uses a bold stat treatment — a large gradient-clipped `20+`
  (`background-clip: text`, from `mentoring.stat`) over an `engineers mentored`
  mono label, echoing the metric accent used elsewhere for cross-section cohesion.
- **Layout**: single column below 900 px; at ≥900 px a `grid-template-areas`
  layout puts the tall Articles list in a left column spanning both rows, with
  Talks & teaching and Mentoring stacked on the right (`align-items: start`).
- **Motion**: the label, `<h2>`, and each group are `.reveal` with a
  `data-reveal-delay` stagger (0 / 80 / 140 / 200 / 260 ms) via the shared 002
  script; hover/focus transforms are neutralised under
  `prefers-reduced-motion: reduce`. The section ships **zero** client JS of its
  own (only the shared reveal script runs).
- **Verified**: `npm run build` passes (`astro check` 0/0/0). Drove the built
  page in the pre-installed Chromium at 320 px and 1440 px in both themes and
  under reduced motion — no horizontal overflow at any width (`scrollWidth ==
  clientWidth`), all groups/links/stat present, and no `TODO` string leaked into
  the rendered HTML.
- **Open follow-up**: the resume claims **8** articles but only **7** are in
  `writing.ts` after removing the mis-transcribed one. Two further articles
  authored by Kaaveh were spotted while verifying (Mastering Android Dependency
  Management — ProAndroidDev; a Detekt Gradle guide — Kotlin Academy), but they
  were **not** added, since he asked to list only his real articles and hasn't
  confirmed which is the intended 8th. Awaiting his pick before adding it.
