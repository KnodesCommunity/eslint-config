export = {
	env: { browser: true },
	extends: './ts-rxjs-base',
	overrides: [
		{
			files: [ 'src/**/*.{spec,test}.ts{x,}' ],
			env: { jasmine: true },
			extends: '../config-fragments/test-ts',
		},
		{
			files: [ '*.component.html' ],
			extends: '../config-fragments/plugins/angular-eslint-template',
		},
	],
} as const;
