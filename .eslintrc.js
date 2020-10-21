module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    '@typescript-eslint/no-empty-function': [
      'error', {
        allow: [
          'arrowFunctions',
          'methods',
          'private-constructors',
        ],
      },
    ],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'warn',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }]
  },
};
