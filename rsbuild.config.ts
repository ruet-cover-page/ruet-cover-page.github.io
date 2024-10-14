import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

export default defineConfig({
  output: {
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
    title: 'RUET Cover Page',
    favicon: './public/favicon.ico',
    appIcon: {
      name: 'RUET Cover Page',
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
      'og:url': 'http://ruet-cover-page.github.io/',
      'og:title': 'RUET Cover Page',
      'og:description':
        'Create cover pages for your lab reports and assignments',
      'og:image': 'http://ruet-cover-page.github.io/og.jpg',
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
