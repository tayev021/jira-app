/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app.ts',
    '!src/server.ts',
    '!src/router.ts',
    '!src/**/*.d.ts',
    '!src/**/*.model.ts',
    '!src/**/*.validation.ts',
    '!src/shared/errors/**',
    '!src/shared/types/**',
    '!src/shared/model/**',
  ],
};
