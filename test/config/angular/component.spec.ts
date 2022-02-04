import { MockContext } from '../../utils';

describe( 'Angular', () => {
	describe( 'Component', () => {
		describe( 'Code', () => {
			it( 'should work for basic component', async () => {
				const ctx = new MockContext();
				const testedFile = ctx.addFile( './src/app/basic.component.ts', `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component( { changeDetection: ChangeDetectionStrategy.OnPush } )
export class FooComponent {}
` );
				const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
				const errors = await ctx.getErrors(
					dir => ( {
						extends: '@knodes/eslint-config/angular',
						parserOptions: { project: tsconfig, tsconfigRootDir: dir },
					} ),
					testedFile );
				expect( errors[0].messages ).toEqual( [] );
			} );
			it( 'should work for basic component 2', async () => {
				const ctx = new MockContext();
				const testedFile = ctx.addReal( './src/basic.component.ts' );
				const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
				const errors = await ctx.getErrors(
					dir => ( {
						extends: '@knodes/eslint-config/angular',
						parserOptions: { project: tsconfig, tsconfigRootDir: dir },
					} ),
					testedFile );
				expect( errors[0].messages ).toEqual( [] );
			} );
		} );
	} );
} );
