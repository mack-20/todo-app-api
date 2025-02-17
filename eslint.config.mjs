import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.browser },
    extends: ["eslint:recommended", "prettier"], // Add recommended rules + Prettier
    plugins: ["prettier"], // Enable Prettier plugin
    rules: {
      "prettier/prettier": "error", // Make Prettier auto-format issues show as errors
      "no-unused-vars": "warn", // Warn for unused variables
      "quotes": ["error", "double"], // Enforce double quotes
      "semi": ["error", "always"], // Enforce semicolons
    },
  },
];
