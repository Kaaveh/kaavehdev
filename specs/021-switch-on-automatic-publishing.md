# 021 — Switching automatic publishing on

## Context

Spec 020 wrote the mechanism into three repositories and verified everything
that can be verified from inside this one: both books fetch from
`releases/latest/download/`, all eight unversioned URLs resolve, a second build
re-downloads nothing. What it could not do is make any of it *fire*. A deploy
hook has to be created in a dashboard, and a secret has to be added to each book
repository — neither is scriptable from here, and both are Kaaveh's.

So today tagging a release produces a release and the site ignores it. 020's
first three acceptance criteria are still unchecked, and will stay unchecked
until this spec is done.

### The second job: writing the contract down

There is a second reason this is a spec rather than a checklist in a commit
message. The agreement between a book repository and this site currently exists
as two near-identical blocks of YAML in two repositories plus an `assetBase`
string here. Nothing states it. The Taoteching
(`Kaaveh/Lao_Tzu_Taoteching`) is a third book that will need exactly the same
agreement, and rediscovering a convention by diffing someone else's release
workflow is how conventions drift.

### The gap that only shows in production

`linji-lu-farsi`'s release workflow asserts two things about the rendered bundle
before attaching it: that every asset path is relative (the bundle is served
from `/translations/<slug>/`, so a root-absolute path 404s only once deployed),
and that no raw Markdown leaked into the sidebar. `Record_of_Linji`'s workflow
asserts neither. Both bundles happen to be clean today — checked 2026-09-18 on
the unpacked copies, zero root-absolute references in either — but "happens to
be clean" is not a guard, and the failure it guards against is invisible until
the book is live on the site.

That assertion is part of what a book repo owes the site, which is precisely
why the contract needs stating rather than copying.

## Goal

Tagging a release in any of Kaaveh's book repositories publishes it on
kaavehdev.ir, with no commit here — actually, for both released books, verified
end to end. Adding a fourth book costs a card entry and a checklist, not an
investigation.

## Dependencies

020 (🟨 — its code is merged; its cross-repo criteria are what this spec
finishes).

Blocking, and Kaaveh's to do — none can be scripted from here:

- **TODO(Kaaveh):** create a deploy hook for the `kaavehdev` Worker (Cloudflare
  dashboard → Workers & Pages → `kaavehdev` → Settings → Builds → Deploy hooks),
  targeting branch `main`. Copy the URL.
- **TODO(Kaaveh):** add it as the Actions secret `SITE_DEPLOY_HOOK_URL` in
  **both** `Kaaveh/Record_of_Linji` and `Kaaveh/linji-lu-farsi`.
- **TODO(Kaaveh):** merge [`Record_of_Linji#1`](https://github.com/Kaaveh/Record_of_Linji/pull/1)
  and [`linji-lu-farsi#2`](https://github.com/Kaaveh/linji-lu-farsi/pull/2).

## The publishing contract

### What a book repository owes the site

1. **Four unversioned release assets**, attached alongside the versioned ones,
   named from a single base (`<assetBase>` below):

   | file | purpose |
   |---|---|
   | `<assetBase>-html.tar.gz` | the rendered book; the site unpacks this |
   | `<assetBase>.pdf` | linked from the card |
   | `<assetBase>-mobile.pdf` | linked from the card |
   | `<assetBase>.epub` | linked from the card |

   The versioned copies stay. They are what makes an old release page
   meaningful.

2. **A relocatable bundle.** Every asset path in the tarball relative, no
   root-absolute `href`/`src`, asserted in CI before the release is attached.
   The site serves the bundle from a subpath and cannot fix this after the fact.

3. **The deploy-hook POST as the last step**, after the assets are attached.
   Guarded on `SITE_DEPLOY_HOOK_URL` being present so a fork does not fail; the
   release fails if the POST does not report `success: true`.

4. **A real release, not a pre-release.** GitHub resolves `latest` to the newest
   non-prerelease, non-draft release. A pre-release is therefore a free dry run:
   the hook fires and the site rebuilds, but `latest/download/` still resolves
   to the previous release, so nothing user-facing changes.

### What the site owes a book

`src/data/translations.ts` gains one entry: `assetBase` (the name above),
`path` (where it is served and unpacked), `repoUrl`, and the card's facts —
which come from the book's own `_quarto.yml`, README and spec roadmap, never
from guesswork. `status` is hand-written and stays hand-written; it is a
translation fact, and no build can derive it.

A translation with no `assetBase` is not fetched and renders as work in
progress. A translation with no `repoUrl` renders with no links at all — which
is what a private repository gets, because a link nobody can open is worse than
no link.

## Requirements

1. **Turn it on, in this order.** The hook and secret first, the merges second:
   a merged workflow with no secret is a silent no-op, which is harder to notice
   than a workflow that isn't merged yet.

2. **Port the two bundle assertions to `Record_of_Linji`** — "Bundle is
   relocatable" and "No Markdown leaks into the sidebar", the steps
   `linji-lu-farsi`'s workflow already runs, adapted to its own paths. Both
   repos then satisfy clause 2 of the contract.

3. **Prove the hook with a pre-release before trusting it with a real one.**
   Tag a pre-release in `Record_of_Linji`; a Workers build must start, and the
   live book must be unchanged afterwards. This separates "the hook works" from
   "the new book is correct", which a single real tag would conflate.

4. **Then prove the whole chain with a real patch release**, on one book, with
   something deliberately changed in the text so the deployed result can be
   distinguished from the old one. No commit in this repo at any point.

5. **State the contract where the next book will look for it.** A short
   *Publishing a book* section in `CLAUDE.md` naming the four asset names, the
   two assertions, the hook step and the secret, pointing here for the reasoning.
   Prose only — nothing to build.

6. **Onboard the Taoteching when, and only when, it is public and has a
   release.** Its own repository has to grow a Quarto set-up and a release
   workflow first (its spec 007, still open there). Then here: `repoUrl`,
   `assetBase`, `path`, and a `status` line from its own roadmap. Until then its
   card stays link-less, which is already correct.

## Acceptance criteria

- [ ] A deploy hook exists for `kaavehdev`, targeting `main`.
- [ ] `SITE_DEPLOY_HOOK_URL` is set in both `Record_of_Linji` and
      `linji-lu-farsi`, and both workflow PRs are merged.
- [ ] `Record_of_Linji`'s release workflow asserts a relocatable bundle and a
      clean sidebar, and a release still succeeds with those steps in place.
- [ ] A pre-release tag starts a Workers build and leaves the live book
      unchanged.
- [ ] A real release tag on one book puts changed content on
      `kaavehdev.ir/translations/<slug>/` with no commit in this repo, verified
      by the changed thing — not by the build going green.
- [ ] The release still passes with the secret absent (a fork).
- [ ] Both books' four unversioned assets resolve through
      `releases/latest/download/…` after that release, and the versioned ones
      exist on the release page.
- [x] `CLAUDE.md` has the *Publishing a book* section.
- [ ] Spec 020's first three acceptance criteria are now checked, and 020 is
      marked ✅.

## Out of scope

- **Fetching a private book.** The Taoteching's release assets are unreachable
  to an unauthenticated build, and the fix — a GitHub token in the Cloudflare
  build environment — buys nothing once the repository is public. Wait for it
  to be public.
- **Automating `status`.** Unchanged from 020: it is a translation fact.
- **Alerting.** A failed POST fails the release, in red, in the repository that
  caused it. Anything beyond that is a monitoring stack for an event that
  happens a few times a year.
- **Rolling back from this repo.** Still the book repo's job, by tagging.

## Known cost: the hook URL is a credential, once per repo

Every book repository holds a copy of the same hook URL. Rotating it is one
dashboard action plus one secret edit per repository — three edits at three
books, which is fine, and would stop being fine at thirty. If it ever does,
the way out is a single workflow in one repository that the others call, not a
different trigger.

## Implementation notes

**2026-09-18 — everything scriptable is done; the switch itself is not.**

Done here and in the book repositories:

- Requirement 2, plus one the spec did not anticipate. The two assertions are
  ported to `Record_of_Linji`
  ([PR #2](https://github.com/Kaaveh/Record_of_Linji/pull/2)) **and** to
  `Lao_Tzu_Taoteching`
  ([PR #1](https://github.com/Kaaveh/Lao_Tzu_Taoteching/pull/1)). The Taoteching
  was onboarded after this spec was written (commit `8a9a780`), which makes it a
  third book owing clause 2 of the contract, and its workflow asserted neither.
  Verified before adding the steps, so neither can fail the next release: zero
  hits for both greps across `Record_of_Linji`'s 82 and the Taoteching's 88
  rendered pages, run on the bundles `releases/latest/download/` serves today.
- Requirement 5. The *Publishing a book* section in `CLAUDE.md`, pointing here.
- Requirement 6 is already satisfied by `8a9a780`: the Taoteching is public, has
  a release, and has its `repoUrl`/`assetBase`/`path`/`status` entry. The
  "wait for it to be public" out-of-scope note is now moot. What it still lacks
  is the secret — see below.
- Re-verified, as background for the criteria that stay open: all **twelve**
  unversioned assets (four × three books) resolve through
  `releases/latest/download/`, and `npm run build` is green.

**Found while verifying — `linji-lu-farsi` is the fragile one.** Its four
unversioned assets resolve today, but they are on release `v0.0.3` and its
workflow on `main` does not produce them; PR #2 there, still open, is what adds
them. So its *next* release attaches only versioned assets, `latest/download/`
stops resolving, and this site's build fails on it. Merging that PR is not
merely turning the hook on for that book — it is what keeps it working at all.

Not done, because none of it is scriptable from here (updated from the
Dependencies list above, checked 2026-09-18):

| | state |
|---|---|
| Cloudflare deploy hook for `kaavehdev` | unknown — dashboard only, cannot be read from here |
| `SITE_DEPLOY_HOOK_URL` in `Record_of_Linji` | absent (`gh secret list` empty) |
| `SITE_DEPLOY_HOOK_URL` in `linji-lu-farsi` | absent |
| `SITE_DEPLOY_HOOK_URL` in `Lao_Tzu_Taoteching` | absent — a **third** copy the spec did not list |
| `Record_of_Linji#1` | merged 2026-09-18 |
| `linji-lu-farsi#2` | open |

Note the ordering hazard in Requirement 1 has already half-happened:
`Record_of_Linji#1` is merged with no secret present, so its `Rebuild
kaavehdev.ir` step currently takes the skip branch and a release there publishes
nothing. That is the silent no-op the requirement warns about — harmless as long
as the secret lands before the next tag. Set the hook and all three secrets
first, then merge the three open PRs, then run Requirements 3 and 4.
