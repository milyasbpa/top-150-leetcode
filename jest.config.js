/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/problems/**/dev.test.ts", "**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["src/problems/**/dev.ts", "!src/**/*.d.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  verbose: true,
  testTimeout: 10000,
};
