module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    sourceType: "module",
    ecmaVersion: 6,
    project: "./tsconfig.eslint.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/prop-types": "off",
    "react/function-component-definition": "off",
    "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
    // "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    // "arrow-body-style": ["error", "as-needed"],
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/require-default-props": "off",
    "react/jsx-sort-props": [
      "error",
      { callbacksLast: true, shorthandLast: true, reservedFirst: true },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["NextLink"],
        specialLink: ["href"],
      },
    ],
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "react/jsx-props-no-spreading": "off",
      },
    },
    {
      // enable the rule specifically for TypeScript files
      files: ["**/*.js", "**/*.jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
