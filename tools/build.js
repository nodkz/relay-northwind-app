import webpack from 'webpack';
import run from './run';
import clean from './clean';
import copy from './copy';
import generateSchema from './generateSchema';
import serverConfig from './webpack.config.server.js';
import clientConfig from './webpack.config.client.js';

process.env.NODE_ENV = 'production';

async function build() {
  await run(clean);
  await run(copy);
  await run(generateSchema);
  await run(bundle);
}

function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack([clientConfig, serverConfig]);
    bundler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(clientConfig.stats));
      resolve();
    });
  });
}

export default build;
