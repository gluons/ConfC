'use strict';

const path = require('path');
const nvl = require('nvl');
const sequential = require('promise-sequential');

const defaultConfig = require('./defaultConfig'); // Default configurations
const utils = require('./utils');

/**
 * Copy config files to current working directory with CLI interface.
 * @param  {Array.<String>} fileNames         Files name to copy
 * @param  {String}         sourcePath        Path to config files
 * @param  {Object}         options           Options
 * @param  {Boolean}        options.overwrite Force to overwrite
 * @param  {Boolean}        options.verbose   Verbose output
 * @return {Promise}                          Promise of copy result
 */
const copyFiles = function copyFiles(fileNames, sourcePath, options) {
	options = nvl(options, {});
	/*
		This function is called by external.
		Do not fallback to local configs.
		Just fallback to default configs.
	 */
	options.overwrite = nvl(options.overwrite, defaultConfig.overwrite); // Force to overwrite
	options.verbose = nvl(options.verbose, defaultConfig.verbose); // Verbose output

	if ((Array.isArray(fileNames) && (fileNames.length > 0)) && ((typeof sourcePath === 'string') && sourcePath.length > 0)) {
		return sequential(fileNames.map(fileName => {
			return function () {
				let src = path.resolve(path.join(sourcePath, fileName));
				return utils.copy(src, options);
			};
		}));
	} else {
		return Promise.reject(new Error('No fileNames or sourcePath.'));
	}
};

module.exports = copyFiles;
