// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.config.dev.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['warning', 'never', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-unused-vars': 1,
    'one-var': 0,
    'no-new': 0,
    'new-cap': 0,
    'indent': 0,
    'no-useless-escape': 0,
    'semi': [1, "never"],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow import with script-loader in main.js
    'import/no-webpack-loader-syntax': 0
  },
  globals: {
    'Foundation': false,
    '$': false
  }
}
