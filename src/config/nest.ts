export = {
	env: { node: true },
	extends: './ts-rxjs',
	overrides: [
		{
			files: [ 'src/**/*.{spec,test}.ts{x,}' ],
			env: { jest: true },
			extends: '../config-fragments/test-ts',
		},
	],
} as const;
