'use strict';

const chai = require('chai');
const chaiFiles = require('chai-files');
const fs = require('fs');
const path = require('path');
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

const confc = require('../confc');

const dirEmptyPath = path.resolve(path.join(__dirname, './directoryEmpty'));

describe('Copy config files to empty directory', () => {
	let copyResult;
	before(() => {
		process.chdir(dirEmptyPath);
		copyResult = confc();
	});
	it('should finish coping without error', () => {
		expect(copyResult).to.be.true;
		expect(copyResult).to.not.be.instanceof(Error);
	});
	it('should have config files', () => {
		expect(file('.bowerrc')).to.exist;
		expect(file('.editorconfig')).to.exist;
	});
	it('should copy the correct files', done => {
		process.chdir(__dirname);
		fs.readdir('./configFiles', (err, files) => {
			if (err) {
				done(err);
			} else {
				files.forEach(fileName => {
					expect(file(
						path.join('./directoryEmpty', fileName)
					)).to.equal(file(
						path.join('./configFiles', fileName
					)));
				});
				done();
			}
		});
	});
});
