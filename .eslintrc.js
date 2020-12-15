module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  globals: {
    cy: 'writable',
  },
  extends: [
    'plugin:cypress/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
