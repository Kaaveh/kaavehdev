// Fetches the pre-rendered Quarto books listed in src/data/translations.ts and
// unpacks them into public/, from where Astro copies them to dist/ untouched
// (spec 018).
//
// Why fetch instead of render: Cloudflare Workers Builds has no Quarto or TeX,
// and committing the ~7 MB rendered book would dwarf this repo's history —
// Quarto rewrites all 76 HTML files on any content edit. The bundle is
// relocatable (all asset paths relative), so it serves fine from a subpath.
//
// Always the *latest* release, never a pinned tag (spec 020): tagging a release
// in a book repo POSTs a Cloudflare deploy hook, which rebuilds this site, which
// runs this script. `releases/latest/download/` resolves an unversioned asset
// name, so no GitHub API call is involved — that API is 60 requests/hour per IP
// and Cloudflare's build runners share IPs.
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
  const { title, assetBase, path: bookPath } = translation;

  // No published release (or nowhere to serve it): nothing to do, and the card
  // renders as work in progress. Not an error.
  if (!assetBase || !bookPath) {
    console.log(`fetch-book: ${title} — not published yet, skipping`);
    continue;
  }

  const dir = path.join(root, 'public', bookPath);
  // The stamp lives in .astro/ (gitignored build cache), not in public/, so it
  // never ships to dist/. Losing it only costs one re-download.
  const stamp = path.join(root, '.astro', `book${bookPath.replace(/\/$/, '').replace(/\//g, '-')}`);

  // There is no version string to compare any more, so the freshness signal is
  // the tarball's ETag, asked for in the same request that downloads it: a 304
  // means the unpacked copy is current, which is what keeps `npm run dev` after
  // a build from pulling 3 MB again.
  const unpacked = existsSync(path.join(dir, 'index.html'));
  const etag = unpacked && existsSync(stamp) ? readFileSync(stamp, 'utf8').trim() : '';

  const url = releaseAsset(translation, '-html.tar.gz');
  console.log(`fetch-book: ${etag ? 'checking' : 'downloading'} ${url}`);

  const response = await fetch(url, { headers: etag ? { 'if-none-match': etag } : {} });

  if (response.status === 304) {
    console.log(`fetch-book: ${bookPath} already current`);
    continue;
  }

  // A published book that can't be fetched is a real error — fail the build.
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

  // No ETag from the CDN: leave no stamp rather than a stamp that can't match.
  const fresh = response.headers.get('etag');
  rmSync(stamp, { force: true });
  if (fresh) {
    mkdirSync(path.dirname(stamp), { recursive: true });
    writeFileSync(stamp, `${fresh}\n`);
  }
  console.log(`fetch-book: ${bookPath} updated`);
}
