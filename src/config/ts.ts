export = {
	extends: './ts-base',
	overrides: [
		{
			files: [ '*.{spec,test}.ts{x,}' ],
			extends: '../config-fragments/ts-test',
		},
	],
};
