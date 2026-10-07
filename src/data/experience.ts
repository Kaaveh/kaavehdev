import type { ExperienceEntry } from './types';

/**
 * Ordered most recent first. Bullets from the resume (beta04, 2026-10-05).
 * Kept by Kaaveh's choice (2026-10-07) beyond the resume's digest: the tech
 * details in the first two Oddrun bullets and the last three GityMarket bullets.
 */
export const experience: ExperienceEntry[] = [
  {
    company: 'Oddrun',
    role: 'Senior Android Engineer',
    start: 'February 2025',
    blurb:
      'Footballi: football-focused sports streaming platform with live ' +
      'matches, real-time stats, and prediction games, serving 10M+ monthly ' +
      'active users across Android, Android TV, iOS, and web. Part of a ' +
      '15-person cross-functional team (backend, frontend, Android, product, ' +
      'design), reporting to the Android Team Lead and the Product Owner.',
    bullets: [
      'Architected and shipped the Android TV MVP solo in 2 months (Jetpack ' +
        'Compose for TV, Navigation3, Media3/ExoPlayer, custom D-pad focus ' +
        'handling), shaping with the PO and designer its product and UX ' +
        'decisions; TV grew to 36% of platform watch time, contributing to a ' +
        '19% revenue growth in H1 2026.',
      'Championed AI-assisted development company-wide through hosting ' +
        'workshops, adopted by 30 engineers.',
      'Introduced automated integration testing (JUnit, Kotest), cutting ' +
        'manual QA and shortening release cadence by ~50%.',
      'Instrumenting playback telemetry (startup time, rebuffering, errors) ' +
        'for a live-stream alerting platform, coordinating with backend and ' +
        'DevOps to replace manual oversight with instant alerts to the ' +
        'operations team.',
    ],
    highlights: ['10M+', '36%', '19%', '30 engineers', '~50%'],
  },
  {
    company: 'Tabdeal',
    role: 'Senior Android Engineer (Contract)',
    start: 'September 2024',
    end: 'February 2025',
    blurb: 'Cryptocurrency exchange with 23M+ monthly active users.',
    bullets: [
      'Designed the native Android architecture for the PWA-to-native ' +
        'migration, enabling 3 engineers to ship v1 in 4 months and raising ' +
        'the Play Store rating from 3.7 to 4.3.',
    ],
    highlights: ['23M+', '3.7 to 4.3'],
  },
  {
    company: 'GityMarket',
    role: 'Android Engineer',
    start: 'January 2019',
    end: 'September 2024',
    blurb: 'E-commerce platform powering 1,000+ retail businesses.',
    bullets: [
      'Cut CI build time by 44% (from 90 to 50 min) by restructuring 55 ' +
        'Gradle modules and their dependencies.',
      'Extended the Server-Driven UI framework to ship 3 features with no ' +
        'Play Store release, shrinking lead time from 2 weeks to same-day.',
      'Established a design system (themes, tokens, shared widgets) adopted ' +
        'by 23 modules, reducing new-screen dev time by ~20%.',
      'Migrated core UI from XML Views to Jetpack Compose with reusable ' +
        'component libraries, increasing feature delivery ~25%.',
      'Transitioned app architecture from MVVM + Clean to MVI + Clean ' +
        '(feature modules), improving ViewModel testability and reducing ' +
        'UI-related bugs by ~10%.',
      'Drove a codebase-wide migration off deprecated APIs ahead of ' +
        'targetSdk 34 / Android 14 compliance.',
    ],
    highlights: ['1,000+', '44%', 'same-day', '~20%', '~25%', '~10%'],
  },
];
