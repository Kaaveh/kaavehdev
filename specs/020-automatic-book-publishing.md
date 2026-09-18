# 020 — Automatic book publishing

## Context

Spec 018 pinned the book's version in `src/data/translations.ts` and spec 019
bumped it. Publishing a book version therefore costs a commit, a PR and a merge
in *this* repo, which is the thing Kaaveh wants gone: tagging a release in
[`Kaaveh/linji-lu-farsi`](https://github.com/Kaaveh/linji-lu-farsi) should put
that book on `kaavehdev.ir` with no change here at all.

### Two separate blockers, not one

The pin is the visible half and the smaller one.

1. **The version is pinned.** `scripts/fetch-book.mjs` downloads exactly the tag
   in `bookVersion`, so a new release is simply not looked at.

2. **Nothing triggers a rebuild.** Cloudflare Workers Builds builds on a push to
   `main` in this repo. A release in the book repo is invisible to it. This is
   the blocker that matters: it means "latest" *on its own is worse than a pin*,
   because the published book would then depend on whenever some unrelated
   commit happened to cause a deploy. Spec 018's reasoning for pinning
   (`translations.ts`, and 018's "Why the book is fetched" section) is correct
   exactly as far as that — and stops being correct once a trigger exists.

So the pin is not the problem to solve first. The trigger is, and it makes
dropping the pin safe rather than reckless.

### The trigger

Workers Builds has **deploy hooks**: a POST URL with authentication embedded, so
no header and no API token at the call site (verified against the current
Workers Builds "Deploy hooks" docs, 2026-09-16).

```bash
curl -X POST "https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/<DEPLOY_HOOK_ID>"
```

It returns `{"success": true, "result": {"build_uuid": …, "branch": "main", …}}`.
Called from the book's `release.yml`, the chain closes: tag → release workflow →
POST → Workers Builds builds `main` → `fetch-book.mjs` pulls the new book.

The URL is a credential. It belongs in a GitHub Actions secret in the book repo,
never in the workflow file.

### Resolving "latest" without an API call

`releaseAsset()` builds URLs like
`…/releases/download/v0.0.3/linji-lu-farsi-0.0.3-html.tar.gz` — the version is
in the **file name**, so "latest" cannot construct a URL without already knowing
the tag.

GitHub serves `…/releases/latest/download/<asset-name>`, but only for an asset
name that is stable across releases. The book's `release.yml` already `cp`s each
artefact into `dist/` under a versioned name; attaching a second, unversioned
copy of each costs four more `cp` lines and no build time.

The alternative — resolving `tag_name` from `GET /repos/…/releases/latest` at
build time — is rejected. Unauthenticated GitHub API is 60 requests/hour per IP,
Cloudflare's build runners share IPs, and a 403 would break the site build for a
reason that has nothing to do with the site. Stable asset names need no network
call beyond the download itself.

## Goal

Tagging a release in the book repo publishes that book on `kaavehdev.ir`, with
no commit in this repo.

## Dependencies

018 (translations section), 019 (the current release, `v0.0.3`).

Blocking, and Kaaveh's to do — neither can be scripted from here:

- **TODO(Kaaveh):** create a deploy hook for the `kaavehdev` Worker (Cloudflare
  dashboard → Workers & Pages → `kaavehdev` → Settings → Builds → Deploy hooks),
  targeting branch `main`. Copy the URL.
- **TODO(Kaaveh):** add it to `Kaaveh/linji-lu-farsi` as the Actions secret
  `SITE_DEPLOY_HOOK_URL`.

## Requirements

### In `Kaaveh/linji-lu-farsi`

1. **Attach unversioned copies of all four assets**, alongside the versioned
   ones, in the existing "Name the artefacts after the tag" step. The versioned
   names stay — they are what makes an old release page still meaningful, and
   spec 019's links point at them. The unversioned names are what
   `releases/latest/download/` resolves:

   | versioned (keep) | unversioned (add) |
   |---|---|
   | `linji-lu-farsi-0.0.4-html.tar.gz` | `linji-lu-farsi-html.tar.gz` |
   | `linji-lu-farsi-0.0.4.pdf` | `linji-lu-farsi.pdf` |
   | `linji-lu-farsi-0.0.4-mobile.pdf` | `linji-lu-farsi-mobile.pdf` |
   | `linji-lu-farsi-0.0.4.epub` | `linji-lu-farsi.epub` |

2. **POST the deploy hook** as the last step of `release.yml`, after
   `softprops/action-gh-release@v2` has attached the assets — not before, or the
   site will build against a release whose assets do not exist yet. Guard on the
   secret being present so a fork, or the repo before Kaaveh adds the secret,
   does not fail the release. Fail the step if the POST does not return
   `success: true`: a silent no-op here is the whole feature silently not
   working.

### In this repo

3. **Point `releaseAsset()` at `releases/latest/download/`** and drop the
   version from the asset name. One function, still the single home of the
   naming convention.

4. **Retire `bookVersion` as a pin.** `fetch-book.mjs` currently uses it for
   three things, and each needs an answer:
   - *Which tarball to fetch* — now always the latest.
   - *Whether there is anything to fetch at all* — the `null` path from 018 must
     survive. A translation with no published book still has to render as work
     in progress with no dead links. Replace the pin with something that states
     that fact directly rather than implying it from a version string.
   - *The "already unpacked" stamp* in `.astro/`, which exists so `npm run dev`
     after one build is offline-capable. A version string is no longer available
     to compare, so pick a different freshness signal — the release's
     `Last-Modified`/`ETag`, or a cheap conditional request. A stamp that can
     never match is the same as no stamp: correct, but it re-downloads 3 MB on
     every dev start.

5. **The `· v0.0.3` chip on the card.** The site will no longer know the
   version. Either drop it — the book's own front page already prints
   «نسخهٔ ۰.۰.۳ — ۲۵ شهریور ۱۴۰۵», so the chip is duplication — or have
   `fetch-book.mjs` read it out of the unpacked bundle and write it where
   `translations.astro` can import it.

   **TODO(Kaaveh):** which. Dropping it is materially less machinery; keeping it
   is a real thing the card currently says.

6. **`status` stays hand-written.** It is a translation fact
   ("All 75 sections translated and reviewed"), not a build fact, and nothing in
   this spec can derive it. It keeps being edited here when it changes — that is
   correct, not a gap.

## Acceptance criteria

- [ ] Tagging a throwaway release in the book repo causes a Workers build to
      start, with no commit in this repo.
- [ ] That build serves the new book at `/translations/linji-lu/`, verified by
      something that changed in it — not by the build merely going green.
- [ ] The deploy hook POST runs after the assets are attached, and the release
      fails loudly if the hook returns anything but success.
- [ ] `release.yml` still passes with the secret absent (a fork, or before the
      secret is added) rather than failing the release.
- [ ] All four unversioned assets resolve through
      `https://github.com/Kaaveh/linji-lu-farsi/releases/latest/download/…`, and
      the versioned ones still exist on the release page.
- [ ] `npm run build` fetches without any GitHub API call, and still fails loudly
      when the download fails.
- [ ] A translation with no published book still renders as work in progress with
      no dead links — 018's behaviour, preserved.
- [ ] `npm run dev` after one build does not re-download the book.
- [ ] Both themes and both widths checked if the card's markup changes at all.

## Out of scope

- **Automating `status`.** See requirement 6.
- **Anything for a second translation.** The data layer is a list and this spec
  changes nothing about that, but nothing else is planned.
- **Rolling back to an old book from this repo.** Under this spec the site
  serves whatever the book's latest release is; going back means tagging a new
  release in the book repo. That is the right place for it.

## Known cost: reproducibility

This is a real trade, not a free win, and it is the reason spec 018 pinned in
the first place.

**Rebuilding an old commit of this repo will pull the current book, not the one
that shipped with it.** A deploy from a month-old commit gets today's
translation. For a site whose book is content rather than code that is arguably
what you want — and it is the price of the thing being automatic at all — but
it means `git checkout` of an old commit no longer reproduces what was live.

If that ever bites, the way back is to restore the pin and keep the deploy hook:
a bump here would then still be needed, but it would be the *only* step, with no
separate deploy. That is a strictly smaller spec than this one.

## Implementation notes

_(filled in during implementation)_
