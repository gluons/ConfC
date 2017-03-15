'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

const home = require('user-home'); // Home path
const defaultFiles = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../files.yaml'), 'utf8')); // Default files name

// Default configurations
const defaultConfig = {
	path: home, // Config files path
	files: defaultFiles, // Files name
	overwrite: false, // Force to overwrite
	verbose: false // Output verbose
};

module.exports = defaultConfig;
