import rc = require('rc');

import { defaultConfig } from '../lib';

/**
 * Load configuration. (with fallback)
 *
 * @export
 * @returns {Config}
 */
export default function loadConfig(): Config {
	let config: Config = rc('confc', defaultConfig);
	return config;
}
