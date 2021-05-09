export = {
	env: { es2020: true },
	extends: [
		'eslint:recommended',
		'./plugins/eslint',
		'./plugins/import',
		'./plugins/jsdoc',
		'./plugins/prefer-arrow',
		'./plugins/eslint-comments',
	],
	overrides: [
		{
			plugins: [ 'sort-export-all' ],
			files: [ '**/index.{j,t}s{,x}' ],
			rules: {
				'sort-export-all/sort-export-all': 'error',
			},
		},
	],
}
