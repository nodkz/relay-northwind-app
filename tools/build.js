import webpack from 'webpack';
import run from './run';
import clean from './clean';
import ncp from 'ncp';
import path from 'path';
import clientConfig from './webpack.config.client.js';

process.env.NODE_ENV = 'production';


async function build() {
  await run(clean);
  await ncp(path.resolve(__dirname, '../public'), path.resolve(__dirname, `../build/${process.env.NODE_ENV}`));
  await run(bundle);
}

function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack([clientConfig]);
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
