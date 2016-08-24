const getBabelRelayPlugin = require('babel-relay-plugin');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const schemaPath = path.resolve(__dirname, '../../schema.graphql.json');
let schema;

try {
  fs.accessSync(schemaPath, fs.F_OK);
  schema = require(schemaPath);
} catch (e) {
  schema = null;
  console.log(chalk.white.bgRed.bold(`Babel Relay Plugin: Cannot resolve GraphQL Schema from file ${schemaPath}`));
}

const emptyPlugin = () => ({});
const plugin = schema ? getBabelRelayPlugin(schema.data) : emptyPlugin;

module.exports = plugin;
