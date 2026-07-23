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

## Implementation notes

- **Kaaveh's answers (2026-07-23)**: all five podcasts appear; every one is a
  **solo creation** (he is the sole host). Listen links + platforms supplied:
  WonderLand → anchor.fm (Anchor), Journal Club → shows.acast.com (Acast), The
  Voice of My Books → anchor.fm (Anchor), Mushin → shows.acast.com (Acast),
  Kapsoul → anchor.fm (Anchor). No one-line descriptions given yet, so cards
  render name + "Listen on {platform} →" only; `description` stays a
  `TODO(Kaaveh)` optional field and appears with no code change when supplied.
- `role: 'host'` is stored in `podcasts.ts` for completeness but not shown on
  the card — it's identical across all five, so surfacing it would just repeat
  "host" five times.
- Section reuses the channel-grid rhythm (same surface/border/radius, 1 → 2 → 3
  columns, reveal stagger, reduced-motion transform reset) so `#podcasts` reads
  as a sibling of `#channels`. A generic mic inline SVG is the only artwork; no
  platform logos hotlinked.
- **Bonus (resolves spec 011 deferral)**: Kaaveh supplied the four missing
  YouTube channel URLs in the same message, so `channels.ts` TODOs for Cycling
  with Kaaveh, RunningWithKaaveh, MyImmigration, and Übermensch are now filled
  (with his reworded taglines for cycling/running). Those channel cards on
  `/beyond` now show their "Visit channel →" links.
