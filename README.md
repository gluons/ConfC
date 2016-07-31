# ConfC
[![license](https://img.shields.io/github/license/gluons/ConfC.svg?style=flat-square)](https://github.com/gluons/ConfC/blob/master/LICENSE)
[![Support Files](https://img.shields.io/badge/Support%20Files-5-orange.svg?style=flat-square)](https://github.com/gluons/ConfC/blob/master/files.yaml)
[![Travis](https://img.shields.io/travis/gluons/ConfC.svg?style=flat-square)](https://travis-ci.org/gluons/ConfC)

**Config Clone** — Start new project with your default configs.

Clone your default configuration files to current working directory.

## Configuration
You can configure **ConfC** with `.confcrc` file. More detail about `rc` configuration file can be found from [dominictarr/rc](https://github.com/dominictarr/rc).

### .confcrc
 - **path**  
   Type: `String`

   Path to directory that contain your default configuration files.

   Default is your home directory.
 - **files**  
   Type: `Array of String`

   List of target file names that you want to clone.

   Default is file names in [file list](./files.yaml).

   > If you have your own configuration files and don't want to use list from [file list](./files.yaml), just replace it with your file names.
 - **extendedFiles**  
   Type: `Array of String`

   Optional option. Same as **files**. But can use to extend list in **files** with your own configuration files.

   Default is an `Empty Array` (`[]`).

   > If you replace **files** with your own configuration file names, you don't need to use this option.
 - **verbose**  
   Type: `Boolean`

   Display cloning information.

   Default is `false`.

<br>

You can also configure **ConfC** with `config` property in code. 😃
```javascript
const confc = require('confc');
confc.config.path = 'foo/bar';
confc.config.verbose = true;
```

## Command Line
```
Usage: confc [options] [filename..]

Clone your default configuration files to current working directory.

Options:
  --version, -V  Show version number                                   [boolean]
  -p, --path     Path to default configuration files.                   [string]
  -v, --verbose  Display more information.                             [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  confc
  confc .eslintrc.json
  confc --path $home .editorconfig
```

## API
### Core
#### confc.copy(fileNames)
Return: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Copy specific files to current working directory.

##### fileNames
Type: `Array of String`

Specific file names.

```javascript
confc.copy([
    '.eslintrc.json',
    '.editorconfig'
]).then(() => {
    console.log('Copied.');
});
```

#### confc.copyAll()
Return: [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Copy all files (in our [file list](./files.yaml)) to current working directory.
```javascript
confc.copyAll().then(() => {
    console.log('Copied.');
});
```

---

### Utilities

#### confc.utils.displayError(error)
Display colored **ConfC** error to `stderr`.

##### error
Type: `Error`

An **ConfC** error.

```javascript
confc.utils.displayError(error);
```

#### confc.utils.displayErrors(errors)
Display colored **ConfC** errors to `stderr`.

##### errors
Type: `Array of Error`

The **ConfC** errors.

```javascript
confc.utils.displayErrors(errors); // errors = [error1, error2, ...]
```
