# 012 — Podcasts Section

## Context

Kaaveh runs/appears on five podcasts — **WonderLand, Journal Club, The Voice of My
Books, Mushin, Kapsoul** (names from his GitHub profile README; that's all we
know). They get a section on `/beyond`. Data: `src/data/podcasts.ts`.

## Goal

`src/components/sections/Podcasts.astro` mounted on `/beyond` after the channels
grid, anchor `#podcasts`.

## Dependencies

011.

## Requirements

0. **First action**: ask Kaaveh, for each podcast — one-line description, primary
   listen link (platform of his choice), his role (host/co-host/guest?), and
   whether all five should appear. Update `src/data/podcasts.ts` with the
   answers. Podcasts without a confirmed link render unlinked; podcasts he drops
   are removed from data.
1. Section header consistent with the rest of the site (mono kicker + `<h2>`,
   e.g. "Podcasts").
2. Card per podcast: name, description, "Listen →" link (when known) with a
   platform hint (e.g. Spotify/Castbox/YouTube — whatever Kaaveh supplies). A
   simple generic podcast/mic inline SVG is fine; **no fabricated artwork** and
   no hotlinked platform artwork unless Kaaveh provides assets.
3. Layout: same card-grid rhythm as the channels grid above it; the two sections
   must read as siblings.
4. Motion & semantics: reveal stagger, reduced-motion static, `<h2>` + list
   semantics, unlinked cards carry no link affordance.

## Acceptance criteria

- [ ] Podcasts render from updated data; every shown link was supplied by
      Kaaveh; unlinked cards are visibly plain.
- [ ] Section sits after `#channels` on `/beyond` and matches its visual rhythm.
- [ ] Reveal + reduced-motion correct; both themes, 320 px / 1440 px checked.

## Out of scope

Episode lists, RSS integration, embedded players.
