import type { ExperienceEntry } from './types';

/** Ordered most recent first. Bullets verbatim from the resume. */
export const experience: ExperienceEntry[] = [
  {
    company: 'Footballi',
    role: 'Senior Android Engineer',
    start: 'February 2025',
    blurb: 'Live-streaming sports platform, 10M+ MAU, real-time data.',
    bullets: [
      'Shipped the Footballi Android TV app in ~2 months ahead of the 2026 ' +
        'World Cup, owning UX decisions and delivering a Jetpack Compose for ' +
        'TV build with Navigation3, Media3/ExoPlayer, and custom D-pad focus ' +
        'handling.',
      'Introduced automated integration testing (JUnit, Kotest), reducing the ' +
        'manual QA cycle and shortening release cadence from bi-weekly to ' +
        'weekly, a 55% improvement.',
    ],
  },
  {
    company: 'GityMarket',
    role: 'Android Engineer',
    start: 'June 2019',
    end: 'February 2025',
    blurb: 'E-commerce platform powering 1,000+ retail businesses.',
    bullets: [
      'Migrated core UI from XML view to Jetpack Compose, increasing ' +
        'development speed and feature delivery by ~25% through reusable ' +
        'component libraries.',
      'Transitioned app architecture from MVVM + Clean to MVI + Clean ' +
        '(feature modules), improving ViewModel testability and reducing ' +
        'UI-related bugs by ~10%.',
      'Extended and maintained a Server-Driven UI framework, adding new ' +
        'widgets that enabled easier deployment of new features without ' +
        'needing a new Android app release.',
      'Implemented a centralized Design system (themes, tokens, shared ' +
        'widgets) used across modules — reduced UI inconsistency and dev time ' +
        'for new screens by ~20%.',
      'Reduced CI build times by 40% through refactoring module structure, ' +
        'inter-module dependencies, and merging/splitting modules based on ' +
        'business logic.',
      'Drove a codebase-wide migration off deprecated APIs ahead of ' +
        'targetSdk 34 / Android 14 compliance.',
    ],
  },
];
