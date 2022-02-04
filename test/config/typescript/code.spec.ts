import { MockContext } from '../../utils';

describe( 'Typescript', () => {
	describe( 'Code', () => {
		describe( 'jsdoc', () => {
			describe( 'Function', () => {
				it( 'should detect missing overload documentation on function', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/test.ts', `
export function foo( bar: string ): string;
export function foo( bar: number ): number;
export function foo( this: string, bar: string | number ): string | number {
	return bar + this;
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							extends: '@knodes/eslint-config/ts',
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [
						expect.objectContaining( { messageId: 'missingJsDoc' } ),
					] );
				} );
				it( 'should detect overload documentation on function', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/test.ts', `
/**
 * Do some foo
 *
 * @param bar - The bar to handle.
 */
export function foo( bar: string ): string;
export function foo( bar: number ): number;
export function foo( this: string, bar: string | number ): string | number {
	return bar + this;
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							extends: '@knodes/eslint-config/ts',
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [] );
				} );
			} );
			describe( 'Class', () => {
				it( 'should detect missing overload documentation on class', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/test.ts', `
export class Qux {
	public foo( bar: string ): string;
	public foo( bar: number ): number;
	public foo( bar: string | number ): string | number {
		return bar;
	}
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							extends: '@knodes/eslint-config/ts',
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [
						expect.objectContaining( { messageId: 'missingJsDoc' } ),
					] );
				} );
				it( 'should detect overload documentation on class', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/test.ts', `
export class Qux {
	/**
	 * Do some foo
	 *
	 * @param bar - The bar to handle.
	 */
	public foo( bar: string ): string;
	public foo( bar: number ): number;
	public foo( this: string, bar: string | number ): string | number {
		return bar;
	}
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							extends: '@knodes/eslint-config/ts',
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [] );
				} );
			} );
			describe( 'TypeDoc tags', () => {
				it.each( [[ 'template', 'typeparam' ]] )( 'should report to replace TypeDoc tag %s with %s', async ( tag, prefered ) => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/test.ts', `
/**
 * @${tag} some content
 */
export const foo = 1;
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							extends: '@knodes/eslint-config/ts',
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [ expect.objectContaining( {
						ruleId: 'jsdoc/check-tag-names',
						message: `Invalid JSDoc tag (preference). Replace "${tag}" JSDoc tag with "${prefered}".`,
					} ) ] );
				} );
				it.each( [ 'category', 'typeparam', 'usage' ] )( 'should not report TypeDoc tag %s', async tag => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/test.ts', `
/**
 * @${tag} some content
 */
export const foo = 1;
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							extends: '@knodes/eslint-config/ts',
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [] );
				} );
			} );
		} );
		describe( 'typescript', () => {
			it( 'should not trigger typescript error on JS file', async () => {
				const ctx = new MockContext();
				const testedFile = ctx.addFile( './src/foo.js', `
module.exports = {};
` );
				const errors = await ctx.getErrors(
					() => ( {
						env: { node: true },
						extends: '@knodes/eslint-config/ts',
					} ),
					testedFile );
				expect( errors[0].messages ).toEqual( [] );
			} );
			describe( 'Naming convention', () => {
				it( 'should warn for naming conventions on class methods', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/foo.ts', `
export class Foo {
	public bar(): string {
		return 'bar';
	}
	protected baz(): string {
		return 'bar';
	}
	private qux(): string {
		return 'bar';
	}
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							env: { node: true },
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
							extends: '@knodes/eslint-config/ts',
							rules: {
								'jsdoc/require-jsdoc': 'off',
							},
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [
						expect.objectContaining( {
							line: 9,
							messageId: 'missingUnderscore',
							message: expect.stringMatching( /`qux`/ ),
							ruleId: '@typescript-eslint/naming-convention',
						} ),
					] );
				} );
				it( 'should warn for naming conventions on class get/set', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/foo.ts', `
export class Foo {
	public get bar(): string {
		return 'bar';
	}
	public set bar( x: string ): void {
		x += 'a';
	}
	protected get baz(): string {
		return 'bar';
	}
	protected set baz( x: string ): void {
		x += 'a';
	}
	private get qux(): string {
		return 'bar';
	}
	private set qux( x: string ): void {
		x += 'a';
	}
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							env: { node: true },
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
							extends: '@knodes/eslint-config/ts',
							rules: {
								'jsdoc/require-jsdoc': 'off',
							},
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [
						expect.objectContaining( {
							line: 15,
							messageId: 'missingUnderscore',
							message: expect.stringMatching( /`qux`/ ),
							ruleId: '@typescript-eslint/naming-convention',
						} ),
						expect.objectContaining( {
							line: 18,
							messageId: 'missingUnderscore',
							message: expect.stringMatching( /`qux`/ ),
							ruleId: '@typescript-eslint/naming-convention',
						} ),
					] );
				} );
				it( 'should warn for naming conventions on class properties', async () => {
					const ctx = new MockContext();
					const testedFile = ctx.addFile( './src/foo.ts', `
export class Foo {
	public readonly bar = 'bar';
	protected readonly baz = 'bar';
	private readonly qux = 'bar';
}
` );
					const tsconfig = ctx.addFile( './tsconfig.json', JSON.stringify( { files: [ testedFile ] } ) );
					const errors = await ctx.getErrors(
						dir => ( {
							env: { node: true },
							parserOptions: { project: tsconfig, tsconfigRootDir: dir },
							extends: '@knodes/eslint-config/ts',
							rules: {
								'jsdoc/require-jsdoc': 'off',
							},
						} ),
						testedFile );
					expect( errors[0].messages ).toEqual( [
						expect.objectContaining( {
							line: 5,
							messageId: 'missingUnderscore',
							message: expect.stringMatching( /`qux`/ ),
							ruleId: '@typescript-eslint/naming-convention',
						} ),
					] );
				} );
			} );
		} );
	} );
} );
