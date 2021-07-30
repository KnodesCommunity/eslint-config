import { Linter } from 'eslint';

import angular from './index';

export = {
	extends: './index',
	overrides: [
		{
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Actually expected
			files: [ ...angular.settings!.unitTestPatterns ],
			env: { jest: true, jasmine: false },
		},
	],
} as Linter.Config;
