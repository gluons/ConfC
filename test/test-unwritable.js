'use strict';
const path = require('path');

const chai = require('chai');
const chaiFiles = require('chai-files');
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
	it('should return errors', (done) => {
		promise
			.then(
				() => {
					// Reach fulfilled state. Fail.
					done(new Error('Should return errors but no error.'));
				},
				(errors) => {
					expect(errors).to.be.instanceof(Array);
					expect(errors).to.be.not.empty;
					expect(errors[0]).to.be.instanceof(Error);
					done();
				}
			)
			.catch((err) => {
				done(err);
			});
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
