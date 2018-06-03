/**
 * SilentlyCopy options.
 *
 * @export
 * @interface SilentlyCopyOptions
 */
export default interface SilentlyCopyOptions {
	/**
	 * Current working directory.
	 *
	 * @type {string}
	 * @memberof SilentlyCopyOptions
	 */
	cwd: string;
	/**
	 * Force to overwrite.
	 *
	 * @type {boolean}
	 * @memberof SilentlyCopyOptions
	 */
	overwrite: boolean;
}
