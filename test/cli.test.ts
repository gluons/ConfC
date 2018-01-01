import { ChildProcess } from 'child_process';
import { resolve } from 'path';

import chai = require('chai');
import chaiFiles = require('chai-files');
import spawn = require('cross-spawn');
import { existsSync } from 'fs-extra';

chai.use(chaiFiles);

const { expect } = chai;
const { file } = chaiFiles;

const cliPath = resolve(__dirname, '../dist/cli.js');
const sourceDir = resolve(__dirname, './fixtures/src');
const targetDir = resolve(__dirname, './fixtures/cli');

/* tslint:disable: no-unused-expression */
describe('Clone config files via CLI', () => {
	before(done => {
		let child: ChildProcess = spawn('node', [cliPath, '-y'], {
			cwd: targetDir,
			stdio: ['ignore', 'ignore', process.stderr]
		});
		child.on('close', code => {
			if (code === 0) {
				done();
			} else {
				done(new Error(`confc command exit ${code}`));
			}
		});
	});

	let targetA = resolve(targetDir, 'a');
	let targetB = resolve(targetDir, 'b');
	let sourceA = resolve(sourceDir, 'a');
	let sourceB = resolve(sourceDir, 'b');

	it('should have all expected files in target directory', () => {
		expect(existsSync(targetA)).to.be.true;
		expect(existsSync(targetB)).to.be.true;
	});
	it('all expected files should contain the same content as source', () => {
		expect(file(targetA)).to.equal(file(sourceA));
		expect(file(targetB)).to.equal(file(sourceB));
	});
});
