module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    "src/server.js",
    "src/database/config.js",
    "src/database/migrations"
  ],
  globalSetup: './tests/jest.globalSetup.js',
  globalTeardown: './tests/jest.globalTeardown.js',
};
