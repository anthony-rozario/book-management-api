module.exports = {
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'routes/**/*.js'
  ],
  testMatch: ['**/test/**/*.test.js'], // this is fine
};
