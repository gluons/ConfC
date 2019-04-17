import { ChildProcess } from 'child_process';
import spawn from 'cross-spawn';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const cliPath = resolve(__dirname, '../dist/cli.js');
const sourceDir = resolve(__dirname, './fixtures/src');
const targetDir = resolve(__dirname, './fixtures/cli');

const sourceA = resolve(sourceDir, 'a');
const sourceB = resolve(sourceDir, 'b');
const targetA = resolve(targetDir, 'a');
const targetB = resolve(targetDir, 'b');

describe('Clone config files via CLI', () => {
	beforeAll(done => {
		const child: ChildProcess = spawn('node', [cliPath, '-y'], {
			cwd: targetDir,
			stdio: ['ignore', 'ignore', process.stderr]
		});

		child.on('exit', code => {
			if (code === 0) {
				done();
			} else {
				done.fail(new Error(`confc command exit ${code}`));
			}
		});
	}, 5000);

	it('should have all expected files in target directory', () => {
		expect(existsSync(targetA)).toBe(true);
		expect(existsSync(targetB)).toBe(true);
	});
	it('all expected files should contain the same content as source', () => {
		const targetAContent = readFileSync(targetA, 'utf8');
		const targetBContent = readFileSync(targetB, 'utf8');
		const sourceAContent = readFileSync(sourceA, 'utf8');
		const sourceBContent = readFileSync(sourceB, 'utf8');

		expect(targetAContent).toEqual(sourceAContent);
		expect(targetBContent).toEqual(sourceBContent);
	});
});
