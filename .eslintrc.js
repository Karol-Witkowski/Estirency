module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
