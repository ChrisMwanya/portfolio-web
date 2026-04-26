import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import nextConfig from 'eslint-config-next';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      '.next/**',
      '.cache/**',
      'package-lock.json',
      'public/**',
      'node_modules/**',
      'next-env.d.ts',
      'next.config.ts',
      'yarn.lock',
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript support
  ...tseslint.configs.recommended,

  // Next.js flat config (provides react, react-hooks, import, jsx-a11y, @next/next, @typescript-eslint)
  ...nextConfig,

  // Prettier plugin + custom rules
  // Note: react, react-hooks, @typescript-eslint are already registered by nextConfig above
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // JavaScript rules
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-unused-vars': 'off', // Managed by @typescript-eslint/no-unused-vars
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],

      // React rules (plugins already registered by eslint-config-next)
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['ts', 'tsx', 'jsx', 'js'] },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/set-state-in-effect': 'off',

      // Prettier
      'prettier/prettier': 'warn',
    },
  },

  // Prettier config (must be last to override formatting rules)
  prettierConfig,
];

export default config;
