# kaaveh.dev — Resume & Personal Brand Hub

Personal website of **Kaaveh Mohamedi** (Senior Android Engineer): an online resume
(`/`) plus a "Beyond Code" personal-brand page (`/beyond`). Built with Astro (static
output), deployed as static assets on Cloudflare Workers via Wrangler.

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
  command must be `npm run build` once spec 001 lands (human step — remind Kaaveh
  if unverified).

## Quality bar (details in specs/000-overview.md)

- Lighthouse (mobile) ≥ 90 in all categories.
- Semantic HTML, keyboard accessible, visible focus states.
- `prefers-reduced-motion` respected by every animation.
- No client-side JS frameworks; motion via CSS + IntersectionObserver. Third-party
  iframes only behind a click (facade pattern).
