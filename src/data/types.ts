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
  /**
   * Human-readable month + year, e.g. "February 2025". Omitted for a role the
   * resume gives no dates for (e.g. ongoing consulting) — `dateNote` then
   * stands in for the date range. Never invent dates to fill this.
   */
  start?: string;
  /** Omitted while the role is current — render as "Present". */
  end?: string;
  /** Verbatim stand-in shown when `start` is absent, e.g. the resume's
   * "alongside full-time roles". Ignored when `start` is present. */
  dateNote?: string;
  /** One-line platform blurb shown under the role. Omitted when the resume
   * gives none (the entry then goes straight to its bullets). */
  blurb?: string;
  /** Resume bullets, verbatim. */
  bullets: string[];
  /**
   * Exact metric substrings within `blurb`/`bullets` to visually emphasize
   * (e.g. "~50%", "10M+"). Each is a literal already present in the copy — never
   * a new fact — matched by exact substring so emphasis can't corrupt the text.
   */
  highlights?: string[];
}

/** A titled group of skills (006). Rendered in array order. */
export interface SkillGroup {
  title: string;
  skills: string[];
}

/**
 * A project card (007).
 *
 * `repo`/`url`/`fallbackStars` are optional so a project whose source is not
 * public can still be shown: it renders as a non-clickable card with no star
 * badge — the same "never a guessed URL" rule spec 008 applies to talks.
 */
export interface Project {
  name: string;
  /** GitHub "owner/name" slug for the build-time stars fetch. Omit if private. */
  repo?: string;
  /** Public URL. Omitted when the repo is private — the card renders unlinked. */
  url?: string;
  description: string;
  /** Committed star count used when the build-time fetch fails. Omit if private. */
  fallbackStars?: number;
  language: string;
  /** Set when the source is not public: renders a "Private" chip and no link. */
  isPrivate?: boolean;
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
