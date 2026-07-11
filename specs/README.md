# Specs Roadmap — kaaveh.dev

How to work on this project: see `CLAUDE.md` at the repo root. Shared context for
every spec: [`000-overview.md`](./000-overview.md).

One spec = one implementation session. Update the **Status** column when you start
(`🟨 In progress`) and when you finish (`✅ Done`).

## Status table

| #   | Spec                                                             | Depends on   | Status         |
|-----|------------------------------------------------------------------|--------------|----------------|
| 000 | [Overview & shared context](./000-overview.md)                  | —            | 📖 Reference   |
| 001 | [Project scaffold](./001-project-scaffold.md)                   | —            | ✅ Done        |
| 002 | [Design system](./002-design-system.md)                         | 001          | ✅ Done        |
| 003 | [Content & data layer](./003-content-data.md)                   | 001          | ✅ Done        |
| 004 | [Hero section](./004-hero-section.md)                           | 002, 003     | ✅ Done        |
| 005 | [Experience section](./005-experience-section.md)               | 002, 003     | ✅ Done        |
| 006 | [Skills section](./006-skills-section.md)                       | 002, 003     | ✅ Done        |
| 007 | [Projects showcase](./007-projects-showcase.md)                 | 002, 003     | ✅ Done        |
| 008 | [Writing & talks section](./008-writing-talks-section.md)       | 002, 003     | ⬜ Not started |
| 009 | [YouTube — Code With Kaaveh](./009-youtube-code-section.md)     | 002, 003     | ⬜ Not started |
| 010 | [Education, certificates & footer](./010-education-certs-footer.md) | 002, 003 | ⬜ Not started |
| 011 | [Beyond Code page](./011-beyond-code-page.md)                   | 002, 003     | ⬜ Not started |
| 012 | [Podcasts section](./012-podcasts-section.md)                   | 011          | ⬜ Not started |
| 013 | [Navigation](./013-navigation.md)                               | 004–012      | ⬜ Not started |
| 014 | [SEO & meta](./014-seo-meta.md)                                 | 003          | ⬜ Not started |
| 015 | [Polish: a11y & performance](./015-polish-a11y-performance.md)  | 001–014      | ⬜ Not started |

Recommended order: top to bottom. Specs 004–011 are independent of each other and
can be done in any order once 002 and 003 are ✅. 014 can slot in any time after
003, but its OG image is most useful once the visual identity (002) exists.

## Definition of done (every spec)

- [ ] Every item in the spec's **Acceptance criteria** is checked and true.
- [ ] `npm run build` succeeds with no errors or new warnings.
- [ ] The result was visually checked via `npm run dev` (and
      `npm run build && npx wrangler dev` for anything touching deployment).
- [ ] Both themes (dark + light) and mobile + desktop widths were checked for any
      UI change.
- [ ] No invented content: everything user-facing traces to `src/data/` or the
      spec; `TODO(Kaaveh)` items are resolved with the user or left out visibly.
- [ ] Status table above updated; work committed and pushed.
