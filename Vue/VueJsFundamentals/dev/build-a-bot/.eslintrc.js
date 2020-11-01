module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'max-len': 'off',
    'no-trailing-spaces': 'off',
  },
  // overrides: [
  //   {
  //     rules: {
  //       'max-len': 'off' // disables line length check tried: 'max-len': ["error", { "code": 200 }]
  //     }
  //   }
  // ]
};
