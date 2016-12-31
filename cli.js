'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const rc = require('rc');

const copyFiles = require('./lib/copyFiles');

const defaultConfig = require('./lib/defaultConfig'); // Default configurations
const config = rc('confc', defaultConfig); // Load configs from rc file

const confcName = chalk.green('confc');
const description = chalk.cyan('Clone your default configuration files to current working directory.');

const argv = require('yargs')
			.config(config)
			.version()
			.alias('version', 'V')
			.usage(`Usage: ${confcName} [options] [filename..]\n\n${description}`)
			.string('p')
			.alias('p', 'path')
			.describe('p', 'Path to configuration files')
			.default('p', defaultConfig.path, '$HOME')
			.boolean('f')
			.alias('f', 'overwrite')
			.default('f', defaultConfig.overwrite)
			.describe('f', 'Force to overwrite')
			.boolean('v')
			.alias('v', 'verbose')
			.default('v', defaultConfig.verbose)
			.describe('v', 'Display more information')
			.help('h')
			.alias('h', 'help')
			.example(confcName)
			.example(`${confcName} .eslintrc.json .editorconfig`)
			.example(`${confcName} --path ./myConfigs/ .editorconfig`)
			.argv;

let files = argv._;

if (Array.isArray(files) && (files.length == 0)) {
	files = config.files;
}

let existentFiles = files
	.filter(file => {
		let filePath = path.resolve(path.join(argv.path, file));
		return fs.existsSync(filePath);
	})
	.map(file => {
		return {
			name: file,
			checked: true
		};
	});

// Prompt to select existent files to copy
inquirer.prompt([
	{
		type: 'checkbox',
		name: 'selectedFiles',
		message: `Which files that you want to ${chalk.green('ConfC')}?`,
		choices: existentFiles
	}
]).then(answers => {
	if (Array.isArray(answers.selectedFiles) && (answers.selectedFiles.length > 0)) {
		let selectedFiles = answers.selectedFiles;
		// Copy selected files
		return copyFiles(selectedFiles, argv.path, {
			overwrite: argv.overwrite,
			verbose: argv.verbose
		});
	} else {
		return Promise.resolve(false);
	}
}).then(
	() => {
		console.log(`${chalk.bold.green('\nConfC completed.')} 🎉`);
	},
	err => {
		console.error(err);
	}
);
