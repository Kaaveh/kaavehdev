# 018 — Translations Section

## Context

Kaaveh is translating **_The Zen Teachings of Master Lin-chi_** (Burton Watson's
English rendering of the ninth-century *Lín-chi lù*, 臨濟錄) into Persian. The
translation lives in its own repository, [`Kaaveh/linji-lu-farsi`](https://github.com/Kaaveh/linji-lu-farsi):
69 numbered sections in four parts plus front matter, an appendix and a glossary,
with 253 notes. It builds to HTML, PDF and EPUB with Quarto.

It should be readable at **`kaavehdev.ir/translations/linji-lu/`**, under a new
`/translations` section that can hold further translations later.

### Why the book is fetched, not committed or rebuilt

Three constraints decide the shape of this spec:

1. **Cloudflare Workers Builds cannot render the book.** Its build image ships
   Node, Python, PHP, Ruby and Go — no TeX, no Quarto (verified against the
   current Workers Builds "Build image" docs, 2026-09). Whatever we do, the HTML
   must arrive pre-built.
2. **Committing the output is too expensive.** `_book/` is 5.4 MB with all 75
   sections still empty stubs, and 10–15 MB fully translated. This repo's `.git`
   is 1.0 MB. Quarto embeds the whole sidebar in every page, so a single content
   edit rewrites all 76 HTML files — and git keeps every version forever.
3. **Quarto's output is relocatable.** Every asset reference is relative and the
   search index is found via a relative `<meta name="quarto:offset">`. Verified
   by inspection: zero root-absolute `href`/`src` in the rendered output. So it
   can be served from a subdirectory unchanged.

So: the book repo's `release.yml` attaches the whole rendered site as
`linji-lu-farsi-VERSION-html.tar.gz`, and this site downloads and unpacks it at
build time into `public/translations/linji-lu/`, which Astro copies to `dist/`
untouched.

The version is **pinned explicitly in `src/data/translations.ts`**, not tracked as
"latest". This site only rebuilds when this repo changes, so "latest" would mean
the published book silently depends on when a deploy happened. A pinned version
makes updating the book a reviewable one-line change.

## Goal

- `/translations` — an Astro page in the site's own design, listing translations.
- `/translations/linji-lu/` — the Quarto-rendered book, fetched at build time.
- A nav entry alongside "Beyond Code".

## Dependencies

003 (data layer), 013 (navigation), 017 (Liquid Glass content surfaces).

## Requirements

0. **TODO(Kaaveh) before this ships as "published"**: the book has no tagged
   release yet, so `bookVersion` starts `null`. While it is `null` the fetch
   script is a no-op and the card renders as work in progress, linking to the
   GitHub repository rather than to a book that does not exist. Tag `v0.1.0` in
   the book repo, then set `bookVersion` here.

1. **Data.** `src/data/translations.ts`, typed by a `Translation` interface added
   to `src/data/types.ts`. Fields: title (Persian), romanised title, source work
   and author, language, repo URL, an optional `bookVersion` and an optional
   `path` for the reading URL. Facts we do not know are omitted, never guessed.

2. **Page.** `src/pages/translations.astro`, using `Base` + `Footer`, following
   the `/beyond` page-hero pattern: one ambient orb, `<h1>`, intro, back link.
   Exactly one `<h1>`; cards are `<h3>` under a section `<h2>`.

3. **Card.** Per translation: Persian title (in a right-to-left run so it shapes
   correctly), the source work and author, status, and — when `bookVersion` is
   set — "Read →" to the book plus PDF and EPUB download links. When it is not
   set, a "Source on GitHub" link only, and the card must be visibly plain
   rather than looking broken.

4. **Nav.** A "Translations" entry next to "Beyond Code", with `aria-current`
   when the path matches. This extends spec 013's nav; that is intended.

5. **Fetch script.** `scripts/fetch-book.mjs`, run before `astro build`:
   - No-op when `bookVersion` is `null`.
   - Skips the download when the correct version is already unpacked, so
     `npm run dev` after one build is offline-capable.
   - Fails the build loudly on a pinned version that cannot be fetched — that is
     a real error, not something to paper over.
   - Uses Node's built-in `fetch` and the system `tar`. No new npm dependency.
   - Verifies the unpacked bundle has an `index.html` before declaring success.

6. **Ignore the fetched output.** `public/translations/` goes in `.gitignore`.
   Nothing generated is committed.

7. **Motion & semantics** as everywhere else: reveal stagger, static under
   `prefers-reduced-motion`, both themes, 320 px to 1440 px.

## Acceptance criteria

- [x] `npm run build` succeeds with `bookVersion: null` and produces
      `dist/translations/index.html`.
- [x] `npm run build` with a real `bookVersion` also produces
      `dist/translations/linji-lu/index.html` and the book's own assets resolve.
- [x] The Astro page at `/translations` and the fetched book at
      `/translations/linji-lu/` do not collide in `dist/`.
- [x] Nav shows "Translations" on every page and marks it current on `/translations`.
- [x] Persian text renders right-to-left and correctly shaped inside the
      otherwise left-to-right page.
- [x] Card with no `bookVersion` reads as work in progress, with no dead links.
- [x] Reveal + reduced-motion correct; both themes and both widths checked.
- [x] Nothing under `public/translations/` is committed.

## Out of scope

- Re-rendering the book as native Astro pages. It would give one visual identity
  and bring the book inside the site's Lighthouse budget, but it means rebuilding
  Quarto's TOC, search, cross-references and note anchors in Astro. If the split
  identity turns out to grate, that is its own spec.
- Any translation other than this one. The data layer is a list so a second entry
  costs nothing, but nothing else is planned.
- Localising the site chrome. The site stays English; only the book is Persian.

## Known deviation from the quality budget

`000-overview.md` requires Lighthouse (mobile) ≥ 90 on all categories. **The book
pages under `/translations/linji-lu/` do not meet that and are not expected to.**
They are Quarto output: Bootstrap plus roughly 1 MB of Quarto's own JavaScript.

This is accepted deliberately. The alternative is rebuilding a 69-section book
reader in Astro, which is a far larger piece of work than the section it would
serve. The budget continues to apply in full to `/translations` itself and to
every other page on the site.

## Implementation notes

Implemented 2026-09-16. Deviations from the spec as written, and why:

- **Renumbered 016 → 018.** This was drafted as spec 016, but the Liquid Glass
  migration (016 + 017) landed on `main` first and took those numbers. Written
  against the pre-Glass design system, the page was rebased onto it: the card
  is `.glass-card .glass-card-strong` (body-size prose, so the denser fill) and
  the "Read →" CTA picks up 016's 1px edge, specular top and full radius so it
  matches the hero CTAs. The page-hero orb is **violet**, not green as first
  built: Base's ambient layer already washes that corner violet, and 016 is
  explicit that overlapping *different* hues compound past the light theme's
  contrast budget. Same hue merely deepens the wash, which is what `/beyond`
  does.
- **Requirement 0 is already resolved.** By the time this was implemented the
  book repo had tagged **`v0.0.2`** (not `v0.1.0`), with all 75 sections
  translated and reviewed. So `bookVersion` ships set, not `null`. The `null`
  path was still exercised: with the field removed, the fetch script no-ops,
  `dist/translations/index.html` builds, no `dist/translations/linji-lu/`
  appears, and the card renders plain with "Source on GitHub" as its only link.
- **PDF and EPUB link to the release assets, not to the unpacked copies.** The
  copies inside the bundle are named in Persian with ZWNJ characters
  (`آموزه‌های-ذن-استاد-لین‌چی.pdf`), which would have to be percent-encoded in
  every link; the release assets are plain ASCII and derived from
  `repoUrl` + `bookVersion`. The release also carries a phone-page-size PDF,
  which the card links as "PDF (phone)".
- **`releaseAsset()` lives in `src/data/translations.ts`.** The book's
  `release.yml` names every asset `<repo>-<version-without-v><suffix>`; the
  fetch script and the page both need that convention, so it is written once.
- **The fetch script reads the data module directly**, run as
  `node --experimental-strip-types … scripts/fetch-book.mjs` from `npm run
  build`. Node's built-in type stripping is enough for this file (types and
  `import type` only), so the pinned version has exactly one home.
- **The "already unpacked" stamp lives in `.astro/`, not `public/`** — a stamp
  under `public/` would ship to `dist/`. Losing the build cache only costs one
  re-download. The skip also requires `index.html` to still be present, so
  deleting the unpacked book re-fetches it.
- **`public/translations` is excluded in `tsconfig.json`.** Otherwise
  `astro check` type-checks Quarto's bundled JavaScript — 13 spurious hints,
  and a future Quarto release could turn one into a build-breaking error.
- **The nav's desktop breakpoint moved from 768 px to 960 px.** Two page pills
  plus five anchors plus the theme toggle no longer fit on a tablet-width bar,
  so the hamburger takes over earlier. Verified no horizontal overflow at 320,
  375, 768, 900 and 1440 px.
- **Drive-by fix:** `.nav-links` / `.mobile-links` were missing
  `list-style: none`, so Chrome drew bullets between every nav item on every
  page. Pre-existing since spec 013; fixed here because this spec adds two more
  of them.
- **Not fixed (pre-existing, out of scope):** `/beyond` overflows horizontally
  by ~12 px at a 320 px viewport. `/` and `/translations` do not.

Verification: `npm run build` clean (0 errors / 0 warnings / 0 hints), and
`npx wrangler dev` serves `/translations/`, `/translations/linji-lu/`, its
subpages, fonts, `search.json` and `assets/rtl.css`. Workers' default
`auto-trailing-slash` handling 307s `…/fa/01.html` → `…/fa/01`; the redirect
resolves and relative assets still resolve from the same directory, so the
book's own links work unchanged.
