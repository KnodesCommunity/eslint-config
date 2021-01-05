import builtInRuleSet from './eslint';

export = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'@typescript-eslint/tslint',
	],
	extends: 'plugin:@typescript-eslint/recommended',
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': [
			'error',
			{ default: 'array-simple' },
		],
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					Object: { message: 'Avoid using the `Object` type. Did you mean `object`?' },
					Function: { message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.' },
					Boolean: { message: 'Avoid using the `Boolean` type. Did you mean `boolean`?' },
					Number: { message: 'Avoid using the `Number` type. Did you mean `number`?' },
					String: { message: 'Avoid using the `String` type. Did you mean `string`?' },
					Symbol: { message: 'Avoid using the `Symbol` type. Did you mean `symbol`?' },
				},
			},
		],
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/dot-notation': 'error',
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{
				accessibility: 'explicit',
				overrides: {
					accessors: 'explicit',
					constructors: 'explicit',
					parameterProperties: 'explicit',
				},
			},
		],
		'@typescript-eslint/indent': [
			builtInRuleSet.rules.indent[0],
			builtInRuleSet.rules.indent[1],
			{
				...builtInRuleSet.rules.indent[2],
				ignoredNodes: [ 'TSTypeParameterInstantiation' ],
			} ],
		'@typescript-eslint/member-delimiter-style': 'error',
		'@typescript-eslint/member-ordering': [
			'error',
			{
				default: [
				// Index signature
					'signature',

					// Static fields
					'public-static-field',
					'protected-static-field',
					'private-static-field',
					'static-field',

					// Instance fields
					'public-abstract-field',
					'protected-abstract-field',
					'private-abstract-field',
					'abstract-field',

					'public-decorated-field',
					'protected-decorated-field',
					'private-decorated-field',
					'decorated-field',

					'public-instance-field',
					'protected-instance-field',
					'private-instance-field',
					'instance-field',

					'public-field',
					'protected-field',
					'private-field',
					'field',

					// Static methods
					'public-static-method',
					'protected-static-method',
					'private-static-method',
					'static-method',

					// Constructors
					'public-constructor',
					'protected-constructor',
					'private-constructor',
					'constructor',

					// Instance methods
					'public-abstract-method',
					'protected-abstract-method',
					'private-abstract-method',
					'abstract-method',

					'public-decorated-method',
					'protected-decorated-method',
					'private-decorated-method',
					'decorated-method',

					'public-instance-method',
					'protected-instance-method',
					'private-instance-method',
					'instance-method',

					'public-method',
					'protected-method',
					'private-method',
					'method',
				],
			},
		],
		'@typescript-eslint/naming-convention': [
			'error',
			{ selector: 'enumMember', format: [ 'camelCase', 'UPPER_CASE' ] },
		],
		'@typescript-eslint/no-empty-function': 'error',
		'@typescript-eslint/no-empty-interface': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-non-null-assertion': 'error',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unused-expressions': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/triple-slash-reference': [
			'error',
			{ path: 'always', types: 'prefer-import', lib: 'always' },
		],
		'@typescript-eslint/tslint/config': [
			'error',
			{
				rules: {
					'completed-docs': [ true, 'enums', 'functions', 'methods' ],
					'no-inferred-empty-object-type': true,
				},
			},
		],
		'@typescript-eslint/unified-signatures': 'error',
	},
};
