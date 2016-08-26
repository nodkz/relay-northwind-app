// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles

import path from 'path';
import webpack from 'webpack';
import deepmerge from 'deepmerge';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

export const PORT = 3000;
export const PORT_BACKEND_SERVER = 5000;
export const PORT_FRONTEND_DEV_SERVER = 3001;

export const DEV = process.env.NODE_ENV === 'development';
export const VERBOSE = process.argv.includes('--verbose');
export const GLOBALS = {
  __DEV__: DEV,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
};


export const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEV,
  debug: DEV,

  stats: {
    colors: true,
    reasons: DEV,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    DEV ? new webpack.NoErrorsPlugin() : null,
    new webpack.DefinePlugin(GLOBALS),
    DEV ? new webpack.NamedModulesPlugin() : null,
  ].filter(o => !!o),

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../app/'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        happy: { id: 'js' },
        include: [
          path.resolve(__dirname, '../app'),
        ],
        loaders: [
          {
            loader: 'babel',
            query: {
              cacheDirectory: DEV
                ? path.join(__dirname, '../build/tmp/babel-cache/', process.env.NODE_ENV)
                : false,
              plugins: [
                DEV ? ['react-transform', {
                  transforms: [
                    {
                      transform: 'react-transform-catch-errors',
                      imports: ['react', 'redbox-react'],
                    },
                  ],
                }] : null,
                path.resolve(__dirname, './lib/babelRelayPlugin'),

                // improve production build,
                // see https://medium.com/doctolib-engineering/improve-react-performance-with-babel-16f1becfaa25
                !DEV ? 'transform-react-remove-prop-types' : null,
                !DEV ? 'transform-react-constant-elements' : null,
                !DEV ? 'transform-react-inline-elements' : null,
              ].filter(o => !!o),
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=1000',
      }, {
        test: /\.(svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
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
  result.plugins = [...plugins, ...result.plugins];

  result = Object.assign({}, result, {
    module: Object.assign({}, result.module, {
      loaders: result.module.loaders.map(x => Object.assign({}, x)),
    }),
  });

  return result;
}
