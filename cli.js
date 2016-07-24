#!/usr/bin/env node

'use strict';

const program = require('commander');

const packageInfo = require('./package.json');

const confc = require('./');

var files;

program
	.version(packageInfo.version)
	.arguments(`[fileNames...]`)
	.action((fileNames) => {
		if (typeof fileNames !== 'undefined') {
			files = fileNames;
		}
	})
	.option(`-p, --path [path]`, `Path to default configuration files.`)
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
