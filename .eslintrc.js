module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["react-hooks"],
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
  rules: {
    "@typescript-eslint/no-floating-promises": 2,
    "@typescript-eslint/triple-slash-reference": [2, { path: "never", types: "never", lib: "never" }],
    "@typescript-eslint/no-unnecessary-qualifier": 2,
    "@typescript-eslint/no-unnecessary-condition": [2, { ignoreRhs: true }],
    "@typescript-eslint/unified-signatures": 2,
    "no-undef": 0,
    "no-redeclare": 0,
    "import/export": 0,
    "import/named": 0,
    "import/no-unresolved": 0,
    "import/namespace": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-interface": 0,

    "@typescript-eslint/camelcase": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-unnecessary-qualifier": 0,

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
  },
};
