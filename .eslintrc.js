module.exports = {
  "env": {
    "es6": true,
    "browser": true,
  },
  "parser": "babel-eslint",
  "extends": ["react-app", "prettier"],
  "plugins": ["graphql", "flowtype", "prettier"],
  // TODO: enable when will be merged https://github.com/tleunen/eslint-import-resolver-babel-module/pull/63
  // plugins: ["import", "graphql", "flowtype", "prettier"],
  // settings: {
  //   "import/resolver": {
  //     "babel-module": {},
  //   },
  // },
  "globals": {
    "__DEV__": true
  },
  "rules": {
    "graphql/template-strings": ['error', {
      env: 'relay',
      schemaString: require('fs').readFileSync('./schema.graphql').toString(),
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
    "react/prefer-stateless-function": 0,
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: "es5",
        tabWidth: 2,
        useTabs: false,
      },
    ],
    "jsx-a11y/href-no-hash": "off",

    // TODO: remove when be merged https://github.com/tleunen/eslint-import-resolver-babel-module/pull/63
    "import/no-unresolved": 0,
    "import/extensions": 0,
  }
};
