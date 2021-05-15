module.exports = {
  parser: "@babel/eslint-parser",
  "plugins": [
    "@babel",
  ],
  "extends": "standard",
  "rules": {
    "semi": [2, "always"],
    "space-before-function-paren": ["error", "never"],
    indent: ["error", 4]
  }
}
