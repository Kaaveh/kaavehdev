# 013 — Navigation

## Context

Both pages exist with all sections; the site still lacks a header. This spec adds
the shared sticky nav and relocates the theme toggle (temporarily placed by 002)
into it.

## Goal

`src/components/Nav.astro` mounted on `/` and `/beyond` via the shared layout
composition.

## Dependencies

004–012 (all sections/pages exist so links are real).

## Requirements

1. **Structure**: left — wordmark "Kaaveh Mohamedi" (or a "K." monogram with the
   gradient) linking `/#top`; right — links: Experience, Skills, Projects,
   Writing, YouTube (`/#<anchor>` so they work from `/beyond` too), **Beyond
   Code** (`/beyond`, visually distinguished as a page link), and the
   ThemeToggle (remove its temporary 002 placement).
2. **Sticky + styled**: fixed/sticky top bar, translucent `--bg` with
   backdrop-blur and a hairline bottom border once scrolled (scrolled state via a
   tiny scroll listener or IntersectionObserver sentinel).
3. **Scroll-spy** (home only): the section currently in view gets an accent
   active state (IntersectionObserver on the section elements — reuse patterns
   from `reveal.ts`, don't duplicate observer boilerplate). On `/beyond`, the
   "Beyond Code" item is active via `aria-current="page"`.
4. **Mobile (< ~768 px)**: hamburger `<button>` (aria-expanded, aria-controls)
   opening a full-screen/slide-in overlay with large staggered link entrances —
   this is a signature bold moment. Focus management: focus moves into the menu
   on open, Esc and link-click close it, focus returns to the button; body
   scroll locked while open. Reduced-motion: menu appears/disappears instantly.
5. **Accessibility**: `<header>` + `<nav aria-label="Main">`; a "Skip to
   content" link as the first focusable element targeting `#main` (Base layout
   already has `<main id="main">`); anchor scrolling accounts for the fixed
   header (`scroll-margin-top` on sections); everything keyboard-operable.
6. Nav height must not overlap/clip the hero at 320 px.

## Design & UX notes

- Keep the bar quiet (it sits over a bold hero) — restraint here, drama in the
  mobile overlay.
- Active/hover states use `--accent`; wordmark is the only gradient element in
  the bar.

## Acceptance criteria

- [ ] Nav renders on both pages; every link resolves (including cross-page
      anchors from `/beyond`).
- [ ] Scroll-spy tracks sections correctly on home; Beyond Code shows
      `aria-current="page"` on `/beyond`.
- [ ] Mobile menu: open/close via touch and keyboard, focus trap + return, Esc
      works, body doesn't scroll behind, links navigate and close it.
- [ ] Skip link appears on first Tab and jumps to main content.
- [ ] Anchored sections land below the fixed header (no clipped headings).
- [ ] Theme toggle lives in the nav on both pages; 002's temporary placement is
      gone.
- [ ] Both themes, reduced-motion, 320 px / 768 px / 1440 px all checked.

## Out of scope

Breadcrumbs, search, i18n switcher.
