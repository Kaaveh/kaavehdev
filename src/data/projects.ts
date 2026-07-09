import type { Project } from './types';

/** fallbackStars verified 2026-07 (see specs/000-overview.md). */
export const projects: Project[] = [
  {
    name: 'ComposeNews',
    repo: 'Kaaveh/ComposeNews',
    url: 'https://github.com/Kaaveh/ComposeNews',
    description:
      'Reference Compose architecture project: modularized feature/data/domain ' +
      'layers, design system, MVI, CI with quality gates; used as a teaching ' +
      'reference in a conference talk.',
    fallbackStars: 377,
    language: 'Kotlin',
  },
  {
    name: 'SDP-Compose',
    repo: 'Kaaveh/sdp-compose',
    url: 'https://github.com/Kaaveh/sdp-compose',
    description:
      'Published Kotlin library providing scalable size units for Jetpack Compose.',
    fallbackStars: 48,
    language: 'Kotlin',
  },
  {
    name: 'ComposeBreak',
    repo: 'Kaaveh/ComposeBreak',
    url: 'https://github.com/Kaaveh/ComposeBreak',
    description: 'Jetpack Compose playground accompanying YouTube tutorials.',
    fallbackStars: 11,
    language: 'Kotlin',
    // Spec 007 may drop this card if it crowds the layout.
    optional: true,
  },
];
