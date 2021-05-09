import { Linter } from 'eslint';

import angular from './index';

export = {
	extends: './index',
	overrides: [
		{
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			files: [ angular.settings!.unitTestPattern ],
			env: { jest: true, jasmine: false },
		},
	],
} as Linter.Config;
