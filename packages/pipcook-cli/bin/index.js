#!/usr/bin/env node
const semver = require('semver');
const chalk = require('chalk');
const pkg = require('../package.json');
const program = require('commander');
const init = require('../lib/init');
const log = require('../lib/log');
const board = require('../lib/board');
const start = require('../lib/start');
const devPlugin = require('../lib/devPlugin');
const dataset = require('../lib/dataset');

// check node version
if (!semver.gte(process.version, '10.0.0')) {
  console.log(
    chalk.red(
      `Pipcook requires node version higher than node 10.x. Howeverm your kicak node version is ${process.version}, ` +
      'Please update node.js'
    )
  );
  return;
}

// version
program.version(pkg.version, '-v, --version').usage('<command> [options]');

// init the pipcook project workspace
program
  .command('init')
  .option('-c, --client', 'npm client')
  .description('Init the Pipcook project')
  .action((dir, cmdObj) => {
    init(cmdObj);
  });

// start the pipeline. Actually same as node xxx at current stage
program
  .command('start [fileName]')
  .description('start pipeline in specified file or run index.js by default')
  .action((fileName) => {
    start(fileName);
  });

// print out basic logs
program
  .command('log')
  .description('Print out Pipcook log')
  .action(log);

program
  .command('board')
  .option('-p, --plugin', 'customized ui plugin')
  .description('Start Pipcook Board')
  .action((stop, cmdObj) => {
    board(stop, cmdObj.plugin);
  });

program
  .command('plugin-dev')
  .option('-t, --type', 'plugin type')
  .option('-n, --name', 'project name')
  .description('initialize plugin development environment')
  .action((dir, cmdObj) => {
    devPlugin(cmdObj);
  });

program
  .command('dataset')
  .option('-t, --type', 'action type')
  .description('type of action you want to do on dataset')
  .action((dir, cmdObj) => {
    dataset(cmdObj);
  });

program.parse(process.argv);