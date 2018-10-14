#!/usr/bin/env node

import { existsSync } from 'fs';
import { EOL } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';
import pWaterfall from 'p-waterfall';
import updateNotifier from 'update-notifier';
import yargs from 'yargs';

import { copyFiles, defaultConfig } from './lib';
import Config from './types/Config';
import { askChooseFiles, isFilledArray, loadConfig } from './utils';

const { cyan, green } = chalk;

const pkg = require('../package.json');
const confcName = green('confc');
const description = cyan(
	'Clone your default configuration files to current working directory.'
);
const aww = '(｡◕‿◕｡)';

const config: Config = loadConfig();

updateNotifier({ pkg }); // Update notification

const argv = yargs
	.config(config)
	.help()
	.alias('help', 'h')
	.version()
	.alias('version', 'V')
	.usage(
		`Usage: ${confcName} [options] [filenames...]${EOL + EOL + description}`
	)
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
	.option('yes', {
		alias: 'y',
		type: 'boolean',
		desc: `Say ${green('yes')} without inquiry`
	})
	.option('verbose', {
		alias: 'v',
		type: 'boolean',
		desc: 'Display more information',
		default: false
	})
	.example(
		confcName,
		chalk`Clone default files from your {bold home path} to {bold current working directory}`
	)
	.example(
		`${confcName} .eslintrc.json .editorconfig`,
		chalk`Clone {yellow .eslintrc.json} and {yellow .editorconfig} from your {bold home path} to {bold current working directory}`
	)
	.example(
		`${confcName} --path ./myConfigs/ .editorconfig`,
		chalk`Clone {yellow .editorconfig} from {magenta.bold ./myConfigs/} directory to {bold current working directory}`
	).argv;

let srcPath: string = argv.path;
let files: string[] = argv._;
let yes: boolean = argv.yes;
let overwrite: boolean = argv.overwrite;
let verbose: boolean = argv.verbose;

files = isFilledArray(files) ? files : config.files; // Use default files when no files given.

let existentFiles = files.filter(file => existsSync(resolve(srcPath, file))); // Get only existent files.

pWaterfall(
	[
		(initialValues: string[]) => (yes ? initialValues : askChooseFiles(initialValues)),
		async (chosenFiles: string[]) => {
			if (isFilledArray(chosenFiles)) {
				await copyFiles(chosenFiles, srcPath, { overwrite, verbose });
				return true;
			} else {
				return false;
			}
		}
	],
	existentFiles
)
	.then((result: boolean) => {
		result && console.log(`${EOL + green('ConfC completed.')} ${aww}`);
	})
	.catch(err => {
		console.error(err);
	});
