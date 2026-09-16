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
    // Private repository (confirmed by Kaaveh, 2026-08-11), so no repo slug, no
    // URL, and no star count: the card renders unlinked with a "Private" chip.
    // Description from Kaaveh's own README/resume wording — never guessed.
    name: 'Komposer',
    description:
      'Server-driven UI for Jetpack Compose: screens ship as serializable data ' +
      'and render as real Composables, with the UI contract in Kotlin ' +
      'Multiplatform so a Kotlin backend builds screens from the same types.',
    language: 'Kotlin',
    isPrivate: true,
  },
];
