// require('@rushstack/eslint-patch/modern-module-resolution');

// module.exports = {
//   root: true,
//   extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-airbnb', 'prettier'],
//   parser: 'vue-eslint-parser',
//   env: {
//     jest: true,
//   },
//   parserOptions: {
//     ecmaVersion: 2020,
//     ecmaFeatures: {
//       jsx: true,
//     },
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module',
//     project: './tsconfig.eslint.json',
//     extraFileExtensions: ['.vue'],
//   },
//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       },
//     },
//   },
//     env: {
//     jest: true,
//   },

//   rules: {
//     'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
//     'import/extensions': [
//       'error',
//       'ignorePackages',
//       {
//         js: 'never',
//         jsx: 'never',
//         ts: 'never',
//         tsx: 'never',
//       },
//     ],
//     'react/jsx-props-no-spreading': 'off',
//     'vue/multi-word-component-names': 'off',
//     'prettier/prettier': 'error',
//   },
// };

module.exports = {
  env: {
    jest: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
  },
};
