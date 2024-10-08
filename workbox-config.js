module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{mjs,txt,png,ico,html,webmanifest,jpg,css,ttf,js}'],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  clientsClaim: true, // Takes control of clients immediately after activation
  skipWaiting: true, // Skip the waiting phase and activate the new service worker right away
};
