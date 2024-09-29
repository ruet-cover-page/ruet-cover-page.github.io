import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

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
    favicon: './public/favicon.ico',
    appIcon: {
      name: 'Cover Page',
      icons: [
        {
          src: './public/apple-touch-icon.png',
          size: 180,
          target: 'apple-touch-icon',
        },
        {
          src: './public/android-chrome-192x192.png',
          size: 192,
          target: 'web-app-manifest',
        },
        {
          src: './public/android-chrome-512x512.png',
          size: 512,
          target: 'web-app-manifest',
        },
      ],
    },
    meta: {
      description: 'Create cover pages for your lab reports and assignments',
      'msapplication-TileColor': '#603cba',
      'og:url': 'https://www.nabilsnigdho.dev/cover-page/',
      'og:title': 'Cover Page',
      'og:description':
        'Create cover pages for your lab reports and assignments',
      'og:image': 'https://www.nabilsnigdho.dev/cover-page/og.jpg',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/jpeg',
      'og:type': 'website',
      'og:locale': 'en_US',
    },
  },
  tools: {
    rspack(config, { appendPlugins }) {
      // Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            supports: {
              generateTileGraph: true,
            },
          }),
        );
      }
    },
  },
});
