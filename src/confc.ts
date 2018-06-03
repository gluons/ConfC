import { resolve } from 'path';

import nvl = require('nvl');

import ConfCOptions from './types/ConfCOptions';
import Config from './types/Config';
import { loadConfig, silentlyCopy } from './utils';

/**
 * Check if the `obj` is `ConfCOptions`.
 *
 * @param {*} obj An object to check.
 * @returns {obj is ConfCOptions}
 */
function isConfCOptions(obj: any): obj is ConfCOptions {
	return (
		typeof obj === 'object' &&
		('path' in obj || 'cwd' in obj || 'overwrite' in obj)
	);
}

export { ConfCOptions };

/**
 * Clone configuration files to current working directory.
 *
 * @param {string[]} fileNames Files name to clone.
 * @param {ConfCOptions} [options] Options.
 * @returns {Promise<void>}
 */
async function confc(
	fileNames: string[],
	options?: ConfCOptions
): Promise<void>;
/**
 * Clone configuration files to current working directory.
 *
 * @param {ConfCOptions} [options] Options.
 * @returns {Promise<void>}
 */
async function confc(options?: ConfCOptions): Promise<void>;
async function confc(
	fileNamesOrOptions?: string[] | ConfCOptions,
	options?: ConfCOptions
): Promise<void> {
	// tslint:disable-next-line: only-arrow-functions space-before-function-paren
	const config: Config = (function() {
		if (isConfCOptions(fileNamesOrOptions) && fileNamesOrOptions.cwd) {
			return loadConfig(fileNamesOrOptions.cwd);
		} else if (options && options.cwd) {
			return loadConfig(options.cwd);
		} else {
			return loadConfig();
		}
	})();
	const defaultOptions: ConfCOptions = {
		path: config.path,
		cwd: process.cwd(),
		overwrite: config.overwrite
	};

	let fileNames: string[];
	let finalOptions: ConfCOptions;
	if (Array.isArray(fileNamesOrOptions)) {
		fileNames = fileNamesOrOptions;
		finalOptions = Object.assign(
			{},
			defaultOptions,
			nvl(options, defaultOptions)
		);
	} else if (isConfCOptions(fileNamesOrOptions)) {
		fileNames = config.files;
		finalOptions = Object.assign({}, defaultOptions, fileNamesOrOptions);
	} else {
		fileNames = config.files;
		finalOptions = defaultOptions;
	}

	let { path: srcPath, cwd, overwrite } = finalOptions;

	await Promise.all(
		fileNames.map(fileName => {
			let src = resolve(cwd, srcPath, fileName);
			return silentlyCopy(src, {
				cwd,
				overwrite
			});
		})
	);
}

export default confc;
module.exports = confc;
