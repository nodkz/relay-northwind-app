/* eslint-disable import/first */

require('dotenv').config();

import webpack from 'webpack';
import deepmerge from 'deepmerge';
import aliases from '../aliases';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

export const PORT = process.env.DEV_PORT || 3000;
export const PORT_BACKEND_SERVER = process.env.DEV_PORT_BACKEND_SERVER || 5000;
export const PORT_FRONTEND_DEV_SERVER = process.env.DEV_PORT_FRONTEND_DEV_SERVER || 3001;

export const DEV = process.env.NODE_ENV === 'development';
export const VERBOSE = process.argv.includes('--verbose');
export const GLOBALS = {
  __DEV__: DEV,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.RELAY_ENDPOINT': JSON.stringify(
    process.env.RELAY_ENDPOINT || 'https://graphql-compose.herokuapp.com/northwind/'
  ),
};

export const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEV,

  stats: {
    colors: true,
    reasons: VERBOSE,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
    modules: VERBOSE,
  },

  plugins: [
    DEV ? new webpack.NoEmitOnErrorsPlugin() : null,
    new webpack.DefinePlugin(GLOBALS),
    DEV ? new webpack.NamedModulesPlugin() : null,
  ].filter(o => !!o),

  resolve: {
    extensions: ['.js', '.json'],
    alias: aliases,
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=1000',
      },
      {
        test: /\.(svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },
};

export function mergeConfig(extConfig) {
  let result = deepmerge({}, config);
  const plugins = result.plugins || [];
  delete result.plugins;

  result = deepmerge(result, extConfig);
  // combine plugins
  result.plugins = [...plugins, ...result.plugins];

  // combine rules
  result.module.rules = [
    ...((config.module || {}).rules || []),
    ...((extConfig.module || {}).rules || []),
  ];

  // clone all rules configs
  result = Object.assign({}, result, {
    module: Object.assign({}, result.module, {
      rules: result.module.rules.map(x => Object.assign({}, x)),
    }),
  });

  return result;
}
