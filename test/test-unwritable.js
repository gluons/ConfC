'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const chaiFiles = require('chai-files');
chai.use(chaiAsPromised);
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

const confc = require('../');

describe('copy config file to unwritable directory', () => {
	let promise;
	before(() => {
		promise = confc.copyAll();
	});
	it('should return errors', () => {
		return expect(promise).to.be.rejectedWith(Array);
	});
	it('should not have config files', () => {
		return Promise.all([
			expect(promise).to.be.rejected,
			promise.catch(() => {
				expect(file('.bowerrc')).to.not.exist;
				expect(file('.editorconfig')).to.not.exist;
			})
		]);
	});
});
