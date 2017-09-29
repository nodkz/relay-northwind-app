/* eslint-disable prefer-template */

const path = require('path');
const aliases = require('./aliases');

// ///////////////////////////////////////////////////////////////
// //////////////////   PLUGINS   ////////////////////////////////
// ///////////////////////////////////////////////////////////////

const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('./')],
      alias: aliases,
    },
  ],
];

const relayTransformWatchPlugin = [
  require.resolve('babel-plugin-transform-relay-hot'),
  {
    schema: './schema.graphql.json',
    watchInterval: 2000,
  },
];

const relayTransformStaticPlugin = [
  require.resolve('babel-plugin-transform-relay-hot'),
  {
    schema: './schema.graphql.json',
    watchInterval: 0, // disable watch
  },
];

const commonNodePlugins = [
  // Compiles import() to a deferred require()
  // require.resolve('babel-plugin-dynamic-import-node'),
  [
    require.resolve('babel-plugin-import-inspector'),
    {
      serverSideRequirePath: true,
      webpackRequireWeakId: true,
    },
  ],
];

const commonBrowserPlugins = [
  // Adds syntax support for import()
  // Does not work with Webpack dynamic import. Eg. for SvgIcons
  // require.resolve('babel-plugin-syntax-dynamic-import'),
  [
    require.resolve('babel-plugin-import-inspector'),
    {
      webpackRequireWeakId: true,
    },
  ],
];

const reactDevelopmentPlugins = [
  // The following two plugins are currently necessary to make React warnings
  // include more valuable information. They are included here because they are
  // currently not enabled in babel-preset-react. See the below threads for more info:
  // https://github.com/babel/babel/issues/4702
  // https://github.com/babel/babel/pull/3540#issuecomment-228673661
  // https://github.com/facebookincubator/create-react-app/issues/989

  // Adds component stack to warning messages
  require.resolve('babel-plugin-transform-react-jsx-source'),
  // Adds __self attribute to JSX which React will use for some warnings
  require.resolve('babel-plugin-transform-react-jsx-self'),
];

const reactProductionPlugins = [
  // improve production build,
  // see https://medium.com/doctolib-engineering/improve-react-performance-with-babel-16f1becfaa25
  // require.resolve('babel-plugin-transform-react-remove-prop-types'),
  // require.resolve('babel-plugin-transform-react-inline-elements'),
  // Optimization: hoist JSX that never changes out of render()
  // Disabled because of issues:
  // * https://github.com/facebookincubator/create-react-app/issues/525
  // * https://phabricator.babeljs.io/search/query/pCNlnC2xzwzx/
  // * https://github.com/babel/babel/issues/4516
  // TODO: Enable again when these issues are resolved.
  // require.resolve('babel-plugin-transform-react-constant-elements')
];

const inlineImportPlugin = [
  require.resolve('babel-plugin-inline-import'),
  { extensions: ['.mjml', '.txt'] },
];

// ///////////////////////////////////////////////////////////////
// //////////////////   PRESETS   ////////////////////////////////
// ///////////////////////////////////////////////////////////////

// ES features necessary for user's Node version
const nodeDevelopmentPreset = [
  require.resolve('babel-preset-env'),
  {
    targets: {
      node: 'current',
    },
  },
];
const nodeProductionPreset = [
  require.resolve('babel-preset-env'),
  {
    targets: {
      node: require('./package.json').engines.node,
    },
  },
];

// Latest stable ECMAScript features
const browserProductionPreset = [
  require.resolve('babel-preset-env'),
  {
    targets: {
      // React parses on ie 9, so we should too
      ie: 9,
    },
    // We currently minify with uglify
    // Remove after https://github.com/mishoo/UglifyJS2/issues/448
    forceAllTransforms: true,
    // Disable polyfill transforms
    useBuiltIns: false,
    // Do not transform modules to CJS
    modules: false,
  },
];
const browserDevelopmentPreset = [
  require.resolve('babel-preset-env'),
  {
    targets: {
      // chrome: 55,
      browsers: ['last 2 versions', 'safari >= 10'],
    },
    // Disable polyfill transforms
    useBuiltIns: false,
    // Do not transform modules to CJS
    modules: false,
  },
];

// JSX, Flow
const reactPreset = require.resolve('babel-preset-react');
const flowPreset = require.resolve('babel-preset-flow');

// ///////////////////////////////////////////////////////////////
// //////////////////   EXPORT   /////////////////////////////////
// ///////////////////////////////////////////////////////////////

module.exports = {
  presets: [reactPreset, flowPreset, 'stage-0'],
  plugins: [...commonPlugins],
  env: {
    browser_development: {
      presets: [browserDevelopmentPreset, reactPreset, flowPreset, 'stage-0'],
      plugins: [...reactDevelopmentPlugins, ...commonBrowserPlugins, relayTransformWatchPlugin],
    },
    browser_production: {
      presets: [browserProductionPreset, reactPreset, flowPreset, 'stage-0'],
      plugins: [relayTransformStaticPlugin, ...reactProductionPlugins, ...commonBrowserPlugins],
    },
    server_development: {
      presets: [nodeDevelopmentPreset, reactPreset, flowPreset, 'stage-0'],
      plugins: [...commonNodePlugins, ...reactDevelopmentPlugins, relayTransformWatchPlugin],
    },
    server_production: {
      presets: [nodeProductionPreset, reactPreset, flowPreset, 'stage-0'],
      plugins: [...commonNodePlugins, relayTransformStaticPlugin, ...reactProductionPlugins],
    },
    test: {
      presets: [nodeDevelopmentPreset, reactPreset, flowPreset, 'stage-0'],
      plugins: [
        inlineImportPlugin,
        ...commonNodePlugins,
        ...reactDevelopmentPlugins,
        relayTransformWatchPlugin,
      ],
    },
    scripts: {
      presets: [nodeDevelopmentPreset, reactPreset, flowPreset, 'stage-0'],
      plugins: [...commonPlugins, inlineImportPlugin],
    },
  },
};
