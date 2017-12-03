import { resolve } from 'path';

import chalk from 'chalk';
import del = require('del');

const rootDir = resolve(__dirname, '../');
const delOptions = {
	cwd: rootDir
};

Promise.all([
	del(['test/fixtures/cli/*', '!test/fixtures/cli/.confcrc'], delOptions),
	del(['test/fixtures/node/*', '!test/fixtures/node/.confcrc'], delOptions)
])
	.then(() => {
		console.log(chalk.green('Tests cleaned.'));
	})
	.catch(err => {
		console.error(err);
	});
