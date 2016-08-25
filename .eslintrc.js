module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "browser": true,
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "import",
    "graphql"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "globals": {
    "__DEV__": true
  },
  "rules": {
    "graphql/template-strings": ['error', {
      env: 'relay',
      schemaJson: require('./schema.graphql.json'),
    }],
    "react/jsx-quotes": 0,
    "react/jsx-indent-props": 0,
    "jsx-quotes": [2, "prefer-double"],
    "no-trailing-spaces": 0,
    "import/no-unresolved": [2, {commonjs: true, amd: true}],
    "no-underscore-dangle": 0,
    "arrow-body-style": 0,
    "import/no-extraneous-dependencies": 0,
    "import/imports-first": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0
  }
};
