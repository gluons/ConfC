import { resolve } from 'path';

import chai = require('chai');
import chaiFiles = require('chai-files');
import { existsSync } from 'fs-extra';

import confc from '../dist/confc.esm';

chai.use(chaiFiles);

const { expect } = chai;
const { file } = chaiFiles;

const sourceDir = resolve(__dirname, './fixtures/src');
const targetDir = resolve(__dirname, './fixtures/node');

/* tslint:disable: no-unused-expression */
describe('Clone config files via Node API', () => {
	before(done => {
		confc({ cwd: targetDir })
			.then(done)
			.catch(done);
	});

	let targetC = resolve(targetDir, 'c');
	let targetD = resolve(targetDir, 'd');
	let sourceC = resolve(sourceDir, 'c');
	let sourceD = resolve(sourceDir, 'd');

	it('should have all expected files in target directory', () => {
		expect(existsSync(targetC)).to.be.true;
		expect(existsSync(targetD)).to.be.true;
	});
	it('all expected files should contain the same content as source', () => {
		expect(file(targetC)).to.equal(file(sourceC));
		expect(file(targetD)).to.equal(file(sourceD));
	});
});
