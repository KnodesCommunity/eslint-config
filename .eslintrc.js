/** @type {import('eslint').Linter.Config} */
module.exports = {
	env: { node: true },
	extends: './dist/config/ts',
	parserOptions: {
		project: [ './tsconfig.json', './tsconfig.spec.json' ],
	},
	ignorePatterns: [ 'test/**/fixtures' ],
};
