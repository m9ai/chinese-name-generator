import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import sitemapPlugin from 'vite-plugin-sitemap';
import tailwindcss from '@tailwindcss/vite';
import { routes } from './src/utils/routes';

export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Chinese Name Generator',
        short_name: 'Name Gen',
        description: 'Generate authentic Chinese names with meanings, pronunciation guides, and zodiac sign compatibility analysis. Get your perfect Chinese identity in seconds!',
        theme_color: '#ffffff',
        icons: [{
          src: 'favicon.svg',
          sizes: '192x192',
          type: 'image/svg+xml'
        }]
      }
    }),
    tailwindcss(),
    sitemapPlugin({
      hostname: 'https://chinese-name.m9ai.work',
      routes: routes.map(route => ({
        path: route,
        lastmod: new Date().toISOString()
      })),
      include: ['/**'],
      exclude: ['/404'], // 排除不需要索引的页面
      dateFormatter: () => new Date().toISOString(),
      generateRobotsTxt: true, // 自动生成robots.txt
      robotsTxtOptions: {
        policies: [{
          userAgent: '*',
          allow: '/'
        }],
        additionalSitemaps: ['https://chinese-name.m9ai.work/sitemap.xml']
      }
    })
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  }
});
