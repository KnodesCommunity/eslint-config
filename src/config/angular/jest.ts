import { Linter } from 'eslint';

import angular from '../angular';

export = {
	extends: '../angular',
	overrides: [
		{
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Actually expected
			files: [ ...angular.settings!.unitTestPatterns ],
			env: { jest: true, jasmine: false },
		},
	],
} as Linter.Config;
