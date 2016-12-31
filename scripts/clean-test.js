'use strict';

const child_process = require('child_process');
const spawn = child_process.spawn;
const exec = child_process.exec;

if (process.platform === 'win32') {
	let child = spawn('powershell.exe', ['.\\scripts\\clean-test.ps1']);

	child.stdout.on('data', data => {
		console.log(data.toString());
	});

	child.stderr.on('data', err => {
		console.error(err.toString());
	});

	child.on('exit', code => {
		console.log(`Child exited with code ${code}`);
	});
	child.stdin.end();
} else {
	exec('./scripts/clean-test.sh', (err, stdout, stderr) => {
		if (err) {
			console.error(`Error: ${err.toString()}`);
		} else {
			console.log(stdout.toString());
			console.error(stderr.toString());
		}
	});
}
