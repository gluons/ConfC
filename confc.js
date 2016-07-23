'use strict';
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const utils = require('./lib/utils');

const home = process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME;

const defaultConf = {
	path: home,
	files: yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'files.yaml'), 'utf8')),
	extendedFiles: [],
	verbose: false
};
const config = require('rc')('confc', defaultConf);

// Initialize export module.
module.exports = {};

Object.defineProperty(module.exports, 'config', {
	value: config,
	writable: false,
	enumerable: true,
	configurable: false
});

/**
 * Copy config files to current working directory.
 * @param  {String[]} fileNames - File names to copy.
 * @return {Promise} Promise of copying.
 */
var copyConf = (fileNames) => {
	return new Promise(function(resolve, reject) {
		// If no file names, immediately resolve.
		if (!fileNames || (Array.isArray(fileNames) && fileNames.length == 0)) {
			resolve();
		}
		let doneCount = 0; // Completed file name counter.
		let errors = []; // List of error.
		for (let fileName of fileNames) {
			let srcPath = path.resolve(path.join(config.path, fileName));
			let destPath = path.resolve(path.join(process.cwd(), fileName));
			try {
				fs.accessSync(srcPath, fs.constants.F_OK | fs.constants.R_OK);
				if (config.verbose) {
					utils.displayVerbose(srcPath, destPath);
				}
				utils.copy(srcPath, destPath).then(
					() => { // Fulfilled
						doneCount++;
						if (doneCount == fileNames.length) {
							resolve();
						}
					},
					(err) => { // Rejected
						doneCount++;
						errors.push(err);
						if (doneCount == fileNames.length) {
							reject(errors);
						}
					}
				);
			} catch (err) {
				doneCount++; // Ignore non-existent file. Skip it.
			}
		}
	});
};
Object.defineProperty(module.exports, 'copy', {
	value: copyConf,
	writable: false,
	enumerable: false,
	configurable: false
});

/**
 * Copy all files in config to current working directory.
 * @return {Promise} Promise of copying all.
 */
var copyAll = () => {
	let errors = [];
	let promises = [
		copyConf(config.files).catch((e) => {
			errors = errors.concat(e);
		}),
		copyConf(config.extendedFiles).catch((e) => {
			errors = errors.concat(e);
		})
	];
	return Promise.all(promises).then(() => {
		if (errors.length > 0) {
			return Promise.reject(errors);
		} else {
			return Promise.resolve();
		}
	});
};
Object.defineProperty(module.exports, 'copyAll', {
	value: copyAll,
	writable: false,
	enumerable: true,
	configurable: false
});

// Utils functions.
Object.defineProperty(module.exports, 'utils', {
	value: {},
	writable: false,
	enumerable: true,
	configurable: false
});
Object.defineProperty(module.exports.utils, 'displayError', {
	value: utils.displayError,
	writable: false,
	enumerable: true,
	configurable: false
});
Object.defineProperty(module.exports.utils, 'displayErrors', {
	value: utils.displayErrors,
	writable: false,
	enumerable: true,
	configurable: false
});
