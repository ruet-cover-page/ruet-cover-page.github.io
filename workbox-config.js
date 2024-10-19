module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{mjs,txt,png,ico,html,webmanifest,jpg,css,ttf,js}'],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
