import { copy, existsSync } from 'fs-extra';
import { basename, resolve } from 'path';

import SilentlyCopyOptions from '../types/SilentlyCopyOptions';
import { resolveSymlink } from './';

/**
 * Silently copy a file to current working directory.
 *
 * @export
 * @param {string} src Path to source file.
 * @param {SilentlyCopyOptions} [options={ overwrite: false }] Copy options.
 * @returns {Promise<void>}
 */
export default async function silentlyCopy(
	src: string,
	options: SilentlyCopyOptions = { cwd: process.cwd(), overwrite: false }
): Promise<void> {
	if (src.length > 0 && existsSync(src)) {
		src = resolveSymlink(src);
		let fileName = basename(src);
		let dest = resolve(options.cwd, fileName);
		let hasDest = existsSync(dest);

		if ((hasDest && options.overwrite) || !hasDest) {
			await copy(src, dest, { overwrite: true });
		}
	}
}
