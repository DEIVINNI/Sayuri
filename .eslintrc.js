module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 0,
    'no-useless-return': 0,
    'array-callback-return': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    'newline-per-chained-call': 0,
    'no-restricted-syntax': 0
  },
};
