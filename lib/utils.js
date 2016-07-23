'use strict';
const fs = require('fs');

const chalk = require('chalk');

module.exports = {};

// Copy function. See http://stackoverflow.com/a/14387791/1675907.
/**
 * Copy file.
 * @param  {String} src  Source path.
 * @param  {String} dest Destination path.
 * @return {Promise} Promise of copying.
 */
module.exports.copy = (src, dest) => {
	return new Promise(function(resolve, reject) {
		let rs = fs.createReadStream(src);
		let ws = fs.createWriteStream(dest);

		rs.on('error', function() {
			let err = new Error(`Cannot copy file from ${ chalk.cyan('"' + src + '"') } to ${ chalk.cyan('"' + dest + '"') }.`);
			reject(err);
		});
		ws.on('error', function() {
			let err = new Error(`Cannot copy file from ${ chalk.cyan('"' + src + '"') } to ${ chalk.cyan('"' + dest + '"') }.`);
			reject(err);
		});
		ws.on('close', function() {
			resolve();
		});

		rs.pipe(ws);
	});
};
/**
 * Display verbose information.
 * @param  {String} src  Source path.
 * @param  {String} dest Destination path.
 */
module.exports.displayVerbose = (src, dest) => {
	console.log(chalk.blue(`Copying ${ chalk.cyan('"' + src + '"') } to ${ chalk.cyan('"' + dest + '"') }.`));
};
/**
 * Display error.
 * @param  {Error} error An error.
 */
var displayError =  module.exports.displayError = (error) => {
	if (error && (error instanceof Error)) {
		console.error(`${ chalk.bold('[confc] Error:') } ${ chalk.red(error.message) }`);
	}
};
/**
 * Display errors.
 * @param  {Error[]} errors Errors.
 */
module.exports.displayErrors = (errors) => {
	if (Array.isArray(errors)) {
		for (let error of errors) {
			displayError(error);
		}
	}
};
