import { Linter } from 'eslint';

export = {
	extends: './js',
	overrides: [
		{ files: [ '*.ts{x,}' ], extends: '../config-fragments/ts' },
	],
} as Linter.Config;
