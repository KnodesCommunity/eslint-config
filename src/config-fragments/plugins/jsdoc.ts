export = {
	plugins: [
		'jsdoc',
	],
	extends: 'plugin:jsdoc/recommended',
	rules: {
		'jsdoc/require-jsdoc': [ 'error', {
			require: { FunctionDeclaration: true, MethodDefinition: true },
			contexts: [
				'MethodDefinition:not([accessibility="private"]) > FunctionExpression',
			],
			checkConstructors: false,
			checkGetters: false,
			checkSetters: false,
		} ],
		'jsdoc/check-alignment': 'error',
		'jsdoc/check-param-names': [ 'warn', { checkDestructured: false } ],
		'jsdoc/check-tag-names': [ 'error', { definedTags: [ 'usage' ] } ],
		'jsdoc/no-types': [ 'error', { contexts:[ 'any' ] } ],
		'jsdoc/require-hyphen-before-param-description': 'error',
		'jsdoc/require-param': [ 'warn', { checkDestructured: false } ],
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-returns-type': 'off',
		'jsdoc/tag-lines': [ 'error', "any",{"startLines":1}],
	},
} as const;
