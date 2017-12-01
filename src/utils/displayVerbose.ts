import chalk from 'chalk';

const { green, cyan } = chalk;

/**
 * Display verbose information.
 *
 * @export
 * @param {string} src Source path.
 * @param {string} dest Destination path.
 */
export default function displayVerbose(src: string, dest: string): void {
	console.log(green(`Copied "${cyan(src)}" to "${cyan(dest)}".`));
}
