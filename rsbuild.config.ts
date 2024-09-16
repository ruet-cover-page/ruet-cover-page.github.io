import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  output: {
    assetPrefix: '/cover-page/',
    inlineScripts: /[\\/]inline-script\.\w+\.js$/,
  },
  performance: {
    chunkSplit: {
      forceSplitting: {
        'inline-script': /inline-script/,
      },
    },
  },
  plugins: [pluginReact()],
  html: {
    title: 'Cover Page',
  },
});
