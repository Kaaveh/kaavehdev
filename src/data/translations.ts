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
 */
export const translations: Translation[] = [
  {
    title: 'سخنان لین‌جی',
    romanized: 'Sokhanān-e Lin-ji',
    sourceWork: 'The Record of Linji',
    sourceAuthor:
      "Ruth Fuller Sasaki's translation and commentary, edited by Thomas Yūhō Kirchner",
    languageTag: 'fa',
    repoUrl: 'https://github.com/Kaaveh/Record_of_Linji',
    assetBase: 'record-of-linji-farsi',
    path: '/translations/record-of-linji/',
  },
  {
    title: 'آموزه‌های ذن استاد لین‌چی',
    romanized: 'Āmuzeh-hā-ye Zen-e Ostād Lin-chi',
    sourceWork: 'The Zen Teachings of Master Lin-chi',
    sourceAuthor: "Burton Watson's rendering of the ninth-century Lín-chi lù (臨濟錄)",
    languageTag: 'fa',
    repoUrl: 'https://github.com/Kaaveh/linji-lu-farsi',
    assetBase: 'linji-lu-farsi',
    path: '/translations/linji-lu/',
  },
  {
    title: 'دائو دِ جینگِ لائوتزو',
    romanized: 'Dāo De Jing-e Lao-tzu',
    sourceWork: "Lao-tzu's Taoteching",
    sourceAuthor:
      "Red Pine's translation, with selected commentaries from two millennia of Chinese exegesis",
    languageTag: 'fa',
    repoUrl: 'https://github.com/Kaaveh/Lao_Tzu_Taoteching',
    assetBase: 'lao-tzu-taoteching-farsi',
    path: '/translations/lao-tzu-taoteching/',
  },
  {
    title: 'ایک‌کیو و گلچین ابر دیوانه',
    romanized: 'Ikkyū va Golchin-e Abr-e Divāneh',
    sourceWork: 'Ikkyū and the Crazy Cloud Anthology: A Zen Poet of Medieval Japan',
    sourceAuthor:
      "Sonja Arntzen's translation of and commentary on the Kyōunshū of Ikkyū Sōjun (1394–1481)",
    languageTag: 'fa',
    repoUrl: 'https://github.com/Kaaveh/ikkyu_and_the_crazy_cloud_anthology_a_zen_poet_of_medieval_translation',
    assetBase: 'ikkyu-crazy-cloud-anthology-fa',
    path: '/translations/ikkyu-crazy-cloud/',
  },
  {
    title: 'ذن بی‌حاشیه برای تازه‌کارها',
    romanized: 'Zen-e Bi-hāshiyeh barāye Tāzeh-kār-hā',
    sourceWork:
      'No-Nonsense Zen for Beginners: Clear Answers to Burning Questions About Core Zen Teachings',
    sourceAuthor:
      "Jason Quinn's introduction to Zen in sixty questions and answers (Rockridge Press, 2021)",
    languageTag: 'fa',
    repoUrl: 'https://github.com/Kaaveh/No_Nonsense_Zen_for_Beginners',
    assetBase: 'no-nonsense-zen-fa',
    path: '/translations/no-nonsense-zen/',
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
