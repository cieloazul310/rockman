/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:jest/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["jest"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: "./tsconfig.eslint.json",
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-props-no-spreading": [
      "off",
      {
        custom: "ignore",
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["loadershim.cjs"],
      rules: {
        "no-underscore-dangle": "warn",
      },
    },
  ],
};
