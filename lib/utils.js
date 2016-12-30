'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const nvl = require('nvl');

/**
 * Prompt to overwrite.
 * @param  {String} src   Path to source
 * @param  {String} dest  Path to destination
 * @return {Promise}      Promise of overwrite result
 */
let prompt = function prompt(src, dest) {
	return inquirer.prompt([
		{
			type: 'confirm',
			name: 'overwrite',
			message: chalk.yellow(
				'Do you want to overwrite',
				`"${chalk.magenta(dest)}"`,
				'with',
				`"${chalk.green(src)}"?`
			),
			default: true
		}
	]).then(answers => answers.overwrite);
};

/**
 * Display verbose data.
 * @param  {String} src  Source path
 * @param  {String} dest Destination path
 */
let displayVerbose = function displayVerbose(src, dest) {
	console.log(chalk.green(
		'Copied',
		`"${chalk.cyan(src)}"`,
		'to',
		`"${chalk.cyan(dest)}".`
	));
};

/**
 * Copy file from source to current working directory.
 * @param  {String}  src                       Path to source
 * @param  {Object}  [options]                 Options
 * @param  {Boolean} [options.verbose=false]   Verbose output
 * @param  {Boolean} [options.overwrite=false] Force to overwrite
 * @return {Promise}                           Promise of copy result
 */
let copy = function copy(src, options) {
	options = nvl(options, {});
	options.verbose = nvl(options.verbose, false); // Verbose output
	options.overwrite = nvl(options.overwrite, false); // Force to overwrite

	return new Promise((resolve, reject) => {
		if (fs.existsSync(src)) {
			let fileName = path.basename(src);
			let dest = path.resolve(path.join(process.cwd(), fileName));

			if (fs.existsSync(dest) && !options.overwrite) {
				// Prompt to overwrite if found same name file at dest and force to overwrite is false.
				prompt(src, dest).then(overwrite => {
					if (overwrite) {
						try {
							fs.copySync(src, dest);
							if (options.verbose) {
								displayVerbose(src, dest);
							}
							resolve(true);
						} catch (err) {
							reject(err);
						}
					} else {
						resolve(false);
					}
				});
			} else {
				// Just copy to dest if no same name file at dest or force to overwrite is true.
				try {
					fs.copySync(src, dest);
					if (options.verbose) {
						displayVerbose(src, dest);
					}
					resolve(true);
				} catch (err) {
					reject(err);
				}
			}
		} else {
			resolve(false);
		}
	});
};

/**
 * Silently copy file from source to current working directory.
 * @param  {String}  src                       Path to source
 * @param  {Object}  [options]                 Options
 * @param  {Boolean} [options.overwrite=false] Force to overwrite
 * @return {Promise}                           Promise of copy result
 */
let silentlyCopy = function silentlyCopy(src, options) {
	options = nvl(options, {});
	options.overwrite = nvl(options.overwrite, false); // Force to overwrite

	return new Promise((resolve, reject) => {
		if (fs.existsSync(src)) {
			let fileName = path.basename(src);
			let dest = path.resolve(path.join(process.cwd(), fileName));
			let hasDest = fs.existsSync(dest);

			if ((hasDest && options.overwrite) || !hasDest) {
				// Copy to dest if force to overwrite is true or no file at dest.
				try {
					fs.copySync(src, dest);
					resolve(true);
				} catch (err) {
					reject(err);
				}
			} else {
				resolve(false);
			}
		} else {
			resolve(false);
		}
	});
};

module.exports = {
	prompt,
	copy,
	silentlyCopy
};
