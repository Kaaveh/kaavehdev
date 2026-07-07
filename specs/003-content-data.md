# 003 — Content & Data Layer

## Context

All site content lives in typed TS modules under `src/data/` so section components
(004–012) stay content-free and Kaaveh can update facts in one place. This spec
transcribes the resume PDF (`assets/resume/Kaaveh_Mohamedi.pdf`) and the verified
personal-brand data into those modules. **This spec is the canonical content
listing — later specs reference the data below rather than re-defining it.**

## Goal

`src/data/` fully populated and type-safe; resume PDF published; zero invented
facts (`TODO(Kaaveh)` markers preserved in the data as documented below).

## Dependencies

001.

## Requirements

1. Create `src/data/types.ts` with interfaces for the shapes below (e.g. `Link`,
   `ExperienceEntry`, `SkillGroup`, `Project`, `Article`, `Talk`, `Course`,
   `Channel`, `Podcast`, `CertificateEntry`, …). Fields that are unknown must be
   **optional** in the type and omitted in the data with a `// TODO(Kaaveh): …`
   comment — do not ship placeholder strings that could render to users.
2. Create the data modules exactly per the content inventory below.
3. Copy `assets/resume/Kaaveh_Mohamedi.pdf` → `public/resume/Kaaveh_Mohamedi.pdf`
   (public URL `/resume/Kaaveh_Mohamedi.pdf`). The `assets/` copy stays as source
   of truth.
4. `npx astro check` passes; importing any module from a page compiles.

## Content inventory (transcribe exactly)

### `site.ts`

- Name: **Kaaveh Mohamedi** · Title: **Senior Android Engineer**
- Location: **Yerevan, Armenia (Open to relocation)**
- Summary: *"7+ years building consumer apps at scale, specializing in Jetpack
  Compose migrations, modular architecture, and developer productivity. Active
  contributor to the Android community — 3 conference talks, 7 Medium articles,
  and open-source projects with 500+ combined stars."*
- `siteUrl`: `// TODO(Kaaveh): production domain` (leave empty string + comment)
- `resumePdf`: `/resume/Kaaveh_Mohamedi.pdf`
- Contact links: Email `mailto:Kaaveh@pm.me` · LinkedIn
  `https://www.linkedin.com/in/kaaveh` · GitHub `https://github.com/Kaaveh` ·
  Medium `https://medium.com/@Kaaveh` · YouTube
  `https://www.youtube.com/@CodeWithKaaveh`

### `experience.ts` (ordered, most recent first)

**Footballi — Senior Android Engineer** · February 2025 – Present
· Blurb: *Live-streaming sports platform, 10M+ MAU, real-time data.*
- Shipped the Footballi Android TV app in ~2 months ahead of the 2026 World Cup,
  owning UX decisions and delivering a Jetpack Compose for TV build with
  Navigation3, Media3/ExoPlayer, and custom D-pad focus handling.
- Introduced automated integration testing (JUnit, Kotest), reducing the manual QA
  cycle and shortening release cadence from bi-weekly to weekly, a 55% improvement.

**GityMarket — Android Engineer** · June 2019 – February 2025
· Blurb: *E-commerce platform powering 1,000+ retail businesses.*
- Migrated core UI from XML view to Jetpack Compose, increasing development speed
  and feature delivery by ~25% through reusable component libraries.
- Transitioned app architecture from MVVM + Clean to MVI + Clean (feature
  modules), improving ViewModel testability and reducing UI-related bugs by ~10%.
- Extended and maintained a Server-Driven UI framework, adding new widgets that
  enabled easier deployment of new features without needing a new Android app
  release.
- Implemented a centralized Design system (themes, tokens, shared widgets) used
  across modules — reduced UI inconsistency and dev time for new screens by ~20%.
- Reduced CI build times by 40% through refactoring module structure, inter-module
  dependencies, and merging/splitting modules based on business logic.
- Drove a codebase-wide migration off deprecated APIs ahead of targetSdk 34 /
  Android 14 compliance.

### `skills.ts` (8 groups, in this order)

1. **Languages & Async**: Kotlin, Kotlin Multiplatform (KMP), Java, Coroutines, Flow
2. **UI & Platforms**: Jetpack Compose, Compose for TV & Wear OS, Material 3,
   XML Views, Navigation 3, Media3/ExoPlayer
3. **Architecture & DI**: Clean Architecture, MVI, MVVM, Modularisation, SOLID,
   OOP, Server-Driven UI, Dagger-Hilt, Koin
4. **Engineering Practices**: TDD, BDD, Spec-Driven Development
5. **Networking & Data**: Retrofit, OkHttp, Ktor, Room, SqlDelight, DataStore,
   Firebase, WorkManager
6. **Testing**: JUnit, Kotest, Mockk, Turbine
7. **Build & CI**: Gradle, Kotlin DSL, Convention Plugins, GitLab CI,
   GitHub Actions, Detekt, ktlint
8. **Observability**: Crashlytics, Firebase Analytics, Sentry, Appmetrica

### `projects.ts`

| Field | ComposeNews | SDP-Compose | ComposeBreak (optional card) |
|---|---|---|---|
| repo | `Kaaveh/ComposeNews` | `Kaaveh/sdp-compose` | `Kaaveh/ComposeBreak` |
| url | https://github.com/Kaaveh/ComposeNews | https://github.com/Kaaveh/sdp-compose | https://github.com/Kaaveh/ComposeBreak |
| description | Reference Compose architecture project: modularized feature/data/domain layers, design system, MVI, CI with quality gates; used as a teaching reference in a conference talk. | Published Kotlin library providing scalable size units for Jetpack Compose. | Jetpack Compose playground accompanying YouTube tutorials. |
| fallbackStars (verified 2026-07) | 377 | 48 | 11 |
| language | Kotlin | Kotlin | Kotlin |

### `writing.ts` — Medium articles

Known titles (URLs unverified unless noted). Store `url` only where listed;
otherwise omit the field with `// TODO(Kaaveh): URL`:

1. "Cognitive Debt: Staying Sharp When AI Writes Most of Your Code"
2. "Debugging Jetpack Compose (Based on true story!)"
3. "Kotlin scope functions for dummies!"
4. "Migrate from MVVM to MVI"
5. "An introduction about Preview in Jetpack Compose" — published on ProAndroidDev:
   `https://proandroiddev.com/an-introduction-about-preview-in-jetpack-compose-b72a96daac35`
6. "All about navigation in the Jetpack Compose-based production code-base"
7. "Jetpack Compose & best practices you must always remember" (Parts 1–2)
8. "Stability of Composable function parameters"

`// TODO(Kaaveh): confirm the canonical list of 7 articles + URLs with the user
before the Writing section (008) ships them.`
Profile link (always safe to show): https://medium.com/@Kaaveh

### `talks.ts` — talks, course, mentoring

- **Talks**: three technical talks at the **LogCat conference** — titles/years/links
  `// TODO(Kaaveh)`.
- **Course**: master course on **SqlDelight**, published via **Droidcon** (droidcon
  Academy — the global Android developer conference organization partnered with
  Google, Meta, and Amazon). Instructor page (verified):
  https://academy.droidcon.com/kaaveh-mohamedi · exact course URL/title
  `// TODO(Kaaveh)`.
- **Mentoring**: mentored **20+ software engineers**.
- Teaching: taught Android development in collaboration with the IEEE student
  branch (also appears under education).

### `education.ts` — education, certificates, languages

- **Education**: Master of Science in Software Engineering — **Tarbiat Modares
  University**. Note: *Taught Android development in collaboration with the IEEE
  student branch.*
- **Certificates**: (1) **Droidcon: Test-Driven Development on Android** —
  credential ID/URL `// TODO(Kaaveh)`; (2) **JetBrains: Kotlin for Java
  Developers** — credential ID/URL `// TODO(Kaaveh)`.
- **Languages**: English — C1 · Persian — Native.

### `channels.ts` — YouTube channels

`featured: true` for the first; order as listed:

1. **Code With Kaaveh** — Android engineering —
   https://www.youtube.com/@CodeWithKaaveh (channel id `UC_PSOgZBu28krqe0L93OKgg`)
2. **With Kaaveh** — life, mindset, conversations — https://www.youtube.com/@withKaaveh
3. **Cycling with Kaaveh** — cycling — url `// TODO(Kaaveh)`
4. **RunningWithKaaveh** — running — url `// TODO(Kaaveh)`
5. **MyImmigration** — immigration journey — url `// TODO(Kaaveh)`
6. **Übermensch** — longevity and health — url `// TODO(Kaaveh)`

Channel taglines above come from Kaaveh's GitHub profile README; he may reword
them when asked for the missing URLs.

### `podcasts.ts`

Names only are known: **WonderLand**, **Journal Club**, **The Voice of My Books**,
**Mushin**, **Kapsoul**. Platform links + one-line descriptions
`// TODO(Kaaveh)`.

### `interests.ts`

Philosophy · Life coaching · Cycling · Meditation · Martial arts · Mountaineering.

## Acceptance criteria

- [ ] All modules above exist, typed against `types.ts`; `npx astro check` clean.
- [ ] Spot-check: every fact above matches this spec exactly (no paraphrasing of
      resume bullets, no invented URLs, all `TODO(Kaaveh)` comments present).
- [ ] `public/resume/Kaaveh_Mohamedi.pdf` exists; after `npm run build` it is in
      `dist/resume/` and downloadable from `npx wrangler dev`.
- [ ] No placeholder text that could leak into the UI (unknowns are absent
      optional fields, not `"TBD"` strings).

## Out of scope

Rendering anything (004+). Asking Kaaveh for every TODO now — each section spec
resolves its own TODOs when it ships.
