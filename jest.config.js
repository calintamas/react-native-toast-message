const rnPreset = require('react-native/jest-preset');

module.exports = {
  ...rnPreset,
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFiles: ['./scripts/node-patch.js', ...rnPreset.setupFiles],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js'
  ],
  testPathIgnorePatterns: ['/__helpers__/']
};
