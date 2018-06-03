import { readFileSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';

import { safeLoad } from 'js-yaml';

import Config from '../types/Config';

const userHome = homedir();
const defaultFiles = safeLoad(
	readFileSync(resolve(__dirname, '../../files.yaml'), 'utf8')
);

export default {
	path: userHome,
	files: defaultFiles,
	overwrite: false,
	verbose: false
} as Config;
