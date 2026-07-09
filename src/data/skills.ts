import type { SkillGroup } from './types';

/** Eight groups, rendered in this order (006). */
export const skills: SkillGroup[] = [
  {
    title: 'Languages & Async',
    skills: ['Kotlin', 'Kotlin Multiplatform (KMP)', 'Java', 'Coroutines', 'Flow'],
  },
  {
    title: 'UI & Platforms',
    skills: [
      'Jetpack Compose',
      'Compose for TV & Wear OS',
      'Material 3',
      'XML Views',
      'Navigation 3',
      'Media3/ExoPlayer',
    ],
  },
  {
    title: 'Architecture & DI',
    skills: [
      'Clean Architecture',
      'MVI',
      'MVVM',
      'Modularisation',
      'SOLID',
      'OOP',
      'Server-Driven UI',
      'Dagger-Hilt',
      'Koin',
    ],
  },
  {
    title: 'Engineering Practices',
    skills: ['TDD', 'BDD', 'Spec-Driven Development'],
  },
  {
    title: 'Networking & Data',
    skills: [
      'Retrofit',
      'OkHttp',
      'Ktor',
      'Room',
      'SqlDelight',
      'DataStore',
      'Firebase',
      'WorkManager',
    ],
  },
  {
    title: 'Testing',
    skills: ['JUnit', 'Kotest', 'Mockk', 'Turbine'],
  },
  {
    title: 'Build & CI',
    skills: [
      'Gradle',
      'Kotlin DSL',
      'Convention Plugins',
      'GitLab CI',
      'GitHub Actions',
      'Detekt',
      'ktlint',
    ],
  },
  {
    title: 'Observability',
    skills: ['Crashlytics', 'Firebase Analytics', 'Sentry', 'Appmetrica'],
  },
];
