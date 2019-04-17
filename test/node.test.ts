import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import confc from '../dist/confc';

const sourceDir = resolve(__dirname, './fixtures/src');
const targetDir = resolve(__dirname, './fixtures/node');

const sourceC = resolve(sourceDir, 'c');
const sourceD = resolve(sourceDir, 'd');
const targetC = resolve(targetDir, 'c');
const targetD = resolve(targetDir, 'd');

describe('Clone config files via Node API', () => {
	beforeAll(() => {
		return confc({ cwd: targetDir });
	});

	it('should have all expected files in target directory', () => {
		expect(existsSync(targetC)).toBe(true);
		expect(existsSync(targetD)).toBe(true);
	});
	it('all expected files should contain the same content as source', () => {
		const targetCContent = readFileSync(targetC, 'utf8');
		const targetDContent = readFileSync(targetD, 'utf8');
		const sourceCContent = readFileSync(sourceC, 'utf8');
		const sourceDContent = readFileSync(sourceD, 'utf8');

		expect(targetCContent).toEqual(sourceCContent);
		expect(targetDContent).toEqual(sourceDContent);
	});
});
