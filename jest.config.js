const preset = require( 'ts-jest/presets/default/jest-preset' );

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	...preset,
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		...preset.transform,
		['^.+\\.js$']: 'babel-jest',
	},
	testPathIgnorePatterns: [ '__tests__/utils/.*', '__tests__/.*/fixtures/.*' ],
	transformIgnorePatterns: [ 'node_modules/(?!globby|array-union|slash)' ],
};
