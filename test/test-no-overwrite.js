'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiFiles = require('chai-files');
const fs = require('fs');
const path = require('path');
chai.use(chaiAsPromised);
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

const confc = require('../confc');

const dirNoOverwritePath = path.resolve(path.join(__dirname, './directoryNoOverwrite'));

describe('Copy config files to directory without overwriting', () => {
	let copyPromise;
	before(() => {
		process.chdir(dirNoOverwritePath);
		copyPromise = confc.copy();
		return copyPromise;
	});
	it('should finish coping without error', () => {
		return expect(copyPromise).to.be.fulfilled;
	});
	it('should have config files', () => {
		expect(file('.bowerrc')).to.exist;
		expect(file('.editorconfig')).to.exist;
	});
	it('should not overwrite files', done => {
		process.chdir(__dirname);
		fs.readdir('./configFiles', (err, files) => {
			if (err) {
				done(err);
			} else {
				files.forEach(fileName => {
					expect(file(
						path.join('./directoryNoOverwrite', fileName)
					)).to.not.equal(file(
						path.join('./configFiles', fileName
					)));

					expect(file(
						path.join('./directoryNoOverwrite', fileName)
					)).to.equal(file(
						path.join('./pre-existentConfigFiles', fileName
					)));
				});
				done();
			}
		});
	});
});
