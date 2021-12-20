module.exports = {
  env: {
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  plugins: ["@typescript-eslint", "prettier", "import", "jest"],
  rules: {
    "prettier/prettier": ["error"],
    "import/extensions": 0,
    "import/prefer-default-export": "off",
  },
};
