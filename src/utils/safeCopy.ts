/// <reference path="../../types/Config.d.ts" />

import askOverwrite from './askOverwrite';
import displayVerbose from './displayVerbose';

/**
 * Safe Copy's options.
 *
 * @export
 * @interface SafeCopyOptions
 */
export interface SafeCopyOptions {
	/**
	 * Force to overwrite.
	 *
	 * @type {boolean}
	 * @memberof SafeCopyOptions
	 */
	overwrite: boolean;
	/**
	 * Display verbose information.
	 *
	 * @type {boolean}
	 * @memberof SafeCopyOptions
	 */
	verbose: boolean;
}

export default async function safeCopy(src: string, options: SafeCopyOptions = { overwrite: false, verbose: false }): Promise<boolean> {
	return true;
}
