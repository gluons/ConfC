import rc from 'rc';

import { defaultConfig } from '../lib';
import Config from '../types/Config';

/**
 * Load configuration. (with fallback)
 *
 * @export
 * @param {string} [cwd] Current working directory.
 * @returns {Config}
 */
export default function loadConfig(cwd?: string): Config {
	let originalCwd: string;
	// Switch to given `cwd` before get config.
	if (cwd) {
		originalCwd = process.cwd();
		process.chdir(cwd);
	}

	let config: Config = rc('confc', defaultConfig);

	originalCwd && process.chdir(originalCwd); // Switch back to original `cwd`.

	return config;
}
