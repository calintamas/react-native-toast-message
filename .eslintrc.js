module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react-hooks', 'prettier'],
  globals: {
    __DEV__: false,
    fetch: false
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'react/prop-types': 'warn',
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0
  }
};
