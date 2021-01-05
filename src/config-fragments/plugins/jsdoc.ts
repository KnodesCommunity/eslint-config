export = {
	plugins: [
		'jsdoc',
	],
	extends: 'plugin:jsdoc/recommended',
	rules: {
		'jsdoc/check-alignment': 'error',
		'jsdoc/check-param-names': [ 'warn', { checkDestructured: false } ],
		'jsdoc/newline-after-description': [ 'error', 'always' ],
		'jsdoc/no-types': [ 'error', { contexts:[ 'any' ] } ],
		'jsdoc/require-hyphen-before-param-description': 'error',
		'jsdoc/require-param': [ 'warn', { checkDestructured: false } ],
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-returns-type': 'off',
		'jsdoc/check-tag-names': [ 'error', { definedTags: [ 'accessControl', 'usage', 'typeparam' ] } ],
	},
};
