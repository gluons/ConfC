# ConfC
[![license](https://img.shields.io/github/license/gluons/ConfC.svg?style=flat-square)](https://github.com/gluons/ConfC/blob/master/LICENSE)
[![Support Files](https://img.shields.io/badge/Support%20Files-5-orange.svg?style=flat-square)](https://github.com/gluons/ConfC/blob/master/files.yaml)
[![Travis](https://img.shields.io/travis/gluons/ConfC.svg?style=flat-square)](https://travis-ci.org/gluons/ConfC)

**Config Clone** — Start new project with your default configs.

_Clone your default configuration files to current working directory._

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
### confc.copy
Copy specific files to current working directory.
```javascript
confc.copy([
    '.eslintrc.json',
    '.editorconfig'
]).then(() => {
    console.log('Copied.');
});
```

### confc.copyAll
Copy all files (in our [file list](./files.yaml)) to current working directory.
```javascript
confc.copyAll().then(() => {
    console.log('Copied.');
});
```

### confc.utils.displayError
Display colored **ConfC** error to `stderr`.
```javascript
confc.utils.displayError(error);
```

### confc.utils.displayErrors
Display colored **ConfC** errors to `stderr`.
```javascript
confc.utils.displayErrors(errors); // errors = [error1, error2, ...]
```
