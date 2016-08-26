import del from 'del';
import mkdirp from 'mkdirp';

const env = process.env.NODE_ENV || 'development';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await del(
    [
      `build/${env}/*`,
      '!build/.git', `!build/${env}/node_modules`,
    ],
    { dot: true }
  );
}

mkdirp.sync(`build/${env}`);

export default clean;
