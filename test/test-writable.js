const path = require('path');

const del = require('del');

const targetPath = path.resolve(path.join(__dirname, 'writableTarget'));

del(['writableTarget/*', 'writableTarget/.*', '!writableTarget/.confcrc']).then(() => {
	process.chdir(targetPath); // Change current working directory

	const confc = require('../');

	confc.copyAll().catch((errors) => {
		confc.utils.displayErrors(errors);
	});
});
