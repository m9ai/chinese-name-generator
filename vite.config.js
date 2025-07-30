import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Chinese Name Generator',
        short_name: 'Name Gen',
        description: 'Generate Chinese names for foreigners',
        theme_color: '#ffffff',
        icons: [{
          src: 'favicon.png',
          sizes: '192x192',
          type: 'image/png'
        }]
      }
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  }
});
