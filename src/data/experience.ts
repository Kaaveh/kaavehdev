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
      'Introduced automated integration testing (JUnit, Kotest), cutting ' +
        'manual QA and shortening release cadence ~50%.',
    ],
    highlights: ['10M+', '~50%'],
  },
  {
    company: 'GityMarket',
    role: 'Android Engineer',
    start: 'June 2019',
    end: 'February 2025',
    blurb: 'E-commerce platform powering 1,000+ retail businesses.',
    bullets: [
      'Migrated core UI from XML Views to Jetpack Compose with reusable ' +
        'component libraries, increasing feature delivery ~25%.',
      'Transitioned app architecture from MVVM + Clean to MVI + Clean ' +
        '(feature modules), improving ViewModel testability and reducing ' +
        'UI-related bugs by ~10%.',
      'Extended and maintained a Server-Driven UI framework, adding new ' +
        'widgets that enabled easier deployment of new features without ' +
        'needing a new Android app release.',
      'Implemented a centralized Design system (themes, tokens, shared ' +
        'widgets) used across modules — reduced UI inconsistency and dev time ' +
        'for new screens by ~20%.',
      'Reduced CI build times by 40% by refactoring module structure and ' +
        'inter-module dependencies.',
      'Drove a codebase-wide migration off deprecated APIs ahead of ' +
        'targetSdk 34 / Android 14 compliance.',
    ],
    highlights: ['1,000+', '~25%', '~10%', '~20%', '40%'],
  },
  {
    // The resume gives this entry no dates and no platform blurb — it runs
    // "alongside full-time roles", which stands in for the date range. Do not
    // invent a start date. Listed third, matching the resume's own order.
    company: 'Independent Android Consultant',
    role: 'Consulting & Advisory',
    dateNote: 'Alongside full-time roles',
    bullets: [
      'Designed the native Android architecture to migrate a major ' +
        'cryptocurrency exchange from a PWA.',
      'Served as technical consultant to a bank, guiding the refactoring of ' +
        'its mobile app architecture.',
    ],
  },
];
