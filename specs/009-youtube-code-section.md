# 009 — YouTube Section (Code With Kaaveh)

## Context

The engineering channel **Code With Kaaveh**
(https://www.youtube.com/@CodeWithKaaveh, channel id `UC_PSOgZBu28krqe0L93OKgg`)
gets a home-page highlight; the other five channels live on `/beyond` (spec 011).
Hard constraint from 000: **no third-party iframes at page load** — YouTube embeds
are notorious Lighthouse killers.

## Goal

`src/components/sections/YouTube.astro` on `/` after Writing & Talks, anchor
`#youtube`.

## Dependencies

002, 003.

## Requirements

1. Standard section header; then a **featured channel card**: channel name, the
   "Android engineering" positioning (taglines in `src/data/channels.ts`), and a
   bold **"Watch on YouTube →"** CTA linking the channel.
2. Optionally (preferred if Kaaveh supplies video IDs — ask as part of this
   spec): a row of up to 3 featured videos using a **click-to-load facade**:
   - At rest: thumbnail `<img>` (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`,
     explicit width/height, lazy-loaded) + play button + video title, as a
     `<button>` labelled "Play <title>".
   - On click: swap in the `youtube-nocookie.com` embed iframe with `autoplay=1`.
   - If no video IDs are provided, ship the channel card alone — no placeholder
     thumbnails.
3. A subtle cross-link: *"More channels — beyond code →"* → `/beyond#channels`
   (works even before spec 011 ships the page? No — link 404s until 011 exists.
   If 011 is not ✅ yet, add the cross-link but keep it commented out with a note,
   and record in Implementation notes that 011 must uncomment it — or implement
   it behind a data flag. Do not ship a dead link.)
4. Motion: reveal on scroll; hover feedback on card/CTA. Reduced-motion: static.

## Design & UX notes

- YouTube-red is off-palette: keep the site's accent system; the platform is clear
  from the icon/wording.
- The facade must not look broken — visible play affordance, real thumbnail.

## Acceptance criteria

- [x] Zero iframe/network requests to YouTube at page load (network tab clean);
      thumbnails only if videos are shown.
- [x] If videos present: click loads and plays the right video via
      youtube-nocookie; keyboard-operable buttons with accessible names.
- [x] Channel CTA resolves to https://www.youtube.com/@CodeWithKaaveh.
- [x] No dead `/beyond` link shipped (per requirement 3).
- [x] Reveal + reduced-motion correct; layout holds at 320 px / 1440 px, both
      themes.

## Out of scope

Other five channels (011), subscriber counts (no reliable anonymous API — skip),
YouTube Data API integration.

## Implementation notes

- Featured videos (ids + titles) supplied by Kaaveh: `s6VDJv9mD0k`,
  `-rVPOxuqIEg`, `hjASLkHz-8k` — stored in `src/data/videos.ts`.
- Spec 011 (`/beyond`) is not shipped yet, so the "More channels — beyond
  code →" cross-link (requirement 3) is present in
  `src/components/sections/YouTube.astro` but commented out. **Spec 011 must
  uncomment it** (the `<p class="beyond-link reveal">…</p>` block, right
  after the video grid) once `/beyond#channels` exists.
