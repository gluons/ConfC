import { existsSync, lstatSync } from 'fs-extra';

/**
 * Check if a given path is symlink.
 *
 * @export
 * @param {string} path File path.
 * @returns {boolean}
 */
export default function isSymlink(path: string): boolean {
	if (existsSync(path)) {
		let stats = lstatSync(path);
		return stats.isSymbolicLink();
	} else {
		return false;
	}
}
