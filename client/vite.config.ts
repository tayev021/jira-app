/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/shared/test/setup.ts'],
    globals: true,
    bail: 1,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/index.ts',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.schema.ts',
        'src/main.tsx',
        'src/shared/test/**',
        'src/shared/types/**',
      ],
    },
  },
});
