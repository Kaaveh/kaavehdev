import type { Article } from './types';

/**
 * Published articles. Every URL below was verified (2026-07-11) against Kaaveh's
 * own sources — his GitHub profile "Latest articles" list, the ComposeNews
 * README, and the Towards AI publication byline — never guessed. `source` names
 * the publication the article actually appeared in.
 */
export const articles: Article[] = [
  {
    title: 'Cognitive Debt: Staying Sharp When AI Writes Most of Your Code',
    source: 'Towards AI',
    url: 'https://pub.towardsai.net/cognitive-debt-staying-sharp-when-ai-writes-most-of-your-code-4c8dddd696c8',
  },
  {
    title: 'Debugging Jetpack Compose (Based on true story!)',
    source: 'ProAndroidDev',
    url: 'https://proandroiddev.com/debugging-jetpack-compose-based-on-true-story-5592eb01e0',
  },
  {
    title: 'Kotlin scope functions for dummies!',
    source: 'Kotlin Academy',
    url: 'https://blog.kotlin-academy.com/kotlin-scope-functions-for-dummies-cb8c8970b8d9',
  },
  {
    title: 'Migrate from MVVM to MVI',
    source: 'ProAndroidDev',
    url: 'https://proandroiddev.com/migrate-from-mvvm-to-mvi-f938c27c214f',
  },
  {
    title: 'An introduction about Preview in Jetpack Compose',
    source: 'ProAndroidDev',
    url: 'https://proandroiddev.com/an-introduction-about-preview-in-jetpack-compose-b72a96daac35',
  },
  {
    title: 'All about navigation in the Jetpack Compose-based production code-base',
    source: 'ProAndroidDev',
    url: 'https://proandroiddev.com/all-about-navigation-in-the-jetpack-compose-based-production-code-base-902706b8466d',
  },
  {
    title: 'Jetpack Compose & best practices you must always remember',
    source: 'ProAndroidDev',
    url: 'https://proandroiddev.com/jetpack-compose-best-practices-you-must-always-remember-98382b132d44',
  },
];

/** Always safe to show, whatever the article list ends up being. */
export const mediumProfileUrl = 'https://medium.com/@Kaaveh';
