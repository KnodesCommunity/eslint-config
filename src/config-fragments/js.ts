export = {
	env: { es2020: true },
	extends: [
		'eslint:recommended',
		'./plugins/eslint',
		'./plugins/import',
		'./plugins/jsdoc',
		'./plugins/prefer-arrow',
	],
}
