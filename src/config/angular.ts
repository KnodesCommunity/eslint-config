const unitTestPattern = './src/**/*.{spec,test}.ts{x,}';
const e2eTestPattern = './e2e/**/*.e2e-{spec,test}.ts{x,}';

export = {
	env: { browser: true },
	overrides: [
		{
			files: [ '*.js{x,}' ],
			extends: '../config-fragments/js',
			overrides: [
				{
					files: [ './*' ],
					env: { browser: false, node: true },
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
					files: [ unitTestPattern ],
					env: { jasmine: true },
					extends: '../config-fragments/ts-test',
				},
				{
					files: [ 'e2e/**/*' ],
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
