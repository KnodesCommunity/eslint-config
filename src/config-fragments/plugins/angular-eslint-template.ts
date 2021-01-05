export = {
	parser: '@angular-eslint/template-parser',
	plugins: [
		'@angular-eslint/template',
	],
	extends: [
		'plugin:@angular-eslint/template/recommended',
	],
	rules: {
		'@angular-eslint/template/cyclomatic-complexity': 'warn',
		'@angular-eslint/template/no-call-expression': 'warn',
	},
};
