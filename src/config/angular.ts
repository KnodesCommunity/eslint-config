import { Linter } from 'eslint';

const unitTestPatterns = [ './src/**/test-utils/**/*', './src/**/*.{spec,test}.ts{x,}' ];
const e2eTestPattern = './e2e/src/**/*.ts{x,}';

export = {
	env: {},
	overrides: [
		{
			files: [ '*.js{x,}' ],
			extends: '../config-fragments/js',
			overrides: [
				{
					files: [ './*', './e2e/*' ],
					env: { browser: false, node: true },
					extends: '../config-fragments/js-config',
				},
				{
					files: [ './e2e/*' ],
					env: { jasmine: true },
				},
			],
		},
		{
			files: [ '*.ts{x,}' ],
			extends: [
				'../config-fragments/plugins/angular-eslint',
				'../config-fragments/ts-rxjs',
			],
			overrides: [
				{
					files: [ './src/test.ts', '*.d.ts{x,}' ],
					extends: '../config-fragments/ts-test',
				},
				{
					files: [ ...unitTestPatterns ],
					env: { jasmine: true },
					extends: [
						'../config-fragments/ts-test',
						'../config-fragments/overrides/angular-eslint-testing',
						'../config-fragments/overrides/rxjs-testing',
					],
				},
				{
					files: [ './e2e/**/*' ],
					env: { protractor: true },
					overrides: [
						{
							files: [ e2eTestPattern ],
							env: { jasmine: true },
							extends: '../config-fragments/ts-test',
						},
					],
				},
			],
		},
		{
			files: [ '*.component.html' ],
			extends: '../config-fragments/plugins/angular-eslint-template',
		},
	],
	settings: {
		unitTestPatterns,
		e2eTestPattern,
	},
} as Linter.Config;
