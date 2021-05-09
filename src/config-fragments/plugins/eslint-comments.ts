export = {
	plugins: [
		'eslint-comments',
	],
	extends: 'plugin:eslint-comments/recommended',
	rules: {
		'eslint-comments/require-description': [ 'error', { ignore: [ 'eslint-enable' ] } ],
		'eslint-comments/no-unused-disable': 'error',
	},
}
