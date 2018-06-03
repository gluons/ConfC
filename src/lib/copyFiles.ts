import { resolve } from 'path';

import pSeries = require('p-series');

import CopyOptions from '../types/CopyOptions';
import { safelyCopy } from '../utils';
import defaultConfig from './defaultConfig';

const defaultCopyOptions: CopyOptions = {
	overwrite: defaultConfig.overwrite,
	verbose: defaultConfig.verbose
};

/**
 * Copy all files from source path to current working directory.
 *
 * @export
 * @param {string[]} fileNames Files name to copy.
 * @param {string} srcPath Path of source files.
 * @param {CopyOptions} [options=defaultCopyOptions] Copy options.
 * @returns {Promise<void>}
 */
export default async function copyFiles(
	fileNames: string[],
	srcPath: string,
	options: CopyOptions = defaultCopyOptions
): Promise<void> {
	if (fileNames.length === 0) {
		throw new Error('No filenames given.');
	}
	if (srcPath.length === 0) {
		throw new Error('No source path.');
	}

	await pSeries(
		fileNames.map(fileName => {
			let src = resolve(srcPath, fileName);
			return () => safelyCopy(src, options);
		})
	);
}
