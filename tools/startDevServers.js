/* eslint no-param-reassign: [2, { "props": false }] */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import proxy from 'http-proxy-middleware';
import path from 'path';
import chalk from 'chalk';
import open from 'open';
import { spawn } from 'child_process';
import jsonfile from 'jsonfile';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware';
import { PORT, PORT_FRONTEND_DEV_SERVER } from './webpack.config.common.js';
// import serverConfig from './webpack.config.server.js';
// import backendNodemon from './backendNodemon';
import clientConfig from './webpack.config.client.js';
import run from './run';

let supervisor;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
export default async function startDevServers() {
  const cleanExit = function() {
    if (supervisor) {
      // remove all nodemon listeners, to avoid restart child server
      supervisor.removeAllListeners();
    }
    process.exit();
  };
  process.on('SIGINT', cleanExit); // catch ctrl-c
  process.on('SIGTERM', cleanExit); // catch kill

  jsonfile.spaces = 2;
  jsonfile.writeFile('./build/webpack.client.json', clientConfig, () => {});

  const bundler = webpack([clientConfig]);
  await run(frontendServer, bundler.compilers[0]);
  await run(commmonDevServer);
  startRelayWatcher();
}

function frontendServer(compiler) {
  return new Promise(resolve => {
    const devServer = new WebpackDevServer(compiler, {
      publicPath: clientConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      stats: clientConfig.stats,
      disableHostCheck: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
      },
      compress: true,
      overlay: false,
      setup(app) {
        app.use(errorOverlayMiddleware());
        app.use(noopServiceWorkerMiddleware());
      },
    });

    devServer.listen(PORT_FRONTEND_DEV_SERVER, 'localhost');
    compiler.plugin('done', resolve);
    process.on('exit', () => {
      if (devServer) {
        devServer.close();
      }
    });
  });
}

function commmonDevServer() {
  const httpFrontTarget = `http://127.0.0.1:${PORT_FRONTEND_DEV_SERVER}`;
  return new Promise((resolve, reject) => {
    const devCommonProxy = express();
    devCommonProxy.use(express.static(path.resolve(__dirname, '../public'), { index: false }));
    devCommonProxy.use(
      proxy(['/sockjs-node', '/__webpack_dev_server__', '/__open-stack-frame-in-editor'], {
        target: httpFrontTarget,
        ws: true,
      })
    );
    devCommonProxy.use(proxy(httpFrontTarget));
    const http = devCommonProxy.listen(PORT, () => {
      resolve();
      const serverUrl = `http://127.0.0.1:${PORT}`;
      console.log(chalk.bgGreen.bold(`Development server started at ${serverUrl}`));
      open(serverUrl);
    });
    http.on('error', reject);
  });
}

function startRelayWatcher() {
  let handleErr = e => {
    console.error('Relay Watcher was exited!');
    if (e) console.error(e);
  };
  const childProcess = spawn('yarn', ['relay', '--', '--watch'], {
    stdio: ['ignore', 1, 2],
    cwd: path.resolve(__dirname, '../'),
  });
  childProcess.on('close', () => handleErr());
  childProcess.on('error', e => handleErr(e));
  process.on('exit', () => {
    handleErr = () => {};
    if (childProcess) childProcess.kill();
  });
}
