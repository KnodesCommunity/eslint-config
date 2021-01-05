export = {
	plugins: [
		'rxjs',
	],
	rules: {
		'rxjs/no-async-subscribe': 'error',
		'rxjs/no-ignored-observable': 'error',
		'rxjs/no-ignored-subscription': 'warn',
		'rxjs/no-nested-subscribe': 'error',
		'rxjs/no-unbound-methods': 'error',
		'rxjs/throw-error': 'error',
		'rxjs/no-ignored-error': 'warn',
		'rxjs/no-subject-unsubscribe': 'warn',
	},
};
