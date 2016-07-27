'use strict';
const path = require('path');

const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const del = require('del');

const targetPath = path.resolve(path.join(__dirname, 'writableTarget'));

describe('copy config file to writable directory', () => {
	let promise;
	before((done) => {
		del(['test/writableTarget/*', 'test/writableTarget/.*', '!test/writableTarget/.confcrc']).then(() => {
			process.chdir(targetPath); // Change current working directory

			const confc = require('../');

			promise = confc.copyAll();
			done();
		});
	});
	it('should finish copying without error', (done) => {
		promise
			.then(
				() => {
					// Reach fulfilled state. Pass.
					done();
				},
				(errors) => {
					expect(errors).to.be.undefined;
					done();
				}
			).catch((err) => {
				done(err); // AssertionError throw from expect
			});
	});
	it('should have config files', (done) => {
		promise
			.then(
				() => {
					expect(file('.bowerrc')).to.exist;
					expect(file('.editorconfig')).to.exist;
					done();
				},
				(errors) => {
					expect(errors).to.be.undefined;
					done();
				}
			).catch((err) => {
				done(err); // AssertionError throw from expect
			});
	});
});
