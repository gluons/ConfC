'use strict';
const program = require('commander');

const packageInfo = require('./package.json');

const confc = require('./');

var files;

program
	.version(packageInfo.version)
	.usage(`[options] [filename ...]`)
	.description(`Clone your default configurations to current working directory.`)
	.arguments(`[fileNames...]`)
	.action((fileNames) => {
		if (typeof fileNames !== 'undefined') {
			files = fileNames;
		}
	})
	.option(`-p, --path [path]`, `Path to default configuration files.`, (p) => p.replace(/"|'/g, ''))
	.option(`-v, --verbose`, `Display more information.`)
	.parse(process.argv);

if (typeof program.path === 'string') {
	confc.config.path = program.path;
}
if (program.verbose) {
	confc.config.verbose = true;
}
if (Array.isArray(files) && (files.length > 0)) {
	confc.copy(files).catch((errors) => {
		confc.utils.displayErrors(errors);
	});
} else {
	confc.copyAll().catch((errors) => {
		confc.utils.displayErrors(errors);
	});
}
