module.exports = {
  extends: ["react-app"],
  overrides: [
    {
      files: ["**/*.ts?(x)", "**/*.mts?(x)"],
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-restricted-globals": "off",
      },
    },
  ],
};
