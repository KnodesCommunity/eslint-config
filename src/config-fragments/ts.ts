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
		// 'no-unused-vars': 'off',
		'indent': 'off',
		'no-redeclare': 'off',
		'no-shadow': 'off',
		// Re-set some configs that are overriden by typescript-eslint
		// 'max-len': jsRuleSet.rules['max-len'],
	},
}
