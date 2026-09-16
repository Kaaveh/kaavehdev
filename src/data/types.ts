/**
 * Shared types for all site content under `src/data/` (spec 003).
 *
 * Convention: facts we do not reliably know are OPTIONAL fields, omitted in
 * the data with a `// TODO(Kaaveh): …` comment — never placeholder strings
 * that could render to users.
 */

/** A labelled hyperlink (contact links, profile links, …). */
export interface Link {
  label: string;
  url: string;
}

/** Global site identity — consumed by the hero (004), footer (010), SEO (014). */
export interface SiteInfo {
  name: string;
  title: string;
  location: string;
  summary: string;
  /** Production origin, e.g. "https://…". Empty string until confirmed. */
  siteUrl: string;
  /** Public path of the downloadable resume PDF. */
  resumePdf: string;
  contacts: Link[];
}

/** One role on the experience timeline (005). Ordered most recent first. */
export interface ExperienceEntry {
  company: string;
  role: string;
  /** Human-readable month + year, e.g. "February 2025". */
  start: string;
  /** Omitted while the role is current — render as "Present". */
  end?: string;
  /** One-line platform blurb shown under the role. */
  blurb: string;
  /** Resume bullets, verbatim. */
  bullets: string[];
  /**
   * Exact metric substrings within `blurb`/`bullets` to visually emphasize
   * (e.g. "55%", "10M+"). Each is a literal already present in the copy — never
   * a new fact — matched by exact substring so emphasis can't corrupt the text.
   */
  highlights?: string[];
}

/** A titled group of skills (006). Rendered in array order. */
export interface SkillGroup {
  title: string;
  skills: string[];
}

/** An open-source project card (007). */
export interface Project {
  name: string;
  /** GitHub "owner/name" slug, used for the build-time stars fetch (007). */
  repo: string;
  url: string;
  description: string;
  /** Committed star count used when the build-time fetch fails (007). */
  fallbackStars: number;
  language: string;
  /** True for cards spec 007 may drop if the layout gets crowded. */
  optional?: boolean;
}

/** A published article (008). */
export interface Article {
  title: string;
  url?: string;
  /** Where it was published, e.g. "Medium", "ProAndroidDev". */
  source: string;
  /** Extra annotation, e.g. "Parts 1–2". */
  note?: string;
}

/** A conference talk (008). */
export interface Talk {
  event: string;
  title?: string;
  year?: string;
  url?: string;
}

/** A published course (008). */
export interface Course {
  /** Verbatim from the resume, e.g. "master course". */
  format: string;
  /** What the course teaches, e.g. "SqlDelight". */
  topic: string;
  publisher: string;
  /** The resume's framing of the publisher, kept for spec 008's copy. */
  publisherNote: string;
  /** Verified droidcon Academy instructor page. */
  instructorUrl: string;
  title?: string;
  url?: string;
}

/** The mentoring stat (008). */
export interface Mentoring {
  /** Bold stat figure, e.g. "20+". */
  stat: string;
  /** Full sentence, verbatim from the resume. */
  text: string;
}

/** A degree (010). */
export interface EducationEntry {
  degree: string;
  institution: string;
  note?: string;
}

/** A professional certificate (010). */
export interface CertificateEntry {
  issuer: string;
  title: string;
  credentialId?: string;
  url?: string;
}

/** A spoken language (010). */
export interface LanguageSkill {
  language: string;
  level: string;
}

/** A YouTube channel (009 renders the featured one, 011 the rest). */
export interface Channel {
  name: string;
  tagline: string;
  url?: string;
  /** YouTube channel id, where known. */
  channelId?: string;
  /** True for the channel highlighted on the home page (009). */
  featured?: boolean;
}

/** A featured video for the click-to-load facade (009). */
export interface Video {
  /** YouTube video id, e.g. the `v=` param in a watch URL. */
  id: string;
  title: string;
}

/** A literary translation (016). */
export interface Translation {
  /** Title in the target language, exactly as the book's own title page has it. */
  title: string;
  /** Romanised form of `title`, for readers who can't read the script. */
  romanized: string;
  /** The work being translated. */
  sourceWork: string;
  /** Author of the source work. */
  sourceAuthor: string;
  /** Target language, e.g. "Persian". */
  language: string;
  /** BCP 47 tag for `title`, e.g. "fa" — drives `lang`/`dir` on the title run. */
  languageTag: string;
  /** One-line progress note, shown on the card. */
  status: string;
  /** The translation's own repository. */
  repoUrl: string;
  /**
   * Pinned release tag, e.g. "v0.0.2". Omitted until a release exists — while
   * it is, the book is not fetched and the card links only to the repository.
   * Release assets are expected to be named `<repo>-<version-without-v>-*`.
   */
  bookVersion?: string;
  /**
   * Reading URL of the rendered book, e.g. "/translations/linji-lu/". Also the
   * path under `public/` that `scripts/fetch-book.mjs` unpacks the release
   * bundle into. Omitted when there is nothing to read yet.
   */
  path?: string;
}

/** A podcast (012). */
export interface Podcast {
  name: string;
  description?: string;
  url?: string;
  /** Platform hint for the listen link, e.g. "Spotify". */
  platform?: string;
  /** Kaaveh's role, e.g. "host". */
  role?: string;
}
