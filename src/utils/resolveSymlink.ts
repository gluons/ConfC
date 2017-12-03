import { readlinkSync } from 'fs-extra';

import isSymlink from './isSymlink';

/**
 * Resolve a symlink to get real path. (Return the given path if it isn't symlink)
 *
 * @export
 * @param {string} path File path.
 * @returns {string}
 */
export default function resolveSymlink(path: string): string {
	if (isSymlink(path)) {
		return readlinkSync(path);
	} else {
		return path;
	}
}
