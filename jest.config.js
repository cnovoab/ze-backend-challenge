module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  roots: ['src/'],
  testEnvironment: 'node',
  testRegex: 'src(/.*)?/__tests__/[^/]*\\.test\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  setupFilesAfterEnv: [
    "./src/test-helpers/typeorm.ts"
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/*.ts',
    '!src/**/__tests__/**/*.*',
    '!src/test/**/*.*',
    '!src/initialization/*.ts',
  ],
  coverageReporters: [
    'text-summary',
    'lcov',
    'html'
  ]
}
