'use strict';

const path = require('path');
const nvl = require('nvl');
const rc = require('rc');
const sequential = require('promise-sequential');

const utils = require('./lib/utils');

const defaultConfig = require('./lib/defaultConfig'); // Default configurations

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

	if (Array.isArray(fileNames) && (fileNames.length > 0)) {
		return sequential(fileNames.map(fileName => {
			return function () {
				let src = path.resolve(path.join(options.path, fileName));
				return utils.silentlyCopy(src, {
					overwrite: options.overwrite
				});
			};
		}));
	} else {
		return Promise.resolve();
	}
};

module.exports = confc;
