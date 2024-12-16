import path from 'node:path';
import { $ } from 'bun';
import httpServer from 'http-server';
import puppeteer from 'puppeteer';

const PORT = 3030;

const startServer = () => {
  const server = httpServer.createServer({
    root: path.join(__dirname, 'dist'),
  });
  return new Promise<typeof server>((resolve) => {
    server.listen(PORT, 'localhost', () => {
      console.log(`Server started at http://localhost:${PORT}`);
      resolve(server);
    });
  });
};
const server = await startServer();
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
server.close(() => {
  console.log('Server stopped.');
});

await $`bun workbox generateSW workbox-config.cjs`;
await Bun.write(
  path.join(__dirname, 'dist/manifest.webmanifest'),
  Bun.file(path.join(__dirname, 'public/manifest.webmanifest')),
);
