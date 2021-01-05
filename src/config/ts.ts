export = {
	extends: '../config-fragments/jts',
	overrides: [
		{
			files: [ '*.{spec,test}.ts{x,}' ],
			extends: '../config-fragments/ts-test',
		},
	],
};
