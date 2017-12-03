import chalk from 'chalk';
import { prompt } from 'inquirer';

import isFilledArray from './isFilledArray';

const { green } = chalk;

/**
 * Ask to choose existent files to clone.
 *
 * @export
 * @param {string[]} existentFiles Existent files.
 * @returns {Promise<string[]>}
 */
export default async function askChooseFiles(
	existentFiles: string[]
): Promise<string[]> {
	let fileChoices = existentFiles.map(file => ({
		name: file,
		value: file,
		checked: true
	}));

	let answers = await prompt([
		{
			type: 'checkbox',
			name: 'chosenFiles',
			message: `Which files that you want to ${green('ConfC')}?`,
			choices: fileChoices
		}
	]);
	let chosenFiles: string[] = isFilledArray(answers.chosenFiles) ? answers.chosenFiles : [];

	return chosenFiles;
}
