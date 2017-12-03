# ConfC
[![license](https://img.shields.io/github/license/gluons/ConfC.svg?style=flat-square)](./LICENSE)
[![npm](https://img.shields.io/npm/v/confc.svg?style=flat-square)](https://www.npmjs.com/package/confc)
[![npm](https://img.shields.io/npm/dt/confc.svg?style=flat-square)](https://www.npmjs.com/package/confc)
[![Travis](https://img.shields.io/travis/gluons/ConfC.svg?style=flat-square)](https://travis-ci.org/gluons/ConfC)
[![TSLint](https://img.shields.io/badge/TSLint-gluons-15757B.svg?style=flat-square)](https://github.com/gluons/tslint-config-gluons)
[![Greenkeeper badge](https://badges.greenkeeper.io/gluons/ConfC.svg)](https://greenkeeper.io/)

**Config Clone** — 🆕 Start new project with your default configs.

Clone your default configuration files to current working directory.

## Installation

**[npm](https://www.npmjs.com/):**

[![NPM](https://nodei.co/npm/confc.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/confc)

```bash
npm install -g confc
```

**[Yarn](https://yarnpkg.com/):**

```bash
yarn global add confc
```

## Configuration

You can configure **ConfC** via `.confcrc` file.  
More information about configuration file can be found from [rc](https://github.com/dominictarr/rc).

### .confcrc
 - **path**  
   Type: `String`  
   Default: **$HOME** (Your **home** directory)

   Path to directory that contain your default configuration files.

 - **files**  
   Type: `String[]`  
   Default: Files name in [files.yaml](./files.yaml)

   List of target files name that you want to clone.

   > If you have your own configuration files and don't want to use files from [files.yaml](./files.yaml), just replace it with your files name by this option.

 - **overwrite**  
   Type: `Boolean`  
   Default: `false`
   
   Force to overwrite files if it exists.

 - **verbose**  
   Type: `Boolean`  
   Default: `false`

   Display verbose information.

## Command Line (Preferred)

```
Usage: confc [options] [filenames...]

Clone your default configuration files to current working directory.

Options:
  --help, -h       Show help                                           [boolean]
  --version, -V    Show version number                                 [boolean]
  --path, -p       Path to configuration files         [string] [default: $HOME]
  --overwrite, -f  Force to overwrite                 [boolean] [default: false]
  --yes, -y        Say yes without inquiry                             [boolean]
  --verbose, -v    Display more information           [boolean] [default: false]

Examples:
  confc                                    Clone default files from your home path to current working directory
  confc .eslintrc.json .editorconfig       Clone .eslintrc.json and .editorconfig from your home path to current working directory
  confc --path ./myConfigs/ .editorconfig  Clone .editorconfig from ./myConfigs/ directory to current working directory
```

## Node API

### `confc([fileNames, [options]])`
Return: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Clone configuration files to current working directory.

#### `fileNames`
Type: `String[]`  
Default: Files name in [files.yaml](./files.yaml)

Files name to clone.

#### `options`
Type: `Object`

**Options:**
- `path`  
  Type: `String`  
  Default: **$HOME** (Your **home** directory)

  Path to configuration files.

- `cwd`  
  Type: `String`  
  Default: Current working directory

  Current working directory.  
  It's used to specify the destination of cloned files.

- `overwrite`  
  Type: `Boolean`  
  Default: `false`

  Force to overwrite.

##### Example

- No parameters
  ```js
  const confc = require('confc');
  confc()
    .then(() => {
      console.log('Succeed.');
    })
    .catch(err => {
      console.log('Fail.');
      console.error(err);
    })
  ```

- With `fileNames`
  ```js
  const confc = require('confc');
  confc(['.editorconfig', '.eslintrc.json'])
    .then(() => {
      console.log('Succeed.');
    })
    .catch(err => {
      console.log('Fail.');
      console.error(err);
    })
  ```

- With `fileNames` and `options`
  ```js
  const confc = require('confc');
  confc(['.editorconfig', '.eslintrc.json'], {
    path: './myConfigs',
    cwd: './targetDir',
    overwrite: true
  })
    .then(() => {
      console.log('Succeed.');
    })
    .catch(err => {
      console.log('Fail.');
      console.error(err);
    })
  ```

- With only `options`
  ```js
  const confc = require('confc');
  confc({
    path: './myConfigs',
    cwd: './targetDir',
    overwrite: true
  })
    .then(() => {
      console.log('Succeed.');
    })
    .catch(err => {
      console.log('Fail.');
      console.error(err);
    })
  ```
