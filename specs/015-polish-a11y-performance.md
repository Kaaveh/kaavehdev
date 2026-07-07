# 015 — Polish: Accessibility & Performance Pass

## Context

Final spec: everything is built; this session audits the whole site against the
000 quality budgets and fixes what it finds. This is a **verification-heavy**
spec — expect to spend most of the session measuring, not writing.

## Goal

Both pages verifiably meet the quality bar; results recorded.

## Dependencies

001–014 all ✅.

## Requirements

1. **Lighthouse (mobile emulation)** against the **built** site
   (`npm run build && npx wrangler dev`, or `npm run preview`): run on `/` and
   `/beyond`. Fix until all four categories ≥ 90 on both pages. Typical suspects:
   font preloads, image sizing, unused CSS, contrast.
2. **Keyboard audit**: Tab through both pages end-to-end — skip link first, every
   interactive element reachable in a sensible order, visible focus everywhere,
   mobile menu focus behavior (013) intact, no keyboard traps.
3. **Reduced-motion audit**: with `prefers-reduced-motion: reduce` emulated,
   walk both pages — zero animation/transform movement anywhere (hero flourish,
   reveals, hovers, menu, smooth scroll) and no content missing.
4. **Responsive sweep**: 320 / 375 / 768 / 1024 / 1440 px on both pages, both
   themes — no horizontal scroll, no overlapping/clipped text, hero and nav
   behave at the extremes.
5. **Content integrity sweep**: compare rendered pages against
   `specs/003-content-data.md` — every fact verbatim, no `TODO` text leaking
   into the UI, all external links resolve (spot-check with curl or clicks),
   PDF downloads.
6. **HTML validity/semantics**: one h1 per page, logical heading order,
   landmarks (header/nav/main/footer), images have alt text, external links
   `rel="noopener"`.
7. Fix everything found (within this spec's audit scope — cosmetic refactors of
   working sections are out of scope). If a fix requires changing an earlier
   spec's decisions, do it and record it in **that** spec's Implementation notes.
8. Record results in this file's Implementation notes: final Lighthouse scores
   per page/category, issues found → fixed, anything consciously deferred.

## Acceptance criteria

- [ ] Lighthouse (mobile) ≥ 90 × 4 categories × 2 pages, scores recorded.
- [ ] Keyboard, reduced-motion, and responsive audits pass as specified above.
- [ ] Content integrity sweep clean (no TODO leakage, links verified, facts
      verbatim).
- [ ] Implementation notes filled in with scores and the fix list.
- [ ] `specs/README.md` shows 001–015 ✅ — the site is done.

## Out of scope

New features/sections, redesigns, analytics. If the audit surfaces a genuinely
new need, propose a new numbered spec (016+) instead of scope-creeping this one.
