# 000 — Overview & Shared Context

> 📖 Reference document — not implementable on its own. Every spec assumes you have
> read this file. If a numbered spec contradicts this file, the numbered spec wins
> for its own scope.

## What this site is

The personal website of **Kaaveh Mohamedi — Senior Android Engineer** (Yerevan,
Armenia, open to relocation). It is two things at once, in this order of priority:

1. **An online resume** — the polished, always-current web version of his PDF
   resume, aimed at recruiters and fellow engineers.
2. **A personal brand hub** — dedicated space for his life beyond code: YouTube
   channels, podcasts, and personal interests.

## Information architecture

Two pages, engineering first:

- **`/` — Home / Resume** (single scrolling page). Section order and anchor ids:
  1. Hero (`#top`) — name, title, tagline, contact links, PDF download CTA
  2. Experience (`#experience`)
  3. Skills (`#skills`)
  4. Projects (`#projects`)
  5. Writing & Talks (`#writing`)
  6. YouTube — Code With Kaaveh (`#youtube`)
  7. Education, Certificates & Languages (`#education`)
  8. Footer
- **`/beyond` — Beyond Code**. Intro, personal interests (`#interests`), the other
  YouTube channels (`#channels`), podcasts (`#podcasts`), footer.
- Shared sticky navigation across both pages (spec 013).

## Tech stack

- **Astro** (latest stable), static output, TypeScript strict. No client-side JS
  frameworks — plain `<script>`/TS where interactivity is needed.
- **Hosting**: Cloudflare Workers static assets. `wrangler.jsonc` points at
  `./dist`; Cloudflare Workers Builds deploys pushes to `main` with build command
  `npm run build`.
- **Fonts** are self-hosted (no runtime requests to font CDNs).

## File conventions

```
src/
  layouts/Base.astro          # HTML shell: head, theme script, global CSS (spec 002)
  pages/index.astro           # Home — composes section components
  pages/beyond.astro          # Beyond Code page (spec 011)
  components/sections/*.astro # One component per section (specs 004–012)
  components/*.astro          # Shared pieces (ThemeToggle, Nav, Card, ...)
  styles/tokens.css           # Design tokens as CSS custom properties (spec 002)
  styles/global.css           # Reset + base styles (spec 002)
  scripts/reveal.ts           # Scroll-reveal utility (spec 002)
  data/*.ts                   # ALL site content, typed (spec 003)
public/                       # Static passthrough (resume PDF, favicon, og image)
assets/resume/Kaaveh_Mohamedi.pdf  # Source-of-truth resume PDF (committed)
```

Components render content from `src/data/` — **no resume facts hardcoded in
components**.

## Design direction: bold & animated

Confident, colorful, obviously crafted by an engineer who cares — but never at the
cost of readability or performance.

- **Dark-first**: dark theme is the default; light theme fully supported. Theme =
  `data-theme="dark" | "light"` on `<html>`, chosen by (1) localStorage override,
  (2) `prefers-color-scheme`. An inline `<head>` script applies it pre-paint (no
  flash). Toggle component provided by spec 002.
- **Identity accents** (exact shades may be fine-tuned in spec 002; the pairing is
  intentional and stays): **Android green `#3DDC84`** + **Kotlin violet
  `#7F52FF`**, used solo and as the signature gradient
  (`linear-gradient(135deg, #7F52FF, #3DDC84)`).
- **Type**: big, bold, fluid (clamp-based) headings; a geometric display face for
  headings, a workhorse sans for body, a monospace accent (JetBrains Mono) for
  labels/code-flavored details.
- **Motion**: entrance reveals on scroll (IntersectionObserver + CSS), staggered
  children, hover lift/glow on cards, one signature animated moment in the hero.
  Motion is garnish, not load-bearing: with `prefers-reduced-motion: reduce`
  everything appears instantly and nothing moves.

## Quality budgets (hard requirements)

- Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices, SEO.
- Semantic HTML5 landmarks; exactly one `<h1>` per page; logical heading order.
- Fully keyboard navigable with visible focus states.
- Color contrast ≥ WCAG AA in **both** themes (4.5:1 body text, 3:1 large text).
- No layout shift from fonts/images (size everything; `font-display: swap`).
- No third-party iframes at page load — facade/click-to-load only (spec 009).
- Works from 320 px to ≥ 1440 px wide.

## Content: sources of truth

- Professional facts: `assets/resume/Kaaveh_Mohamedi.pdf` (in this repo). Spec 003
  transcribes it into `src/data/`; after 003, `src/data/` is what components read.
- Verified live data (fetched 2026-07): GitHub stars — ComposeNews **377★**,
  sdp-compose **48★**, ComposeBreak **11★**.
- `TODO(Kaaveh)` marks facts/links we do not reliably know (some article URLs,
  personal channel URLs, podcast links, credential IDs, production domain). Ask
  the user; **never fabricate**. It is always better to ship a section with fewer,
  correct items than more, guessed ones.

## Known identity links (verified)

| What | URL |
|---|---|
| Email | `mailto:Kaaveh@pm.me` |
| LinkedIn | https://www.linkedin.com/in/kaaveh |
| GitHub | https://github.com/Kaaveh |
| Medium | https://medium.com/@Kaaveh |
| YouTube (code) | https://www.youtube.com/@CodeWithKaaveh |
| Droidcon Academy instructor | https://academy.droidcon.com/kaaveh-mohamedi |

Production site URL: `https://kaavehdev.ir` (confirmed 2026-07-12; the
`cv.kaavehdev.ir` subdomain also serves the site, apex is canonical). Kept in one
config spot (`src/data/site.ts` `siteUrl`, mirrored in `astro.config.mjs` `site`)
so it changes in one place.
