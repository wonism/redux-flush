const isProduction = process.env.NODE_ENV === 'production';

const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  extends: ['airbnb-base', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['import'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    '$Diff': true,
  },
  rules: {
    'arrow-parens': [
      error,
      'as-needed',
      { 'requireForBlockBody': true },
    ],
    'comma-dangle': [
      error,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'function-paren-newline': [error, 'consistent'],
    indent: off,
    'max-len': [error, 150, { ignoreComments: true }],
    'no-console': isProduction ? error : off,
    'no-multiple-empty-lines': [error, { max: error, maxEOF: error }],
    'no-implicit-coercion': error,
    'no-unused-vars': [
      error, {
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: 'Fragment',
      },
    ],
    'no-void': off,
    'object-curly-newline': [error, { consistent: true }],
    'quotes': [error, 'single'],
  },
  parser: 'babel-eslint',
};
