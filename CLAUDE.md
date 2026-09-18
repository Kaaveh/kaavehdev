# kaavehdev.ir — Resume & Personal Brand Hub

Personal website of **Kaaveh Mohamedi** (Senior Android Engineer): an online resume
(`/`) plus a "Beyond Code" personal-brand page (`/beyond`). Built with Astro (static
output), deployed as static assets on Cloudflare Workers via Wrangler. Live at
**https://kaavehdev.ir** (the `cv.kaavehdev.ir` subdomain also serves the site).

## Spec-Driven Development workflow

This project is built **one spec at a time**, each typically in a fresh Claude Code
session. The specs live in `specs/`.

1. Read `specs/README.md` (roadmap + status table) and `specs/000-overview.md`
   (shared context — read it every session).
2. Pick the spec the user asked for. If they didn't name one, propose the first
   spec that is `⬜ Not started` and whose dependencies are all `✅ Done`, and
   confirm before starting.
3. Set the spec's status to `🟨 In progress` in `specs/README.md`.
4. Implement **only** that spec. Do not start other specs and do not refactor
   unrelated code.
5. Verify every item in the spec's **Acceptance criteria** checklist.
6. Set the status to `✅ Done` in `specs/README.md`, commit, and push.

### Rules

- **The spec is the contract.** If reality forces a deviation, implement the
  sensible thing and record it in an `## Implementation notes` section appended to
  that spec file.
- **Never invent facts, numbers, links, or copy about Kaaveh.** Anything marked
  `TODO(Kaaveh)` must be asked of the user or left visibly absent — never guessed.
- The resume PDF at `assets/resume/Kaaveh_Mohamedi.pdf` is the source of truth for
  professional facts. Where it conflicts with older web data, the PDF wins.
- Keep the site fully static — no server-side runtime code unless a spec says
  otherwise.
- Content lives in `src/data/` (typed TS modules, introduced by spec 003).
  Components never hardcode resume facts.

## Stack facts

- Astro with static output, TypeScript strict — introduced by spec 001.
- Node 22.12+ (required by Astro 7), npm. `npm install`, `npm run dev`,
  `npm run build` (runs `astro check`, then outputs `dist/`), `npm run preview`.
- Cloudflare Workers serves static assets per `wrangler.jsonc`
  (`assets.directory` becomes `./dist` in spec 001). Local prod-like check:
  `npm run build && npx wrangler dev`.
- Deployment: Cloudflare Workers Builds on push to `main`. The dashboard build
  command is `npm run build` (confirmed by Kaaveh, 2026-07-08).

## Publishing a book

The `/translations/<slug>/` books are rendered in their own repositories, never
here — Cloudflare Workers Builds has no Quarto or TeX. Tagging a release there
publishes it here, with no commit in this repo. The reasoning is in
[`specs/021-switch-on-automatic-publishing.md`](./specs/021-switch-on-automatic-publishing.md);
this is the checklist.

**What a book repository owes the site**

1. **Four unversioned release assets**, attached alongside the versioned ones, named
   from one base (`<assetBase>`): `<assetBase>-html.tar.gz` (the rendered book, which
   `scripts/fetch-book.mjs` unpacks), `<assetBase>.pdf`, `<assetBase>-mobile.pdf`,
   `<assetBase>.epub`. The versioned copies stay — they are what makes an old
   release page meaningful. Unversioned names are what
   `releases/latest/download/…` resolves, so no GitHub API call is involved.
2. **A relocatable bundle**, asserted in CI *before* the release is attached: no
   root-absolute `href`/`src` in the rendered HTML, and no raw Markdown in the
   sidebar. The site serves the bundle from a subpath and cannot fix either after
   the fact — both fail only in production. Copy the two `grep` steps from any
   book's `release.yml`.
3. **The deploy-hook POST as the last step**, after the assets are attached,
   guarded on the `SITE_DEPLOY_HOOK_URL` Actions secret so a fork does not fail.
   A POST that does not report `"success": true` fails the release.
4. **A real release, not a pre-release.** GitHub resolves `latest` to the newest
   non-prerelease, non-draft release — so a pre-release is a free dry run: the
   hook fires and the site rebuilds, but nothing user-facing changes.

**What the site owes a book**: one entry in `src/data/translations.ts` —
`assetBase`, `path`, `repoUrl`, and the card's facts, taken from the book's own
`_quarto.yml` / README, never guessed. `status` is hand-written and stays
hand-written. No `assetBase` → not fetched, renders as work in progress. No
`repoUrl` → renders with no links, which is what a private repo gets.

**The secret** is one Cloudflare deploy hook URL for the `kaavehdev` Worker
(dashboard → Workers & Pages → `kaavehdev` → Settings → Builds → Deploy hooks),
copied into each book repo. It is a credential: rotating it is one dashboard
action plus one secret edit per repository.

## Quality bar (details in specs/000-overview.md)

- Lighthouse (mobile) ≥ 90 in all categories.
- Semantic HTML, keyboard accessible, visible focus states.
- `prefers-reduced-motion` respected by every animation.
- Motion via CSS + IntersectionObserver. Third-party iframes only behind a click
  (facade pattern).
