export = {
	plugins: [
		'import',
	],
	extends: [
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	rules: {
		'import/no-cycle': 'error',
		'import/no-deprecated': 'warn',
		'import/no-extraneous-dependencies': 'error',
		'import/no-unresolved': 'off',
		'import/no-useless-path-segments': 'error',
		// See https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/order.md
		'import/order': [
			'error',
			{
				'pathGroups': [
					{ pattern: '@scitizen/**', group: 'internal', position: 'before' },
					{ pattern: '~{*,}/**', group: 'internal', position: 'before' },
				],
				'pathGroupsExcludedImportTypes': [ 'builtin' ],
				'alphabetize': {
					order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
					caseInsensitive: true, /* ignore case. Options: [true, false] */
				},
				'groups': [
					'builtin',
					'external',
					'internal',
					[ 'parent', 'sibling', 'index' ],
				],
				'newlines-between': 'always-and-inside-groups',
			},
		],
	},
}
