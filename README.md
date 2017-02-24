# ConfC

[![Greenkeeper badge](https://badges.greenkeeper.io/gluons/ConfC.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/gluons/ConfC.svg?style=flat-square)](https://github.com/gluons/ConfC/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/confc.svg?style=flat-square)](https://www.npmjs.com/package/confc)
[![npm](https://img.shields.io/npm/dt/confc.svg?style=flat-square)](https://www.npmjs.com/package/confc)
[![Travis](https://img.shields.io/travis/gluons/ConfC.svg?style=flat-square)](https://travis-ci.org/gluons/ConfC)
[![ESLint Gluons](https://img.shields.io/badge/code%20style-gluons-9C27B0.svg?style=flat-square)](https://github.com/gluons/eslint-config-gluons)

**Config Clone** — 🆕 Start new project with your default configs.

Clone your default configuration files to current working directory.

## Installation
Install via [npm](https://www.npmjs.com/) as global package.

[![NPM](https://nodei.co/npm/confc.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/confc)

```
npm install -g confc
```

## Configuration
You can configure **ConfC** with `.confcrc` file. More detail about `rc` configuration file can be found from [dominictarr/rc](https://github.com/dominictarr/rc).

### .confcrc
 - **path**  
   Type: `String`  
   Default: **$HOME** (Your **home** directory)

   Path to directory that contain your default configuration files.

 - **files**  
   Type: `Array.<String>`  
   Default: Files name in [file list](./files.yaml)

   List of target files name that you want to clone.

   > If you have your own configuration files and don't want to use files from [file list](./files.yaml), just replace it with your file names.

 - **overwrite**  
   Type: `Boolean`  
   Default: `false`
   
   Force to overwrite files if it exist.

 - **verbose**  
   Type: `Boolean`  
   Default: `false`

   Display verbose output.

## Command Line (Preferred)
```
Usage: confc [options] [filename..]

Clone your default configuration files to current working directory.

Options:
  --version, -V    Show version number                                 [boolean]
  -p, --path       Path to configuration files         [string] [default: $HOME]
  -f, --overwrite  Force to overwrite                 [boolean] [default: false]
  -v, --verbose    Display more information           [boolean] [default: false]
  -h, --help       Show help                                           [boolean]

Examples:
  confc
  confc .eslintrc.json .editorconfig
  confc --path ./myConfigs/ .editorconfig
```

## Node API
### confc([fileNames, [options]])
Return: `Boolean` _(when copying have no error)_ or `Error` _(when copying have an error)_

Clone configuration files from your **home** path (or your desired path) to current working directory.

#### fileNames
Type: `Array.<String>`  
Default: Files name in [file list](./files.yaml)

Files name to clone.

#### options
Type: `Object`

Options:
 - **path**  
   Type: `String`  
   Default: **$HOME** (Your **home** directory)
   
   Path to configuration files.

 - **overwrite**  
   Type: `Boolean`  
   Default: `false`

   Force to overwrite.

If no any `fileNames` or `options` given, this function will get the options from your `.confcrc` (if it exist).

When no `.confcrc`, it will fallback to the default value.

##### Example:
 - No parameters

   ```javascript
   const confc = require('confc');
   let result = confc();
   if (result == true) {
		// Success
   } else if (result == false) {
		// Fail
   } else {
		// result instanceof Error
		// Error
   }
   ```

 - With `fileNames`

   ```javascript
   const confc = require('confc');
   let result = confc(['.editorconfig', '.eslintrc.json']);
   if (result == true) {
		// Success
   } else if (result == false) {
		// Fail
   } else {
		// result instanceof Error
		// Error
   }
   ```

 - With `fileNames` and `options`

   ```javascript
   const confc = require('confc');
   let result = confc(['.editorconfig', '.eslintrc.json'], {
		path: './myConfigs',
		overwrite: true
   });
   if (result == true) {
		// Success
   } else if (result == false) {
		// Fail
   } else {
		// result instanceof Error
		// Error
   }
   ```

 - With only `options`

   ```javascript
   const confc = require('confc');
   let result = confc({
		path: './myConfigs',
		overwrite: true
   });
   if (result == true) {
		// Success
   } else if (result == false) {
		// Fail
   } else {
		// result instanceof Error
		// Error
   }
   ```
