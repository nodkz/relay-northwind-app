function noop() {}

function GraphQLRegeneratePlugin(options) {
  const opts = options || {};

  this.fileMaskRegexp = opts.fileMaskRegexp || /(\/_schema\/|\/app\/schema\.js)/i;
  this.buildFunc = opts.buildFunc
    || (() => { console.log('Error: webpack-graphql-plugin does not received buildFunc.'); });

  this.lastBuildTimestamp = Date.now();

  this.isNeededFile = (filepath) => this.fileMaskRegexp.test(filepath);

  this.needRebuild = (fileTimestamps, contextTimestamps) => {
    let timestamp = 0;
    let filepath = '';
    let ts = 0;
    Object.keys(fileTimestamps).filter(this.isNeededFile).forEach(file => {
      ts = fileTimestamps[file];
      if (!ts) timestamp = Infinity;
      if (ts > timestamp) { timestamp = ts; filepath = file; }
    });
    Object.keys(contextTimestamps).filter(this.isNeededFile).forEach(context => {
      ts = contextTimestamps[context];
      if (!ts) timestamp = Infinity;
      if (ts > timestamp) { timestamp = ts; filepath = context; }
    });

    if (timestamp > this.lastBuildTimestamp) {
      this.lastBuildTimestamp = Date.now();
      console.log(`Rebuild GraphQL schema: (due file change ${filepath})`);
      return true;
    }

    return false;
  };
}

GraphQLRegeneratePlugin.prototype.done = function done(stats) {
  if (this.needRebuild(stats.compilation.fileTimestamps, stats.compilation.contextTimestamps)) {
    this.buildFunc();
  }
};


GraphQLRegeneratePlugin.prototype.apply = function apply(compiler) {
  this.compiler = compiler;
  compiler.plugin('done', this.done.bind(this));
  // compiler.plugin('failed', this.failed.bind(this));
};

module.exports = GraphQLRegeneratePlugin;
