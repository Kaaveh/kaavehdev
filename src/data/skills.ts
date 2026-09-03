import type { SkillGroup } from './types';

/**
 * Seven groups, rendered in this order (006). Groups and members transcribed
 * from the resume PDF's Skills section (2026-09-03 revision) — chip labels are
 * title-cased to match the rest of the site; nothing is added or reordered.
 */
export const skills: SkillGroup[] = [
  {
    title: 'Languages & Concurrency',
    skills: ['Kotlin', 'Kotlin Multiplatform (KMP)', 'Java', 'Coroutines', 'Flow'],
  },
  {
    title: 'UI & Platforms',
    skills: [
      'Jetpack Compose',
      'Android TV',
      'Material 3',
      'Navigation 3',
      'XML Views',
      'Media3',
      'ExoPlayer',
    ],
  },
  {
    title: 'Architecture & DI',
    skills: [
      'Clean Architecture',
      'MVI',
      'MVVM',
      'Modularization (multi-module)',
      'Server-Driven UI',
      'SOLID',
      'Dagger',
      'Hilt',
      'Koin',
    ],
  },
  {
    title: 'Data & Networking',
    skills: [
      'Retrofit',
      'OkHttp',
      'Ktor',
      'GraphQL',
      'Room',
      'SQLDelight',
      'DataStore',
      'WorkManager',
      'Firebase',
    ],
  },
  {
    title: 'Testing & Quality',
    skills: [
      'TDD',
      'BDD',
      'JUnit',
      'Kotest',
      'MockK',
      'Mockito',
      'Turbine',
      'Espresso',
      'Robolectric',
      'Detekt',
      'ktlint',
    ],
  },
  {
    title: 'Build, CI/CD & Observability',
    skills: [
      'Gradle',
      'Kotlin DSL',
      'GitLab CI',
      'GitHub Actions',
      'Crashlytics',
      'Firebase Analytics',
      'Sentry',
      'AppMetrica',
    ],
  },
  {
    title: 'AI-Assisted Development',
    skills: [
      'Agentic Workflows',
      'MCP',
      'Prompt Engineering',
      'Context Engineering',
      'Spec-Driven Development',
    ],
  },
];
