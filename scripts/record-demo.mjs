import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITES = [
  { id: 'card-shop',      url: 'https://scaffolds.hmtam110501.workers.dev/card-shop' },
  { id: 'food-shop',      url: 'https://scaffolds.hmtam110501.workers.dev/food-shop' },
  { id: 'hair-salon-men', url: 'https://scaffolds.hmtam110501.workers.dev/hair-salon-men' },
];

const outDir = path.join(__dirname, '..', 'public', 'works', '.tmp-rec');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const site of SITES) {
  console.log(`Recording ${site.id}...`);

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: outDir, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();

  await page.goto(site.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let above-fold content settle

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = 6;
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }),
      Math.round((scrollHeight / steps) * i));
    await page.waitForTimeout(900);
  }
  await page.waitForTimeout(1000); // pause at bottom

  const videoPath = await page.video().path();
  await context.close();

  const dest = path.join(__dirname, '..', 'public', 'works', `${site.id}.webm`);
  fs.renameSync(videoPath, dest);
  console.log(`  Saved: public/works/${site.id}.webm`);
}

await browser.close();
fs.rmSync(outDir, { recursive: true });
console.log('Done.');
