module.exports = {
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],

  // A set of global variables that need to be available in all test environments
  // globals: {},

  resetMocks: true,

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    '<rootDir>',
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // The test environment that will be used for testing
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
