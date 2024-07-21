module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
  