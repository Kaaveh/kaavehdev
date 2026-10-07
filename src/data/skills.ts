import type { SkillGroup } from './types';

/**
 * Rendered in this order (006). Groups and members transcribed from the resume
 * PDF's Skills section (beta04, 2026-10-05 revision) — chip labels are
 * title-cased to match the rest of the site; nothing is added or reordered.
 */
export const skills: SkillGroup[] = [
  {
    title: 'Languages & Concurrency',
    skills: ['Kotlin', 'Kotlin Multiplatform (KMP)', 'Java', 'Coroutines', 'Flow', 'Multithreading'],
  },
  {
    title: 'UI & Platforms',
    skills: [
      'Jetpack Compose',
      'Compose for TV',
      'Material 3',
      'Navigation 3',
      'XML Views',
      'Media3',
      'ExoPlayer',
    ],
  },
  {
    title: 'Accessibility',
    skills: ['TalkBack', 'Compose Semantics', 'Font Scaling', 'Touch Targets', 'Focus Order'],
  },
  {
    title: 'Architecture & DI',
    skills: [
      'Clean Architecture',
      'MVI',
      'MVVM',
      'Modularization',
      'Server-Driven UI',
      'SOLID',
      'Dagger',
      'Hilt',
      'Koin',
    ],
  },
  {
    title: 'Performance & Stability',
    skills: [
      'Baseline Profiles',
      'Macrobenchmark',
      'LeakCanary',
      'Android Profiler',
      'Crashlytics',
      'Sentry',
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
    title: 'CI/CD & Observability',
    skills: [
      'Gradle',
      'Kotlin DSL',
      'GitLab CI',
      'GitHub Actions',
      'Firebase Analytics',
      'A/B Testing',
    ],
  },
  {
    title: 'AI & LLM',
    skills: [
      'Agentic Workflows',
      'MCP',
      'Spec-Driven Development',
      'Spec Kit',
      'Claude Code (Custom Skills)',
      'Antigravity',
    ],
  },
];
