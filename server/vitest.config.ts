import path from 'path';
import { defineConfig } from 'vitest/config';
import type { UserConfig } from 'vitest/config'; 
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()], 
  test: {
    // Enable global APIs like `describe`, `it`, `expect` (similar to Jest)
    // If set to false, you'd import them: `import { describe, it, expect } from 'vitest';`
    globals: true,

    // Specify the test environment. 'node' is crucial for backend projects.
    // Use 'jsdom' or 'happy-dom' if testing browser-specific code.
    environment: 'node',

    // Define where your test files are located. Common patterns:
    // - '**/*.test.ts': For files named like 'my-module.test.ts'
    // - '**/*.spec.ts': For files named like 'my-module.spec.ts'
    include: ['**/*.test.ts', '**/*.spec.ts'],

    // Configure test coverage (optional)
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'], // Formats for the coverage report
      exclude: ['node_modules/', 'dist/', 'build/', 'coverage/', '**/*.d.ts'],
    },

    // Mocking configuration (optional but often useful)
    mockClear: true, // Clear mocks before each test
    restoreMocks: true, // Restore original implementations after each test
    unstubGlobals: true, // Unstub global methods after each test
  },
  
  // If you use path aliases in your tsconfig.json (e.g., `@/`, `@models/`),
  // you need to configure them here so Vitest can resolve imports in tests.
  resolve: {
    alias: {
      // Example aliases, adjust to match your tsconfig.json `paths`
      '@app': path.resolve(__dirname, './src'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@repositories': path.resolve(__dirname, './src/repositories'),
      '@services': path.resolve(__dirname, './src/services'),
      '@models': path.resolve(__dirname, './src/models'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@types': path.resolve(__dirname, './src/types'),
      // Add more as per your tsconfig.json
    }
  }
} as UserConfig);