import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.ts'],

    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});