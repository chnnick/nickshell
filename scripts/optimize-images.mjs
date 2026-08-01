// Generates the web-ready images in public/ from the originals in assets-src/.
//
// Run manually after adding or replacing a source image:
//
//   npm run images
//
// The outputs are committed, so CI only ever runs `vite build` — no image
// processing in the deploy path. Originals stay in assets-src/ so Vite never
// copies the multi-megabyte PNGs into dist/.

import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public';

// Gallery photos are square-cropped in the UI, so resize to a square and let
// sharp cover-crop. 400 is the grid thumbnail (2x a ~200px cell); 1000 is the
// lightbox, fetched only when a photo is opened — it displays at max 78vh, so
// 1000px is already oversampled on most screens and 1200 cost 28% more bytes
// for no visible gain.
const GALLERY_SIZES = [400, 1000];

const bytes = (n) => `${(n / 1024).toFixed(0)} KB`;

/** Write one WebP derivative and return its size in bytes. */
async function webp(src, dest, size, { fit = 'cover', quality = 80 } = {}) {
  const { size: out } = await sharp(src)
    .resize(size, size, { fit, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(dest);
  return out;
}

async function gallery() {
  const dir = path.join(SRC, 'gallery');
  const outDir = path.join(OUT, 'gallery');
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  let total = 0;

  for (const file of files) {
    const name = path.parse(file).name;
    for (const size of GALLERY_SIZES) {
      const out = await webp(path.join(dir, file), path.join(outDir, `${name}-${size}.webp`), size);
      total += out;
      console.log(`  gallery/${name}-${size}.webp  ${bytes(out)}`);
    }
  }
  return total;
}

async function portraitsAndLogos() {
  let total = 0;

  // Headshot: 56px in the header, 2x for retina. 128 covers it with room to grow.
  for (const size of [128, 256]) {
    const out = await webp(path.join(SRC, 'headshot.png'), path.join(OUT, `headshot-${size}.webp`), size);
    total += out;
    console.log(`  headshot-${size}.webp  ${bytes(out)}`);
  }

  // Company logos render small and must not be cropped — 'inside' preserves
  // aspect ratio within the box.
  const logos = ['firstbytelogo.png', 'libertylogo.png', 'c4clogo.jpg'];
  for (const file of logos) {
    const name = path.parse(file).name;
    const out = await webp(path.join(SRC, file), path.join(OUT, `${name}.webp`), 96, { fit: 'inside' });
    total += out;
    console.log(`  ${name}.webp  ${bytes(out)}`);
  }

  // Favicons stay PNG — universally supported for icons, and tiny at these sizes.
  for (const [size, name] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png']]) {
    const { size: out } = await sharp(path.join(SRC, 'Flurry.jpeg'))
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, name));
    total += out;
    console.log(`  ${name}  ${bytes(out)}`);
  }

  return total;
}

console.log('Generating images from assets-src/ ...\n');
const total = (await gallery()) + (await portraitsAndLogos());
console.log(`\nTotal written: ${bytes(total)}`);
