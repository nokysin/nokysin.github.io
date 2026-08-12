export default [
  {
    files: ['app.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        Math: 'readonly'
      }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-implicit-globals': 'error',
      eqeqeq: 'error'
    }
  }
];
