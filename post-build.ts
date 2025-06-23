import path from 'node:path';
import { $ } from 'bun';
import puppeteer from 'puppeteer';

const PORT = 3030;
const DIST_DIR = path.join(import.meta.dir, 'dist');

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const filePath = path.join(DIST_DIR, decodeURIComponent(url.pathname));

    try {
      const file = Bun.file(filePath);
      if (!(await file.exists())) {
        // Fallback to index.html for SPA routing
        return new Response(Bun.file(path.join(DIST_DIR, 'index.html')));
      }
      return new Response(file);
    } catch {
      return new Response('404 Not Found', { status: 404 });
    }
  },
});

console.log(
  `🚀 Bun server streaming from ${DIST_DIR} at http://localhost:${PORT}`,
);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();

await page.setViewport({
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
});
await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

const renderedHTML = await page.$eval('#root', (root) => root.innerHTML);

const indexHTML = await Bun.file(
  path.join(__dirname, 'dist/index.html'),
).text();

const updatedHTML = indexHTML
  .replace(/<div id="root">.*<\/div>/, `<div id="root">${renderedHTML}</div>`)
  .replaceAll('<script defer>', '<script>');

await Bun.write(path.join(__dirname, 'dist/index.html'), updatedHTML);

await browser.close();
await server.stop();
console.log('Server stopped.');

await $`bun workbox generateSW workbox-config.cjs`;
await Bun.write(
  path.join(__dirname, 'dist/manifest.webmanifest'),
  Bun.file(path.join(__dirname, 'public/manifest.webmanifest')),
);
