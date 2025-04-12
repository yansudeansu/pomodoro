/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pomodoro/',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/src/**/*.stories.tsx',
        'src/main.tsx',
        'src/App.tsx',
        '**/*.d.ts',
        'src/types/*',
      ],
    },
    exclude: ['**/*.stories.tsx', 'node_modules/**'],
  },
})
