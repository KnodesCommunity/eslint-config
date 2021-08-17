export = {
	env: { node: true },
	extends: './ts-rxjs',
	overrides: [
		{
			files: [ './src/**/*.{spec,test}.ts{x,}', './test/**/*.ts{x,}', './**/test-utils/**/*.ts{x,}' ],
			env: { jest: true },
			extends: '../config-fragments/ts-test',
		},
		{
			files: [ './test/*.js' ],
			env: { jest: true, commonjs: true },
			extends: '../config-fragments/overrides/js-lighten-rules',
		},
	],
} as const;
