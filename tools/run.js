import chalk from 'chalk';

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

async function run(fn, options) {
  const start = new Date();
  console.log(chalk.bold.yellow(`[${format(start)}] Starting '${fn.name}'...`));

  let result;
  let hasError = false;
  try {
    result = await fn(options);
  } catch (err) {
    console.log(chalk.bgRed.bold.white(`Failed '${fn.name}': ${err.message}`));
    console.error(err.stack);
    hasError = true;
  }

  const finish = new Date();
  const time = finish.getTime() - start.getTime();
  if (hasError) {
    console.log(
      chalk.bgRed.bold.white(`[${format(finish)}] Finished '${fn.name}' after ${time} ms`)
    );
  } else {
    console.log(chalk.bold.green(`[${format(finish)}] Finished '${fn.name}' after ${time} ms`));
  }
  return result;
}

if (
  (process.mainModule.children.length === 0 || // old Node <=7
    require.main === module) && // new Node >=7.x
  process.argv.length > 2
) {
  // eslint-disable-next-line no-underscore-dangle
  delete require.cache[__filename];

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const module = require(`./${process.argv[2]}.js`).default;

  run(module).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
}

export default run;
