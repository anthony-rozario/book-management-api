module.exports = {
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['controllers/**/*.js'],
  testMatch: ['**/test/**/*.test.js'], // ✅ match singular `test/`
};