'use strict';

const fs = require('fs');
const path = require('path');
const nvl = require('nvl');
const rc = require('rc');

const utils = require('./lib/utils');

const defaultConfig = require('./lib/defaultConfig'); // Default configurations

/**
 * Clone configuration files to current working directory.
 * @param  {Array.<String>} fileNames           Files name to copy
 * @param  {Object}         [options]           Options
 * @param  {String}         [options.path]      Path to configuration files
 * @param  {Boolean}        [options.overwrite] Force to overwrite
 * @return {Boolean|Error}                      Result of cloning
 */
const confc = function confc(fileNames, options) {
	let config = rc('confc', defaultConfig); // Load configs from rc file

	fileNames = nvl(fileNames, config.files); // Files name to copy
	if (!Array.isArray(fileNames) && (typeof fileNames === 'object')) {
		options = fileNames;
		fileNames = config.files;
	}
	options = nvl(options, {});
	options.path = nvl(options.path, config.path); // Config files path
	options.overwrite = nvl(options.overwrite, config.overwrite); // Force to overwrite

	if (Array.isArray(fileNames) && (fileNames.length > 0) && fs.existsSync(options.path)) {
		try {
			for (let fileName of fileNames) {
				let src = path.resolve(path.join(options.path, fileName));
				utils.silentlyCopy(src, {
					overwrite: options.overwrite
				});
			}
			return true;
		} catch (err) {
			return err;
		}
	} else {
		return false;
	}
};

module.exports = confc;
