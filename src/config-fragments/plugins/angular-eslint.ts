export = {
	plugins: [
		'@angular-eslint',
	],
	extends: 'plugin:@angular-eslint/all',
	rules: {
		'@angular-eslint/use-component-selector': 'off',
		'@angular-eslint/no-forward-ref': 'warn',
	},
}
