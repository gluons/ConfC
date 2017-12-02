import { resolve } from 'path';

import * as pSeries from 'p-series';

import { safelyCopy } from '../utils';
import defaultConfig from './defaultConfig';

let defaultCopyOptions: CopyOptions = {
	overwrite: defaultConfig.overwrite,
	verbose: defaultConfig.verbose
};

/**
 * Copy all files from source path to current working directory.
 *
 * @export
 * @param {string[]} filenames Files name to copy.
 * @param {string} srcPath Path of source files.
 * @param {CopyOptions} [options=defaultCopyOptions] Copy options.
 * @returns {Promise<void>}
 */
export default async function copyFiles(filenames: string[], srcPath: string, options: CopyOptions = defaultCopyOptions): Promise<void> {
	if (filenames.length === 0) {
		throw new Error('No filenames given.');
	}
	if (srcPath.length === 0) {
		throw new Error('No source path.');
	}

	await pSeries(filenames.map(filename => {
		let src = resolve(srcPath, filename);
		return safelyCopy(src, options);
	}));
}
