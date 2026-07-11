import type { Article } from './types';

/**
 * Published article titles. Kaaveh confirmed the count is 8 (2026-07-11).
 * Only articles with a verified `url` render as links; the rest show as plain
 * text (title + source) — never a guessed URL (see specs/000-overview.md).
 *
 * TODO(Kaaveh): supply canonical Medium URLs for the un-linked titles so they
 * can become links too.
 */
export const articles: Article[] = [
  {
    title: 'Cognitive Debt: Staying Sharp When AI Writes Most of Your Code',
    source: 'Medium',
    // TODO(Kaaveh): URL
  },
  {
    title: 'Debugging Jetpack Compose (Based on true story!)',
    source: 'Medium',
    // TODO(Kaaveh): URL
  },
  {
    title: 'Kotlin scope functions for dummies!',
    source: 'Medium',
    // TODO(Kaaveh): URL
  },
  {
    title: 'Migrate from MVVM to MVI',
    source: 'Medium',
    // TODO(Kaaveh): URL
  },
  {
    title: 'An introduction about Preview in Jetpack Compose',
    source: 'ProAndroidDev',
    url: 'https://proandroiddev.com/an-introduction-about-preview-in-jetpack-compose-b72a96daac35',
  },
  {
    title: 'All about navigation in the Jetpack Compose-based production code-base',
    source: 'Medium',
    // TODO(Kaaveh): URL
  },
  {
    title: 'Jetpack Compose & best practices you must always remember',
    source: 'Medium',
    note: 'Parts 1–2',
    // TODO(Kaaveh): URL
  },
  {
    title: 'Stability of Composable function parameters',
    source: 'Medium',
    // TODO(Kaaveh): URL
  },
];

/** Always safe to show, whatever the article list ends up being. */
export const mediumProfileUrl = 'https://medium.com/@Kaaveh';
