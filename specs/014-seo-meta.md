# 014 — SEO & Meta

## Context

The site is Kaaveh's professional front door; it must unfurl well in link
previews (recruiters share links) and index cleanly. Blocker to resolve first:
the production URL is `TODO(Kaaveh)` (see 000/003).

## Goal

Complete head metadata, social cards, favicon, sitemap, robots.txt, and JSON-LD
on both pages.

## Dependencies

003 (best done after 002/004 exist so the OG image matches the real visual
identity).

## Requirements

0. **First action**: ask Kaaveh for the production domain (worker is `kaavehdev`;
   likely a custom domain). Set it in `src/data/site.ts` `siteUrl` **and**
   `astro.config.mjs` `site`. If he has no domain yet, use the `*.workers.dev`
   URL he confirms, and leave a `TODO(Kaaveh)` to swap later.
1. **Per-page meta** via `Base.astro` props (extend as needed): unique
   `<title>` and `<meta name="description">` for `/` (name — Senior Android
   Engineer, description distilled from the summary in `site.ts`) and `/beyond`;
   canonical URLs from `siteUrl`.
2. **Open Graph + Twitter cards**: og:title/description/type/url/image +
   `twitter:card=summary_large_image`. One static OG image is enough for both
   pages: `public/og.png`, 1200×630 — design it with the site's identity (dark
   bg, gradient accent, "Kaaveh Mohamedi / Senior Android Engineer"). Generate
   however is practical (hand-built SVG rendered to PNG at build or a committed
   asset); it must use the real fonts/colors, not a generic template look.
3. **Favicon set**: gradient "K" mark — `favicon.svg` (dark/light aware via
   `prefers-color-scheme` in the SVG), `favicon.ico` fallback, and
   `apple-touch-icon.png` (180×180, solid bg). Reference all from Base.
4. **Sitemap**: `@astrojs/sitemap` (requires `site` set) — verify both pages in
   the output. **robots.txt**: allow all + `Sitemap:` line (in `public/`).
5. **JSON-LD** on `/`: `Person` — name, jobTitle "Senior Android Engineer",
   address locality Yerevan/AM, `sameAs`: the five verified profile links (000),
   `url`: siteUrl. Only verified facts; no invented alumniOf/worksFor URLs.
6. `<html lang="en">` confirmed; `theme-color` meta matching `--bg` per theme
   (media-attribute variant).

## Acceptance criteria

- [ ] `npm run build` emits `sitemap-index.xml` (+ parts) listing `/` and
      `/beyond`; robots.txt points at it; canonical tags correct on both pages.
- [ ] OG/Twitter tags validate (e.g. via a local meta checker or manual
      inspection against the spec) and `og.png` is 1200×630, < 300 KB.
- [ ] Favicon renders in light + dark browser chrome; apple-touch-icon present.
- [ ] JSON-LD passes Google's Rich Results / schema validator with zero errors.
- [ ] Every URL in meta/JSON-LD derives from `site.ts` (single source), and the
      domain came from Kaaveh, not a guess.
- [ ] Lighthouse SEO score ≥ 90 on both pages.

## Out of scope

Analytics (deliberately none unless Kaaveh asks), multi-locale hreflang, blog RSS.
