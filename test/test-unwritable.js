const path = require('path');

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const chaiFiles = require('chai-files');
chai.use(chaiAsPromised);
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

const targetPath = path.resolve(path.join(__dirname, 'unwritableTarget'));
process.chdir(targetPath); // Change current working directory

const confc = require('../');

describe('copy config file to unwritable directory', () => {
	let promise;
	before(() => {
		promise = confc.copyAll();
	});
	it('should return errors', () => {
		return expect(promise).to.be.rejected;
	});
	it('should not have config files', (done) => {
		promise
			.catch(() => {
				expect(file('.bowerrc')).to.not.exist;
				expect(file('.editorconfig')).to.not.exist;
				done();
			})
			.catch((err) => {
				done(err); // AssertionError throw from expect
			});
	});
});
