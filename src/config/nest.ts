export = {
	env: { node: true },
	extends: './ts-rxjs-base',
	overrides: [
		{
			files: [ 'src/**/*.{spec,test}.ts{x,}' ],
			env: { jest: true },
			extends: '../config-fragments/test-ts',
		},
	],
} as const;
