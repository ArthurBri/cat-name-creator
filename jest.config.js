module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.svg$": "<rootDir>/src/tests/svgTransformer.js",
  },
  moduleFileExtensions: ["js", "ts", "json", "vue"],
};
