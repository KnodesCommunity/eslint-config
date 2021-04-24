const unitTestPattern = './src/{**/test-utils/**/*,**/*.{spec,test}}.ts{x,}';
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
					files: [ './src/test.ts' ],
					extends: '../config-fragments/overrides/js-lighten-rules',
				},
				{
					files: [ unitTestPattern ],
					env: { jasmine: true },
					extends: '../config-fragments/ts-test',
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
		unitTestPattern,
		e2eTestPattern,
	},
} as const;
