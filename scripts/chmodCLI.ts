import { chmod } from 'fs';
import { resolve } from 'path';

/*
 * Add `executable` permission to CLI file when it isn't on Windows.
 */
if (process.platform !== 'win32') {
	const cliPath = resolve(__dirname, '../dist/cli.js');

	chmod(cliPath, '775', err => {
		if (err) {
			console.error(err);
		}
	});
}
