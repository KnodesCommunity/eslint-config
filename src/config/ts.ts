export = {
	extends: '../config-fragments/jts',
	overrides: [
		{
			files: [ '*.{spec,test}.ts{x,}', '**/{test-utils,__mocks__}/**/*.ts{x,}', '__tests__/**/*.ts{x,}' ],
			extends: '../config-fragments/ts-test',
		},
		{
			files: [ './*.{j,t}s' ],
			extends: '../config-fragments/overrides/js-lighten-rules',
		},
		{
			files: [ './types/**/*.d.tsx?' ],
			extends: '../config-fragments/ts-test',
		},
	],
};
