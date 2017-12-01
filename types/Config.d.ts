/**
 * ConfC's configuration.
 *
 * @interface Config
 */
interface Config {
	/**
	 * Path to the directory that contain your default configuration files.
	 *
	 * @type {string}
	 * @memberof Config
	 */
	path: string;
	/**
	 * List of files name that you want to clone.
	 *
	 * @type {string[]}
	 * @memberof Config
	 */
	files: string[];
	/**
	 * Force to overwrite files if it exist.
	 *
	 * @type {boolean}
	 * @memberof Config
	 */
	overwrite: boolean;
	/**
	 * Display verbose output.
	 *
	 * @type {boolean}
	 * @memberof Config
	 */
	verbose: boolean;
}
