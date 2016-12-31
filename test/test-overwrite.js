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

const dirOverwritePath = path.resolve(path.join(__dirname, './directoryOverwrite'));

describe('Copy config files to directory with overwriting', () => {
	let copyPromise;
	before(() => {
		process.chdir(dirOverwritePath);
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
	it('should overwrite files', done => {
		process.chdir(__dirname);
		fs.readdir('./configFiles', (err, files) => {
			if (err) {
				done(err);
			} else {
				files.forEach(fileName => {
					expect(file(
						path.join('./directoryOverwrite', fileName)
					)).to.equal(file(
						path.join('./configFiles', fileName
					)));

					expect(file(
						path.join('./directoryOverwrite', fileName)
					)).to.not.equal(file(
						path.join('./pre-existentConfigFiles', fileName
					)));
				});
				done();
			}
		});
	});
});
