export = {
	extends: [ './js', './overrides/js-lighten-rules' ],
	rules: {
		'import/no-extraneous-dependencies': [ 'error', { devDependencies: true } ],
	},
}
