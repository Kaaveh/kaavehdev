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
  from the icon/wording. **Reversed 2026-09-03 — see Implementation notes.**
- The facade must not look broken — visible play affordance, real thumbnail.

## Acceptance criteria

- [x] Zero iframe/network requests to YouTube at page load (network tab clean);
      thumbnails only if videos are shown.
- [x] If videos present: clicking a card opens that video on youtube.com in a
      new tab; keyboard-operable links with accessible names. (Was "loads an
      inline youtube-nocookie embed" until 2026-09-04 — see Implementation
      notes.)
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
- 2026-09-03 — **reversed the "YouTube-red is off-palette" call above, at
  Kaaveh's explicit request.** The channel logo, the "Watch on YouTube" CTA,
  and the video play buttons now use YouTube's own red (`#ff0000`, `#d90000`
  hover) instead of `--accent`/`--gradient`. Scoped as `--youtube-red(-hover)`
  custom properties on `.youtube` in the component's own `<style>` block —
  not promoted to `tokens.css`, since it's this section's exception, not a
  site-wide accent. Label text on the CTA/play button stayed black (not
  white): black-on-`#ff0000` measures ~5.25:1, white only ~4:1, and AA needs
  4.5:1 for this text size. Verified in Chromium, both themes: red renders
  correctly, hover darkens to `#d90000`, `astro check`/build clean.

- 2026-09-04 — **the click-to-load facade was replaced by a plain link out.**
  Kaaveh reported that pressing play on the live site landed viewers on
  YouTube's "Sign in to confirm you're not a bot" interstitial inside the
  embed, so the inline player never actually played. Each video card is now a
  single `<a href="https://www.youtube.com/watch?v=<id>" target="_blank"
  rel="noopener noreferrer">` wrapping the thumbnail *and* the title, so a
  click anywhere on the card opens the video on YouTube in a new tab. The
  facade `<script>` and the `youtube-nocookie` iframe are gone entirely —
  which strengthens the 000 constraint rather than weakening it: the section
  now ships zero third-party iframes at any point in its lifetime, not just at
  page load. Thumbnails still come from `i.ytimg.com`, unchanged.
- 2026-09-04 — **play affordance restyled after Telegram's video preview**, at
  Kaaveh's request (reference screenshot supplied). It is no longer a solid
  YouTube-red chip: it is a translucent white disc (`rgb(255 255 255 / 0.28)`,
  hairline white border, soft shadow) with a white rounded-join triangle,
  sized as a share of the frame (`clamp(2.75rem, 15%, 3.75rem)`) so the
  proportion matches the reference from 320 px to the 3-up desktop grid. The
  YouTube red stays on the channel logo and the "Watch on YouTube" CTA.
  A tight radial scrim (`.video-frame::after`) darkens just the centre of the
  frame: a translucent white disc reads well over a dark thumbnail but
  disappears over a bright one — and over the bare inlay when a thumbnail
  fails to load. Verified in Chromium at 390 px and 1280 px, both themes, over
  stand-in light and dark thumbnails; `astro check` and the build are clean.
