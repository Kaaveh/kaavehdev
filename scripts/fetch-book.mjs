// Fetches the pre-rendered Quarto books listed in src/data/translations.ts and
// unpacks them into public/, from where Astro copies them to dist/ untouched
// (spec 018).
//
// Why fetch instead of render: Cloudflare Workers Builds has no Quarto or TeX,
// and committing the ~7 MB rendered book would dwarf this repo's history —
// Quarto rewrites all 76 HTML files on any content edit. The bundle is
// relocatable (all asset paths relative), so it serves fine from a subpath.
//
// Run by `npm run build` before `astro build`. Needs Node's built-in fetch and
// the system `tar`; no npm dependency.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { releaseAsset, translations } from '../src/data/translations.ts';

const root = fileURLToPath(new URL('..', import.meta.url));

for (const translation of translations) {
  const { title, bookVersion, path: bookPath } = translation;

  // No pinned release (or nowhere to serve it): nothing to do, and the card
  // renders as work in progress. Not an error.
  if (!bookVersion || !bookPath) {
    console.log(`fetch-book: ${title} — no pinned version, skipping`);
    continue;
  }

  const dir = path.join(root, 'public', bookPath);
  // The stamp lives in .astro/ (gitignored build cache), not in public/, so it
  // never ships to dist/. Losing it only costs one re-download.
  const stamp = path.join(root, '.astro', `book${bookPath.replace(/\/$/, '').replace(/\//g, '-')}`);

  const current =
    existsSync(stamp) && readFileSync(stamp, 'utf8').trim() === bookVersion &&
    existsSync(path.join(dir, 'index.html'));

  if (current) {
    console.log(`fetch-book: ${bookPath} already at ${bookVersion}`);
    continue;
  }

  const url = releaseAsset(translation, '-html.tar.gz');
  console.log(`fetch-book: downloading ${url}`);

  // A pinned version that can't be fetched is a real error — fail the build.
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`fetch-book: ${url} → HTTP ${response.status} ${response.statusText}`);
  }

  const scratch = mkdtempSync(path.join(tmpdir(), 'fetch-book-'));
  try {
    const tarball = path.join(scratch, 'book.tar.gz');
    writeFileSync(tarball, Buffer.from(await response.arrayBuffer()));

    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    execFileSync('tar', ['-xzf', tarball, '-C', dir]);
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }

  if (!existsSync(path.join(dir, 'index.html'))) {
    throw new Error(`fetch-book: ${url} unpacked without an index.html`);
  }

  mkdirSync(path.dirname(stamp), { recursive: true });
  writeFileSync(stamp, `${bookVersion}\n`);
  console.log(`fetch-book: ${bookPath} now at ${bookVersion}`);
}
