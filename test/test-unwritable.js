const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(path.join(__dirname, 'unwritableTarget'));
process.chdir(targetPath); // Change current working directory

try {
	fs.chmodSync(targetPath, parseInt('0444', 8));
} catch (err) {
	// Ignore chmod error.
}

const confc = require('../');

confc.copyAll().catch((errors) => {
	confc.utils.displayErrors(errors);
});
