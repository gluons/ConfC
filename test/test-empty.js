'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiFiles = require('chai-files');
const path = require('path');
chai.use(chaiAsPromised);
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

const confc = require('../confc');

const dirEmptyPath = path.resolve(path.join(__dirname, './directoryEmpty'));
process.chdir(dirEmptyPath);

describe('Copy config files to empty directory', () => {
	let copyPromise;
	before(() => {
		copyPromise = confc.copy();
	});
	it('shoud finish coping without error', () => expect(copyPromise).to.be.fulfilled);
	it('shoud have config files', () => {
		return copyPromise.then(() => {
			expect(file('.bowerrc')).to.exist;
			expect(file('.editorconfig')).to.exist;
		});
	});
});
