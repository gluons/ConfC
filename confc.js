'use strict';

const fs = require('fs-extra');
const path = require('path');
const nvl = require('nvl');
const rc = require('rc');
const sequential = require('promise-sequential');
const yaml = require('js-yaml');

const utils = require('./lib/utils');

// Home path
const home = process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME;

// Default files name
const defaultFiles = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'files.yaml'), 'utf8'));

// Configurations
const defaultConf = {
	path: home, // Config files path
	files: defaultFiles, // Files name
	overwrite: false, // Force to overwrite
	verbose: false // Output verbose
};

let copy = function copy(fileNames, options) {
	let config = rc('confc', defaultConf); // Load configs from rc file

	fileNames = nvl(fileNames, config.files); // Files name to copy
	if (!Array.isArray(fileNames) && (typeof fileNames === 'object')) {
		options = fileNames;
		fileNames = config.files;
	}
	options = nvl(options, {});
	options.path = nvl(options.path, config.path); // Config files path
	options.overwrite = nvl(options.overwrite, config.overwrite); // Force to overwrite

	if (Array.isArray(fileNames) && (fileNames.length > 0)) {
		return sequential(fileNames.map(fileName => function () {
			let src = path.resolve(path.join(options.path, fileName));
			return utils.silentlyCopy(src, {
				overwrite: options.overwrite
			});
		}));
	} else {
		return Promise.resolve();
	}
};

const confc = {
	copy
};

module.exports = confc;
