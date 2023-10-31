module.exports = {
  env: {
    browser: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect"
    }
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
