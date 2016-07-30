'use strict';

const description = 'Clone your default configuration files to current working directory.';

const argv = require('yargs')
			.version()
			.alias('version', 'V')
			.usage(`Usage: confc [options] [filename..]\n\n${description}`)
			.string('p')
			.alias('p', 'path')
			.describe('p', 'Path to default configuration files.')
			.boolean('v')
			.alias('v', 'verbose')
			.describe('v', 'Display more information.')
			.help('h')
			.alias('h', 'help')
			.example('confc')
			.example('confc .eslintrc.json')
			.example('confc --path $home .editorconfig')
			.argv;

const confc = require('./');

var files = argv._;

if ((typeof argv.path === 'string') && (argv.path.length > 0)) {
	confc.config.path = argv.path;
}

confc.config.verbose = argv.verbose;

if (Array.isArray(files) && (files.length > 0)) {
	confc.copy(files).catch((errors) => {
		confc.utils.displayErrors(errors);
	});
} else {
	confc.copyAll().catch((errors) => {
		confc.utils.displayErrors(errors);
	});
}
