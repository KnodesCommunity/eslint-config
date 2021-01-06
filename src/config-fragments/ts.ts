export = {
	plugins: [
		'import',
	],
	extends: [
		'plugin:import/typescript',
		'./js',
		'./plugins/import',
		'./plugins/typescript-eslint',
		'./plugins/eslint',
	],
	rules: {
		'indent': 'off',
		'no-redeclare': 'off',
		'no-shadow': 'off',
		'no-dupe-class-members': 'off',
		'import/export': 'off',
	},
}
