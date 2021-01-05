export = {
	env: { node: true },
	extends: './ts-rxjs',
	overrides: [
		{
			files: [ './src/**/*.{spec,test}.ts{x,}', './test/**/*' ],
			env: { jest: true },
			extends: '../config-fragments/ts-test',
		},
	],
} as const;
