const preset = require( 'ts-jest/presets/default/jest-preset' );

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		...preset.transform,
		['^.+\\.js$']: 'babel-jest',
	},
	transformIgnorePatterns: [ 'node_modules/(?!globby|array-union|slash)' ],
	modulePathIgnorePatterns: [ './.test' ],
};
