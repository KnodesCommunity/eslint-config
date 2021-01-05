export = {
	parser: '@angular-eslint/template-parser',
	plugins: [
		'@angular-eslint/template',
	],
	rules: {
		'@angular-eslint/template/banana-in-a-box': 'error',
		'@angular-eslint/template/cyclomatic-complexity': 'warn',
		'@angular-eslint/template/no-call-expression': 'warn',
		'@angular-eslint/template/no-negated-async': 'error',
	},
};
