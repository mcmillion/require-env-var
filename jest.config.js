module.exports = {
  setupFiles: ['@babel/polyfill'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/lib/'],
  transform: {
    '.*': 'babel-jest',
  },
};
