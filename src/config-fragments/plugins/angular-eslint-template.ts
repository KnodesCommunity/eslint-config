export = {
	parser: '@angular-eslint/template-parser',
	plugins: [
		'@angular-eslint/template',
	],
	extends: [
		'plugin:@angular-eslint/template/all',
	],
	rules: {
		'@angular-eslint/template/cyclomatic-complexity': 'warn',
		'@angular-eslint/template/no-call-expression': 'warn',
		'@angular-eslint/template/click-events-have-key-events': 'warn',
		'@angular-eslint/template/i18n': 'warn',
		'@angular-eslint/template/no-any': 'warn',
		'@angular-eslint/template/use-track-by-function': 'off',
	},
};
