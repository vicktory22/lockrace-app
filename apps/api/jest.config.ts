export default {
  testEnvironment: "miniflare",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts"],
};
