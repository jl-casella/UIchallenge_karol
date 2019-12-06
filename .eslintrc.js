module.exports = {
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  plugins: ['react', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      arrowFunctions: true,
      classes: true,
      destructuring: true,
      spread: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-extra-semi': 0,
    'react/display-name': 0,
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false
      }
    ]
  }
}
