const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
    phantomjs: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 8,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  root: true,
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    'import/resolver': { webpack: { config: path.join('webpack.config.js') } },
  },
};
