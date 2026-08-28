/* ===========================================================================
   Shrinks whatever is sitting in tools/incoming and files it where the site
   expects it. Run it through optimise-images.cmd, or with:  node tools/optimise-images.mjs

   Pictures  -> assets/img/  as .webp, capped at 1500px wide
   GIFs      -> assets/gif/  as silent .mp4 (a GIF is often 20x bigger)
   Clips     -> assets/gif/  as silent .mp4, capped at 1100px wide
   =========================================================================== */
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, existsSync, renameSync, statSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, '..');
const inbox = join(here, 'incoming');
const done  = join(here, 'incoming', '_originals');
const imgOut = join(site, 'assets', 'img');
const vidOut = join(site, 'assets', 'gif');

for (const d of [inbox, done, imgOut, vidOut]) if (!existsSync(d)) mkdirSync(d, { recursive: true });

const PIC = new Set(['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tif', '.tiff', '.jfif', '.heic']);
const VID = new Set(['.gif', '.mp4', '.mov', '.m4v', '.webm', '.avi', '.mkv']);

const slug = s => basename(s, extname(s))
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'file';

const files = readdirSync(inbox).filter(f => {
  try { return statSync(join(inbox, f)).isFile(); } catch { return false; }
});

if (!files.length) {
  console.log('\n  Nothing in tools/incoming yet.');
  console.log('  Drop your pictures or clips in there and run this again.\n');
  process.exit(0);
}

const kb = p => (statSync(p).size / 1024).toFixed(0);
let ok = 0, skipped = 0;

for (const f of files) {
  const src = join(inbox, f);
  const ext = extname(f).toLowerCase();
  const name = slug(f);
  try {
    if (PIC.has(ext)) {
      const out = join(imgOut, name + '.webp');
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', src,
        '-vf', "scale='min(1500,iw)':-2", '-c:v', 'libwebp',
        '-quality', '80', '-compression_level', '6', out]);
      console.log(`  picture  ${f}  ${kb(src)} KB  ->  assets/img/${name}.webp  ${kb(out)} KB`);
      console.log(`           use it as:  ['img','${name}.webp','Your caption']`);
      ok++;
    } else if (VID.has(ext)) {
      const out = join(vidOut, name + '.mp4');
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', src,
        '-movflags', '+faststart', '-pix_fmt', 'yuv420p', '-c:v', 'libx264',
        '-crf', '28', '-preset', 'slow', '-an',
        '-vf', "scale='trunc(min(iw,1100)/2)*2':-2", out]);
      console.log(`  clip     ${f}  ${kb(src)} KB  ->  assets/gif/${name}.mp4  ${kb(out)} KB`);
      console.log(`           use it as:  ['vid','${name}.mp4','Your caption']`);
      ok++;
    } else {
      console.log(`  skipped  ${f}  (not a picture or a clip)`);
      skipped++;
      continue;
    }
    renameSync(src, join(done, f));
  } catch (err) {
    console.log(`  FAILED   ${f}  ${String(err.message).split('\n')[0]}`);
    skipped++;
  }
}

console.log(`\n  ${ok} file${ok === 1 ? '' : 's'} ready${skipped ? `, ${skipped} skipped` : ''}.`);
console.log('  Originals moved to tools/incoming/_originals so nothing is lost.');
console.log('  Now open assets/content.js and add the lines printed above.\n');
