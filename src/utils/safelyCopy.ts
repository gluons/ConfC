import { copy, existsSync } from 'fs-extra';
import { basename, resolve } from 'path';

import askOverwrite from './askOverwrite';
import displayVerbose from './displayVerbose';

/**
 * Safely copy a file to current working directory.
 *
 * @export
 * @param {string} src Path to source file.
 * @param {CopyOptions} [options={ overwrite: false, verbose: false }] Copy options.
 * @returns {Promise<boolean>}
 */
export default async function safelyCopy(src: string, options: CopyOptions = { overwrite: false, verbose: false }): Promise<boolean> {
	if ((src.length > 0) && existsSync(src)) {
		let fileName = basename(src);
		let cwd = process.cwd();
		let dest = resolve(cwd, fileName);

		let copyWithVerbose = async (): Promise<boolean> => {
			await copy(src, dest, { overwrite: true });
			options.verbose && displayVerbose(src, dest); // Verbose
			return true;
		};

		if (existsSync(dest) && !options.overwrite) {
			/*
			 * Whem `dest` file already exist and force to overwrite is `false`, ask to overwrite.
			 * If user say yes, overwrite it.
			 */
			return (await askOverwrite(src, dest)) ? await copyWithVerbose() : false;
		} else {
			/*
			 * When no file at `dest` or it's forced to overwrite, just copy it.
			 */
			return await copyWithVerbose();
		}
	} else {
		throw new Error('Source file does not exist.');
	}
}
