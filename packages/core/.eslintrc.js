module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: ["prettier/@typescript-eslint", "plugin:@stencil/recommended"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "@stencil"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "@typescript-eslint/explicit-member-accessibility": ["error", {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "no-public",
          methods: "explicit",
          properties: "off",
          parameterProperties: "explicit",
        },
      },
    ],
    "@stencil/strict-boolean-conditions": "off",
  },
  parser: "@typescript-eslint/parser",
};
