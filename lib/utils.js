'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const nvl = require('nvl');

/**
 * Brighten chalk if on Windows by using `bold`.
 * @param  {Function} chalkFunc Original chalk function
 * @return {Function}           Bright chalk (if on Windows)
 */
let brightChalk = function brightChalk(chalkFunc) {
	return process.platform === 'win32' ? chalkFunc.bold : chalkFunc;
};

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
			message: brightChalk(chalk.yellow)(
				'Do you want to overwrite',
				`"${brightChalk(chalk.magenta)(dest)}"`,
				'with',
				`"${brightChalk(chalk.green)(src)}"?`
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
	console.log(brightChalk(chalk.green)(
		'Copied',
		`"${brightChalk(chalk.cyan)(src)}"`,
		'to',
		`"${brightChalk(chalk.cyan)(dest)}".`
	));
};

/**
 * Copy file from source to current working directory.
 * @param  {String}  src                       Path to source
 * @param  {Object}  [options]                 Options
 * @param  {Boolean} [options.overwrite=false] Force to overwrite
 * @param  {Boolean} [options.verbose=false]   Verbose output
 * @return {Promise}                           Promise of copy result
 */
let copy = function copy(src, options) {
	options = nvl(options, {});
	options.overwrite = nvl(options.overwrite, false); // Force to overwrite
	options.verbose = nvl(options.verbose, false); // Verbose output

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
 */
let silentlyCopy = function silentlyCopy(src, options) {
	options = nvl(options, {});
	options.overwrite = nvl(options.overwrite, false); // Force to overwrite

	if (fs.existsSync(src)) {
		let fileName = path.basename(src);
		let dest = path.resolve(path.join(process.cwd(), fileName));
		let hasDest = fs.existsSync(dest);

		if ((hasDest && options.overwrite) || !hasDest) {
			// Copy to dest if force to overwrite is true or no file at dest.
			try {
				fs.copySync(src, dest);
			} catch (err) {
				throw err;
			}
		}
	}
};

module.exports = {
	brightChalk,
	prompt,
	copy,
	silentlyCopy
};
