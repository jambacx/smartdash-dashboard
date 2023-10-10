module.exports = {
  env: {
    browser: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
};
