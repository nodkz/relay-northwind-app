// eslint-disable
//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

import path from 'path';
import webpack from 'webpack';
import {
  mergeConfig,
  DEV,
  VERBOSE,
  PORT_FRONTEND_DEV_SERVER,
} from './webpack.config.common.js';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';


const clientConfig = mergeConfig({
  target: 'web',

  entry: DEV ? [
    'react-hot-loader/patch', // see https://github.com/webpack/webpack.io/pull/64/commits/69fccee7e8ec9924573766e4d254d55706b5e11c#r73804882
    `webpack-dev-server/client?http://0.0.0.0:${PORT_FRONTEND_DEV_SERVER}`,
    'webpack/hot/only-dev-server',
    './app/client.js',
  ] : [
    './app/client.js',
  ],

  output: {
    path: path.join(__dirname, '../build', process.env.NODE_ENV),
    // filename: DEV ? '[name].js?[hash]' : '[name].[hash].js',
    filename: '[name].js?[hash]',
    publicPath: '/',
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  // devtool: DEV ? 'sourcemap' : false,
  // devtool: DEV ? 'cheap-module-eval-source-map' : 'source-map', // 2.2x performance! in watch mode
  // devtool: DEV ? '#eval-source-map' : false, // 2x performance! in dev watch mode
  devtool: DEV ? 'eval' : 'source-map',

  plugins: [
    DEV ? new webpack.HotModuleReplacementPlugin({ quiet: true }) : null,
    !DEV ? new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: VERBOSE,
      },
    }) : null,
    !DEV ? new webpack.optimize.AggressiveMergingPlugin() : null,

    // Fix webpack error:
    // WARNING in /Volumes/npm_ram_disk/~/encoding/lib/iconv-loader.js
    // 9:12 Critical dependency: the request of a dependency is an expression
    new webpack.IgnorePlugin(/\/iconv-loader$/),
  ].filter(o => !!o),
});

export default clientConfig;
