# 001 — Project Scaffold

## Context

The repo currently contains only a hello-world `index.html` at the root, served
directly by Cloudflare Workers static assets (`wrangler.jsonc` →
`assets.directory: "."`). This spec turns the repo into an Astro project whose
built output (`dist/`) is what Wrangler serves. Everything later builds on this.

## Goal

A building, locally runnable, deploy-ready Astro skeleton — visually still a
placeholder.

## Dependencies

None.

## Requirements

1. Initialize an Astro project **in the repo root** (not a subfolder): latest
   stable Astro, TypeScript `strict`, static output (Astro's default). A minimal
   manual setup (package.json + astro.config.mjs + tsconfig.json + src/) is
   preferred over `npm create astro` template noise.
2. `package.json` scripts: `dev`, `build` (→ `dist/`), `preview`. Commit
   `package-lock.json`.
3. `astro.config.mjs`: leave `site` unset or add a `// TODO(Kaaveh): set production
   URL` comment — the domain is unconfirmed (see 000).
4. Create `src/pages/index.astro`: a minimal placeholder — `<h1>Kaaveh Mohamedi</h1>`,
   "Senior Android Engineer", and a "site under construction" note. Proper
   `<title>Kaaveh Mohamedi — Senior Android Engineer</title>`, `lang="en"`,
   viewport meta. No styling beyond the bare minimum; spec 002 owns design.
5. Delete the root `index.html` and update `wrangler.jsonc`:
   `assets.directory` → `"./dist"`. Keep the rest of the config as is.
6. Extend `.gitignore` with `node_modules/`, `dist/`, `.astro/`.
7. Update `CLAUDE.md` if any stated stack fact ended up different in practice
   (e.g. Node version constraints).

## Design & UX notes

None — placeholder only. Do not pull in fonts, CSS frameworks, or extra
integrations; later specs decide those.

## Acceptance criteria

- [ ] `npm install && npm run build` succeeds and produces `dist/index.html`.
- [ ] `npm run dev` serves the placeholder page.
- [ ] `npx wrangler dev` (after a build) serves the same page from `dist/` at the
      root path.
- [ ] Root `index.html` is gone; `wrangler.jsonc` points at `./dist`.
- [ ] `npx astro check` (or `npm run build`, which type-checks `.astro` files)
      reports no errors.
- [ ] Repo has no committed `node_modules/`, `dist/`, or `.astro/`.

## Human step (flag to Kaaveh in your final message)

Cloudflare Workers Builds must run `npm run build` before `wrangler deploy` —
confirm the build command in the Cloudflare dashboard (Workers & Pages → kaavehdev
→ Settings → Build). Until that's set, pushes to `main` may deploy an empty site.

## Out of scope

Design tokens, fonts, themes (002); any real content (003+); nav (013); SEO meta
beyond a sane `<title>` (014).

## Implementation notes

- Astro 7.0.6 (latest stable at implementation time) requires **Node ≥ 22.12.0**,
  not Node 20+ as CLAUDE.md originally stated. CLAUDE.md and the package.json
  `engines` field were updated accordingly.
- Since Astro 3, `astro build` no longer type-checks on its own. To keep the
  acceptance criterion "`npm run build` type-checks `.astro` files" true, the
  `build` script is `astro check && astro build`, with `@astrojs/check` and
  `typescript` (5.x, per `@astrojs/check`'s peer range) as devDependencies.
