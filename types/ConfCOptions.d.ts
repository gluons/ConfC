/**
 * ConfC's options.
 *
 * @interface ConfCOptions
 */
interface ConfCOptions {
	/**
	 * Path to configuration files.
	 *
	 * @type {string}
	 * @memberof ConfCOptions
	 */
	path?: string;
	/**
	 * Current working directory.
	 *
	 * @type {string}
	 * @memberof ConfCOptions
	 */
	cwd?: string;
	/**
	 * Force to overwrite.
	 *
	 * @type {boolean}
	 * @memberof ConfCOptions
	 */
	overwrite?: boolean;
}
