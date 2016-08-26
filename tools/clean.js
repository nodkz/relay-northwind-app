import del from 'del';

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

export default clean;
