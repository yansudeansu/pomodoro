/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const ReactComplilerConfig = {
  // ...
};

// https://github.com/facebook/react/issues/32950
// Temporary solution until they fix above issue
const isCompilerEnabled = process.env.REACT_COMPILER !== 'false';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: isCompilerEnabled ? [['babel-plugin-react-compiler', ReactComplilerConfig]] : [],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true,
        suppressWarnings: true,
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'Pomodoro',
        short_name: 'Pomodoro',
        description: 'Stay focused with a clean pomodoro timer',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        start_url: '/pomodoro/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  base: '/pomodoro/',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/src/**/*.stories.tsx',
        'src/main.tsx',
        'src/App.tsx',
        '**/*.d.ts',
        'src/types/*',
        'src/constants.ts',
      ],
    },
    exclude: ['**/*.stories.tsx', 'node_modules/**', 'build'],
  },
});
