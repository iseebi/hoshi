/** @type {import('ts-jest')} */
const config = {
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "transform": {
    "^.+\\.ts$": [
      "ts-jest",
      {
        "tsConfig": "tsconfig.json"
      }
    ]
  },
  "testMatch": [
    "**/src/**/*.test.ts"
  ]
};

module.exports = config;
