const defaultConf = require('./defaultConf.json');
const rcConf = require('rc')('confc', defaultConf);

const home = process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME;
const cwd = __dirname;

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/*
 * Functions.
 */

// Copy function. See http://stackoverflow.com/a/14387791/1675907.
var copy = (src, dest, cb) => {
	let cbCalled = false;
	let done = (err) => {
		if (!cbCalled) {
			cb(err);
			cbCalled = true;
		}
	};

	let rs = fs.createReadStream(src);
	rs.on('error', function(err) {
		done(err);
	});
	let ws = fs.createWriteStream(dest);
	ws.on('error', function(err) {
		done(err);
	});
	ws.on('close', function() {
		done();
	});
	rs.pipe(ws);
};
// Copy files to current working directory.
var copyConf = (files, cb) => {
	for (let file of files) {
		let srcPath = path.join(home, file);
		let destPath = path.join(cwd, file);
		fs.access(srcPath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
			if (!err) {
				copy(srcPath, destPath, (err2) => {
					if (!err2) {
						cb();
					} else {
						cb(new Error(`Cannot copy file from ${srcPath} to ${destPath}.`));
					}
				});
			} else {
				cb(new Error(`Cannot read file ${srcPath}.`));
			}
		});
	}
};

var userConf = rcConf.config;
