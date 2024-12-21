/** @type {import('ts-jest')} */
const config = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  testMatch: ["**/src/**/*.test.ts"],
  moduleNameMapper: {
    "^hoshi-models$": "<rootDir>/../models/src",
  },
};

module.exports = config;
