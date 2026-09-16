# 019 — Book: RTL sidebar fixes & dark theme

## Context

Spec 018 published the Quarto-rendered book at `/translations/linji-lu/`. Reading
it turned up three defects, all of them in the **book**, not in this site.

**All three are fixed in [`Kaaveh/linji-lu-farsi`](https://github.com/Kaaveh/linji-lu-farsi).**
This repo never renders the book — `scripts/fetch-book.mjs` downloads a release
tarball and unpacks it verbatim. Patching the HTML here would mean rewriting 76
files at build time, and every fix would be silently discarded by the next
version bump. So the work lands upstream, a new version is tagged, and this
repo's entire change is the one-line `bookVersion` in
`src/data/translations.ts`.

### The three defects

Evidence below is from the rendered `v0.0.2` bundle and the book repo at the
same tag, read 2026-09-16.

**1. Raw markdown leaks into the sidebar.** `fa/ma-fang-preface.md` carries a
footnote on its heading:

```markdown
# دیباچهٔ ما فانگ<a id="m1-1"></a>[^۱^](#n1-1)
```

The chapter page renders it correctly —
`<a id="m1-1"></a><a href="#n1-1"><sup>۱</sup></a>` — but Quarto reuses the
heading for the sidebar without the same inline processing, and emits the source
verbatim:

```html
<a href="./fa/ma-fang-preface.html" class="sidebar-item-text sidebar-link"><span
class="chapter-title">دیباچهٔ ما فانگ</span></a><a id="m1-1"></a>[^۱^](#n1-1)
```

Bidi reordering then scrambles it on screen into `دیباچهٔ ما فانگ [۸۱۸] (#-n1 (1`.
The same heading also leaks a bare digit into `<title>`
(`دیباچهٔ ما فانگ۱ – …`), so the browser tab and the EPUB TOC carry it too.
This is the only chapter affected: no other sidebar entry contains `[^…](…)`.

**2. The sidebar's collapse chevron is wrong for RTL.** Quarto's stock rules:

```css
.sidebar-item-container { display: flex; justify-content: space-between; }
.sidebar-item-toggle[aria-expanded="false"] .bi-chevron-right::before { transform: none; }
.sidebar-item-toggle[aria-expanded="true"]  .bi-chevron-right::before { transform: rotate(90deg); }
```

with the markup `<i class="bi bi-chevron-right ms-2">`. Three consequences under
`dir="rtl"`:

- A collapsed section shows `›`, pointing *away* from the text direction. It
  should point left.
- `justify-content: space-between` pushes the toggle to the far edge opposite
  the title, so a part title has to wrap around it — "دفتر یکم: برآمدن به
  تالار" breaks after "به".
- Quarto ships the LTR Bootstrap bundle, where `ms-2` is `margin-left`, not a
  logical inline-start margin.

**3. No dark theme.** `format: html: theme: cosmo` is a single light theme. Per
the Quarto docs, giving `theme` a light/dark pair makes Quarto render a toggle
in the top-right corner by itself and persist the choice in local storage;
`respect-user-color-scheme: true` makes it follow the OS preference first. That
matches how this site already behaves (dark default, `prefers-color-scheme`
fallback), so the two halves agree without any cross-page script.

## Goal

The book reads correctly right-to-left and can be read in the dark, and the
site serves the fixed version.

## Dependencies

018 (translations section). Upstream: a tagged release of `linji-lu-farsi`
containing the fixes.

## Requirements

### In `Kaaveh/linji-lu-farsi`

1. **Keep inline markup out of chapter headings.** Quarto reuses a chapter's
   heading verbatim for the sidebar and for `<title>`, so anything but plain
   text leaks. Fix `fa/ma-fang-preface.md` and add whatever guard the book repo
   prefers so it cannot regress (a rendered-output grep in `release.yml`, next
   to the existing "Bundle is relocatable" assertion, is the cheap version).

   **TODO(Kaaveh):** where note ۱ goes instead is a translation decision, not
   ours. The two obvious options — move the marker onto the italic attribution
   line that opens the chapter, or set a clean `title:` in the file's front
   matter and let the heading keep the note — change what the reader sees.
   Pick one; do not let this spec pick it.

2. **Correct the sidebar chevron for RTL**, in `assets/rtl.css` (that file
   already exists for exactly this kind of correction, and this is a
   presentation fix — do not fork Quarto's partials):
   - Collapsed sections point **left**; expanded still point **down**.
   - The toggle sits at the **right** of its row, leading the title, per
     Kaaveh's call — not at the far opposite edge.
   - The title takes the remaining width and is not made to wrap by the
     toggle's placement. Long part titles may still wrap on their own; that is
     fine.
   - Spacing is direction-correct. Remember `ms-*` is physical in Quarto's
     bundle.

3. **Add a dark theme.** Give `format: html: theme` a light/dark pair and set
   `respect-user-color-scheme: true`. `css: assets/rtl.css` applies to both
   modes; that file carries no colors today, and it must stay that way — any
   color it gains has to be defined for both modes.

   **TODO(Kaaveh):** which dark theme. `darkly` is the conventional Bootswatch
   partner for `cosmo`, but this is an aesthetic call about how the book looks.

4. **Tag a release.** The existing `release.yml` attaches the HTML tarball, PDF,
   mobile PDF and EPUB; nothing about it needs to change.

### In this repo

5. **Bump `bookVersion`** in `src/data/translations.ts` to the new tag. That is
   the whole change here. If the new release also changes the book's
   `status` (more sections reviewed, a new edition), update that string too —
   it is data, so it does not belong in a component.

## Acceptance criteria

- [ ] The sidebar entry for `دیباچهٔ ما فانگ` is plain text — no `[^…](…)`, no
      stray anchor, no digit — and its `<title>` is clean.
- [ ] No other chapter leaks markup into the sidebar or `<title>`.
- [ ] Collapsed sections show a left-pointing chevron; expanding one turns it
      down; both animate as before.
- [ ] The chevron sits at the right of its row and the part titles no longer
      wrap around it.
- [ ] The book has a working light/dark toggle that persists across pages, and
      follows the OS preference on a first visit.
- [ ] Persian text, the search box, the TOC and the download links are all
      legible in dark mode — contrast checked, not just eyeballed.
- [ ] A new version is tagged and its release carries all four assets.
- [ ] `bookVersion` here points at it, `npm run build` succeeds, and
      `/translations/linji-lu/` serves the fixed book.

## Out of scope

- Restyling the book to match the site's Liquid Glass identity. Spec 018 already
  accepted the split visual identity and the Lighthouse budget that comes with
  Quarto's Bootstrap; this spec does not reopen it.
- Syncing the book's theme choice with the site's toggle. Same origin, so it is
  possible, but `respect-user-color-scheme` gets both halves to the same answer
  for free on a first visit, and a reader who deliberately sets one differently
  probably means it.
- The PDF and EPUB. Defect 1 touches the EPUB TOC and is fixed at the source, so
  it comes along; defects 2 and 3 are HTML-only.

## Implementation notes

_(filled in during implementation)_
