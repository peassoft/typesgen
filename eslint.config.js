import mnrConfig from '@memnrev/eslint-v9-config';

export default [
  {
    ignores: [
      'dev/dest/**/*.*',
      'test/integration/dest/**/*.*',
      'test/integration/expected/**/*.*',
    ],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...mnrConfig.configs.node,
];
