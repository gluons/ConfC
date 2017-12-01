import chalk from 'chalk';
import { prompt } from 'inquirer';

const { yellow, magenta, green } = chalk;

/**
 * Ask to overwrite `dest` file with `src` file.
 *
 * @export
 * @param {string} src Path to source file.
 * @param {string} dest Path to destination file.
 * @returns {Promise<boolean>}
 */
export default async function askOverwrite(src: string, dest: string): Promise<boolean> {
	let answers = await prompt([
		{
			type: 'confirm',
			name: 'overwrite',
			message: yellow(`Do you want to overwrite "${magenta(dest)}" with "${green(src)}"`),
			default: true
		}
	]);
	let overwrite: boolean = answers.overwrite;

	return overwrite;
}
