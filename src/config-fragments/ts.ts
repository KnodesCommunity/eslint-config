/* eslint-disable max-len -- long contexts */
import jsdoc from './plugins/jsdoc';

export = {
	plugins: [
		'import',
	],
	settings: {
		jsdoc: {
			tagNamePreference: {
				template: 'typeparam',
			},
		},
	},
	extends: [
		'plugin:import/typescript',
		'./js',
		'./plugins/import',
		'./plugins/typescript-eslint',
		'./plugins/eslint',
	],
	rules: {
		'indent': 'off',
		'no-redeclare': 'off',
		'no-shadow': 'off',
		'no-dupe-class-members': 'off',
		'import/export': 'off',
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-jsdoc': [ 'error', {
			contexts: [
				'ExportNamedDeclaration[declaration.type="TSDeclareFunction"]:not(ExportNamedDeclaration[declaration.type="TSDeclareFunction"] + ExportNamedDeclaration[declaration.type="TSDeclareFunction"])',
				'ExportNamedDeclaration[declaration.type="FunctionDeclaration"]:not(ExportNamedDeclaration[declaration.type="TSDeclareFunction"] + ExportNamedDeclaration[declaration.type="FunctionDeclaration"])',
				'MethodDefinition[kind="method"][value.type="TSEmptyBodyFunctionExpression"]:not(MethodDefinition[value.type="TSEmptyBodyFunctionExpression"] + MethodDefinition[value.type="TSEmptyBodyFunctionExpression"])',
				'MethodDefinition[kind="method"][value.type="FunctionExpression"]:not(MethodDefinition[value.type="TSEmptyBodyFunctionExpression"] + MethodDefinition[value.type="FunctionExpression"])',
			],
			require: {
				FunctionDeclaration: false,
			},
		} ],
		'jsdoc/check-tag-names': [ 'error', {
			definedTags: [ 'category', 'typeparam', ...jsdoc.rules['jsdoc/check-tag-names'][1].definedTags ],
		} ],
		'no-underscore-dangle': 'off',
	},
}
/* eslint-enable max-len */
