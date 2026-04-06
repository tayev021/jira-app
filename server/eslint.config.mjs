import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{ts}'],
    plugins: { js, prettier },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: ['dist/', 'node_modules/'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
]);
