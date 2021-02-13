module.exports = {
  parser: 'babel-eslint',
  root: true,
  globals: {
    __DEV__: false,
    fetch: false
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-native-a11y/basic',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'react/sort-comp': 'off',
    'import/no-cycle': 'error',
    'react/prop-types': ['error', { ignore: ['children'] }]
  }
};
