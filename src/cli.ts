#!/usr/bin/env node

import { existsSync } from 'fs';
import { EOL } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';
import { prompt } from 'inquirer';
import pWaterfall = require('p-waterfall');
import yargs = require('yargs');

import { copyFiles, defaultConfig } from './lib';
import { askChooseFiles, loadConfig } from './utils';

const { cyan, green } = chalk;

const confcName = green('confc');
const description = cyan('Clone your default configuration files to current working directory.');
const aww = '(｡◕‿◕｡)';

const config: Config = loadConfig();

const argv = yargs
	.config(config)
	.help()
	.alias('help', 'h')
	.version()
	.alias('version', 'V')
	.usage(`Usage: ${confcName} [options] [filenames...]${EOL + EOL + description}`)
	.option('path', {
		alias: 'p',
		type: 'string',
		desc: 'Path to configuration files',
		default: defaultConfig.path,
		defaultDescription: '$HOME'
	})
	.option('overwrite', {
		alias: 'f',
		type: 'boolean',
		desc: 'Force to overwrite',
		default: false
	})
	.option('verbose', {
		alias: 'v',
		type: 'boolean',
		desc: 'Display more information',
		default: false
	})
	.example(confcName, chalk`Clone default files from your {bold home path} to {bold current working directory}`)
	.example(`${confcName} .eslintrc.json .editorconfig`, chalk`Clone {yellow .eslintrc.json} and {yellow .editorconfig} from your {bold home path} to {bold current working directory}`)
	.example(`${confcName} --path ./myConfigs/ .editorconfig`, chalk`Clone {yellow .editorconfig} from {magenta.bold ./myConfigs/} directory to {bold current working directory}`)
	.argv;

let srcPath: string = argv.path;
let files: string[] = argv._;
let overwrite: boolean = argv.overwrite;
let verbose: boolean = argv.verbose;

files = Array.isArray(files) && (files.length === 0) ? config.files : files; // Use default files when no files given.

let existentFiles = files.filter(file => existsSync(resolve(srcPath, file))); // Get only existent files.

pWaterfall(
	[
		(initialValues: string[]) => askChooseFiles(initialValues),
		(chosenFiles: string[]) => copyFiles(chosenFiles, srcPath, { overwrite, verbose })
	],
	existentFiles
)
	.then(() => {
		console.log(`${EOL + green('ConfC completed.')} ${aww}`);
	})
	.catch(err => {
		console.error(err);
	});
