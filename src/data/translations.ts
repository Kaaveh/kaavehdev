import type { Translation } from './types';

/**
 * Kaaveh's literary translations (spec 018).
 *
 * No version is pinned here (spec 020): the site serves whatever each book
 * repository's *latest* release is, and a release there POSTs a Cloudflare
 * deploy hook so this site rebuilds without a commit. The cost of that trade is
 * that rebuilding an old commit of this repo pulls today's book, not the one
 * that shipped with it.
 *
 * Facts below come from the book repositories themselves (`_quarto.yml`,
 * README, their own spec roadmaps — read 2026-09-18), not from guesswork.
 * `status` is the one thing no build can derive; it is hand-edited here.
 */
export const translations: Translation[] = [
  {
    title: 'سخنان لین‌جی',
    romanized: 'Sokhanān-e Lin-ji',
    sourceWork: 'The Record of Linji',
    sourceAuthor:
      "Ruth Fuller Sasaki's translation and commentary, edited by Thomas Yūhō Kirchner",
    language: 'Persian',
    languageTag: 'fa',
    status: 'Complete — 81 sections in six books, with the Chinese text and historical introduction',
    repoUrl: 'https://github.com/Kaaveh/Record_of_Linji',
    assetBase: 'record-of-linji-farsi',
    path: '/translations/record-of-linji/',
  },
  {
    title: 'آموزه‌های ذن استاد لین‌چی',
    romanized: 'Āmuzeh-hā-ye Zen-e Ostād Lin-chi',
    sourceWork: 'The Zen Teachings of Master Lin-chi',
    sourceAuthor: "Burton Watson's rendering of the ninth-century Lín-chi lù (臨濟錄)",
    language: 'Persian',
    languageTag: 'fa',
    status: 'All 75 sections translated and reviewed',
    repoUrl: 'https://github.com/Kaaveh/linji-lu-farsi',
    assetBase: 'linji-lu-farsi',
    path: '/translations/linji-lu/',
  },
  {
    // Private repository and no release yet, so: no repoUrl (the link would 404
    // for everyone but Kaaveh), no assetBase, no path. Renders as work in
    // progress with no dead links — 018's behaviour.
    title: 'دائو ده جینگ',
    romanized: 'Dāo De Jing',
    sourceWork: "Lao-tzu's Taoteching",
    sourceAuthor:
      "Red Pine's translation, with selected commentaries from two millennia of Chinese exegesis",
    language: 'Persian',
    languageTag: 'fa',
    status: 'All 81 verses translated; glossary, back matter and typesetting still to come',
  },
];

/**
 * URL of one asset of the book's latest release. Every book's release workflow
 * attaches an unversioned copy of each artefact alongside the versioned one, so
 * `releases/latest/download/` resolves without a GitHub API call to look up the
 * tag (020). `suffix` is `-html.tar.gz`, `.pdf`, `-mobile.pdf`, `.epub`.
 * Shared by `scripts/fetch-book.mjs` and the /translations page so the naming
 * convention lives in exactly one place.
 */
export function releaseAsset({ title, repoUrl, assetBase }: Translation, suffix: string): string {
  if (!repoUrl || !assetBase) throw new Error(`${title}: no published release to link to`);
  return `${repoUrl.replace(/\/+$/, '')}/releases/latest/download/${assetBase}${suffix}`;
}
