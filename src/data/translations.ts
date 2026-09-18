import type { Translation } from './types';

/**
 * Kaaveh's literary translations (spec 018).
 *
 * `bookVersion` is pinned deliberately rather than tracked as "latest": this
 * site only rebuilds when this repo changes, so "latest" would make the
 * published book depend on when a deploy happened. Updating the book is a
 * reviewable one-line change here.
 *
 * Facts below come from the book repo itself (`_quarto.yml` title/subtitle and
 * the v0.0.3 release, read 2026-09-16), not from guesswork.
 */
export const translations: Translation[] = [
  {
    title: 'آموزه‌های ذن استاد لین‌چی',
    romanized: 'Āmuzeh-hā-ye Zen-e Ostād Lin-chi',
    sourceWork: 'The Zen Teachings of Master Lin-chi',
    sourceAuthor: "Burton Watson's rendering of the ninth-century Lín-chi lù (臨濟錄)",
    language: 'Persian',
    languageTag: 'fa',
    status: 'All 75 sections translated and reviewed',
    repoUrl: 'https://github.com/Kaaveh/linji-lu-farsi',
    bookVersion: 'v0.0.3',
    path: '/translations/linji-lu/',
  },
];

/**
 * URL of one asset attached to the pinned release. The book's release workflow
 * names every asset `<repo>-<version-without-v><suffix>`, so `suffix` is
 * `-html.tar.gz`, `.pdf`, `.epub`, … Shared by `scripts/fetch-book.mjs` and the
 * /translations page so the naming convention lives in exactly one place.
 */
export function releaseAsset({ repoUrl, bookVersion }: Translation, suffix: string): string {
  if (!bookVersion) throw new Error(`${repoUrl}: no bookVersion pinned`);
  const repo = repoUrl.replace(/\/+$/, '');
  const name = repo.split('/').pop();
  return `${repo}/releases/download/${bookVersion}/${name}-${bookVersion.replace(/^v/, '')}${suffix}`;
}
