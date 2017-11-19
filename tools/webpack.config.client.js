// eslint-disable
//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { mergeConfig, DEV, VERBOSE } from './webpack.config.common.js';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

const clientConfig = mergeConfig({
  target: 'web',

  entry: {
    main: DEV
      ? [
          // `webpack-dev-server/client?http://0.0.0.0:${PORT_FRONTEND_DEV_SERVER}`,
          // 'webpack/hot/only-dev-server',
          require.resolve('react-dev-utils/webpackHotDevClient'),
          './src/client.js',
        ]
      : ['./src/client.js'],
    // css: ['css-loader'],
    vendor: [
      'babel-polyfill',
      'buffer',
      'core-js',
      'react',
      'react-dom',
      'react-relay',
      'react-relay-network-layer',
      'regenerator-runtime',
      'sockjs-client',
    ],
  },

  output: {
    path: path.join(__dirname, '../build', process.env.NODE_ENV),
    pathinfo: DEV,
    // filename [chunkhash] for PRODUCTION is important! But for DEV must be [hash]
    filename: DEV ? `[name].js?[hash]` : `[name]-[chunkhash].js`,
    chunkFilename: DEV ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    publicPath: DEV ? '/' : './',
    devtoolModuleFilenameTemplate: DEV
      ? info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
      : undefined,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              retainLines: DEV,
              forceEnv: DEV ? 'browser_development' : 'browser_production',
              // cacheDirectory: DEV
              //   ? path.join(__dirname, '../build/tmp/babel-cache-client/', process.env.NODE_ENV)
              //   : false,
            },
          },
        ],
      },
    ],
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  // devtool: DEV ? 'sourcemap' : false,
  // devtool: DEV ? 'cheap-module-eval-source-map' : 'source-map', // 2.2x performance! in watch mode
  // devtool: DEV ? '#eval-source-map' : false, // 2x performance! in dev watch mode
  // devtool: DEV ? 'cheap-module-source-map' : 'source-map',
  devtool: DEV ? 'eval' : 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./public/index.html'),
    }),
    DEV ? null : new webpack.optimize.ModuleConcatenationPlugin(),
    new AssetsPlugin({
      path: path.join(__dirname, '../build', process.env.NODE_ENV),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    // DO NOT CHANGE ORDER OF THIS PLUGINS
    // https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
    DEV ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(),
    //   chunk => {
    //   if (chunk.name) {
    //     return chunk.name;
    //   }
    //   return chunk.modules.map(m => path.relative(m.context, m.request)).join('_') || 'custom';
    // }
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'css',
    //   minChunks: Infinity,
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    {
      // The same as NameAllModulesPlugin
      // https://github.com/timse/name-all-modules-plugin/blob/master/index.js
      apply(compiler) {
        compiler.plugin('compilation', compilation => {
          compilation.plugin('before-module-ids', modules => {
            modules.forEach(module => {
              if (module.id !== null) {
                return;
              }
              module.id = module.identifier(); // eslint-disable-line
            });
          });
        });
      },
    },
    // END OF DO NOT CHANGE ORDER OF THIS PLUGINS
    DEV ? new webpack.HotModuleReplacementPlugin({ quiet: true }) : null,
    !DEV
      ? new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          minimize: true,
          compress: {
            screw_ie8: true,
            warnings: VERBOSE,
          },
        })
      : null,
    !DEV ? new webpack.optimize.AggressiveMergingPlugin() : null, // Merge chunks
    !DEV
      ? new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      : null,

    // Fix webpack error:
    // WARNING in /Volumes/npm_ram_disk/~/encoding/lib/iconv-loader.js
    // 9:12 Critical dependency: the request of a dependency is an expression
    new webpack.IgnorePlugin(/\/iconv-loader$/),
  ].filter(o => !!o),
});

export default clientConfig;
