import { Linter } from 'eslint';
import { TsConfigSourceFile } from 'typescript';

import { MockContext } from './mock-context';

export const getSingleTsFileResult = async( filename: string, fileContent: string, configExtra?: {eslint?: Exclude<Linter.Config, 'parserOptions'>; tsconfig?: Partial<TsConfigSourceFile>} ) => {
	const ctx = new MockContext();
	const testedFile = ctx.addFile( filename, fileContent );
	const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { ...configExtra?.tsconfig, files: [ testedFile ] } ) );
	const results = await ctx.getErrors(
		() => ( {
			...configExtra?.eslint,
			parserOptions: { project: tsconfig },
			extends: '@knodes/eslint-config/ts',
		} ),
		testedFile );
	expect( results ).toHaveLength( 1 );
	return results[0];
};
