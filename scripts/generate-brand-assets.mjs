// One-shot generator for the committed brand raster assets:
//   public/og.png (1200x630), public/apple-touch-icon.png (180x180),
//   public/favicon.ico (32x32).
// public/favicon.svg is authored by hand (dark/light aware) and NOT generated.
//
// Run: `node scripts/generate-brand-assets.mjs` (needs `sharp`, an Astro dep).
// The build never runs this — the PNGs/ICO are committed. Rerun only when the
// mark or OG design changes. Fonts are embedded into the SVG at render time so
// the real Space Grotesk / JetBrains Mono shapes are baked into the raster.
import sharp from 'sharp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pub = (p) => new URL(`../public/${p}`, import.meta.url);

const GRAD_FROM = '#7F52FF'; // Kotlin violet
const GRAD_TO = '#3DDC84'; // Android green
const BG = '#0b0e14'; // --bg (dark)

const b64 = (rel) => fs.readFileSync(root + rel).toString('base64');
const SPACE_GROTESK = b64(
  'node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
);
const JETBRAINS = b64(
  'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
);

// The "K" mark: three round-capped strokes on a 64-unit grid. `stroke` is the
// glyph color, `tile` (optional) draws a rounded gradient backing square.
const kGlyph = (stroke, sw = 7) => `
  <g stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M23 16 V48" />
    <path d="M23 33 L43 16" />
    <path d="M23 33 L43 48" />
  </g>`;

const gradientDef = (id) => `
  <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GRAD_FROM}" />
    <stop offset="1" stop-color="${GRAD_TO}" />
  </linearGradient>`;

// Rounded gradient tile + white K (legible in a browser tab / as a logo lockup).
const tileMark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>${gradientDef('g')}</defs>
  <rect width="64" height="64" rx="14" fill="url(#g)" />
  ${kGlyph('#ffffff')}
</svg>`;

// Solid dark square + gradient K (for the apple-touch-icon; iOS masks corners).
// userSpaceOnUse so the gradient also paints the vertical stem (whose object
// bounding box is zero-width and would otherwise render nothing).
const appleMark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="16" y1="16" x2="48" y2="48">
      <stop offset="0" stop-color="${GRAD_FROM}" />
      <stop offset="1" stop-color="${GRAD_TO}" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" fill="${BG}" />
  ${kGlyph('url(#g)', 8)}
</svg>`;

const ogSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${gradientDef('g')}
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${GRAD_FROM}" stop-opacity="0.35" />
      <stop offset="1" stop-color="${GRAD_FROM}" stop-opacity="0" />
    </radialGradient>
    <style>
      @font-face { font-family: 'SG'; font-weight: 700; src: url(data:font/woff2;base64,${SPACE_GROTESK}) format('woff2'); }
      @font-face { font-family: 'JB'; font-weight: 500; src: url(data:font/woff2;base64,${JETBRAINS}) format('woff2'); }
      .name { font-family: 'SG'; font-weight: 700; }
      .title { font-family: 'SG'; font-weight: 700; }
      .mono { font-family: 'JB'; font-weight: 500; }
    </style>
  </defs>
  <rect width="1200" height="630" fill="${BG}" />
  <circle cx="1120" cy="90" r="420" fill="url(#glow)" />
  <g transform="translate(100 96)">
    <rect width="88" height="88" rx="19" fill="url(#g)" />
    <g transform="scale(1.375)">${kGlyph('#ffffff')}</g>
  </g>
  <text x="100" y="278" class="mono" font-size="30" fill="${GRAD_TO}">android engineer · yerevan</text>
  <text x="98" y="386" class="name" font-size="104" fill="#eef1f6">Kaaveh Mohamedi</text>
  <text x="100" y="470" class="title" font-size="56" fill="url(#g)">Senior Android Engineer</text>
  <rect x="100" y="500" width="300" height="8" rx="4" fill="url(#g)" />
  <text x="100" y="574" class="mono" font-size="26" fill="#9aa4b2">kaavehdev.ir</text>
</svg>`;

// Wrap a PNG buffer in a single-image .ico container (PNG-in-ICO; universally
// supported). size must be <= 256.
const pngToIco = (png, size) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  const dir = Buffer.alloc(16);
  dir.writeUInt8(size >= 256 ? 0 : size, 0); // width
  dir.writeUInt8(size >= 256 ? 0 : size, 1); // height
  dir.writeUInt16LE(1, 4); // planes
  dir.writeUInt16LE(32, 6); // bpp
  dir.writeUInt32LE(png.length, 8); // size of PNG
  dir.writeUInt32LE(6 + 16, 12); // offset
  return Buffer.concat([header, dir, png]);
};

const render = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

await sharp(Buffer.from(ogSvg())).png({ compressionLevel: 9 }).toFile(fileURLToPath(pub('og.png')));
await sharp(Buffer.from(appleMark(180))).png().toFile(fileURLToPath(pub('apple-touch-icon.png')));
fs.writeFileSync(fileURLToPath(pub('favicon.ico')), pngToIco(await render(tileMark(32), 32), 32));

console.log('Wrote public/og.png, public/apple-touch-icon.png, public/favicon.ico');
