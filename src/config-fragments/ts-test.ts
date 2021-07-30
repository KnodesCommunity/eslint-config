export = {
	extends: [ './ts', './overrides/js-lighten-rules', './overrides/js-testing' ],
	rules: {
		'@typescript-eslint/tslint/config': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'jsdoc/require-jsdoc': 'off',
	},
};
