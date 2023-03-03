import { getSingleTsFileResult } from '../../utils';

describe( 'Typescript', () => {
	describe( 'Code', () => {
		describe( 'jsdoc', () => {
			describe( 'Function', () => {
				it( 'should detect missing overload documentation on function', async () => {
					const result = await getSingleTsFileResult( './src/test.ts', `
export function foo( bar: string ): string;
export function foo( bar: number ): number;
export function foo( this: string, bar: string | number ): string | number {
	return bar + this;
}
` );
					expect( result.messages ).toEqual( [
						expect.objectContaining( { messageId: 'missingJsDoc' } ),
					] );
				} );
				it( 'should detect overload documentation on function', async () => {
					const result = await getSingleTsFileResult( './src/test.ts', `
/**
 * Do some foo
 *
 * @param bar - The bar to handle.
 * @returns something.
 */
export function foo( bar: string ): string;
export function foo( bar: number ): number;
export function foo( this: string, bar: string | number ): string | number {
	return bar + this;
}
` );
					expect( result.messages ).toEqual( [] );
				} );
			} );
			describe( 'Class', () => {
				it( 'should detect missing overload documentation on class', async () => {
					const result = await getSingleTsFileResult( './src/test.ts', `
export class Qux {
	public foo( bar: string ): string;
	public foo( bar: number ): number;
	public foo( bar: string | number ): string | number {
		return bar;
	}
}
` );
					expect( result.messages ).toEqual( [
						expect.objectContaining( { messageId: 'missingJsDoc' } ),
					] );
				} );
				it( 'should detect overload documentation on class', async () => {
					const result = await getSingleTsFileResult( './src/test.ts', `
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
					expect( result.messages ).toEqual( [] );
				} );
			} );
			describe( 'TypeDoc tags', () => {
				it.each( [[ 'template', 'typeparam' ]] )( 'should report to replace TypeDoc tag %s with %s', async ( tag, prefered ) => {
					const result = await getSingleTsFileResult( './src/test.ts', `
/**
 * @${tag} some content
 */
export const foo = 1;
` );
					expect( result.messages ).toEqual( [ expect.objectContaining( {
						ruleId: 'jsdoc/check-tag-names',
						message: `Invalid JSDoc tag (preference). Replace "${tag}" JSDoc tag with "${prefered}".`,
					} ) ] );
				} );
				it.each( [ 'category', 'typeparam', 'usage' ] )( 'should not report TypeDoc tag %s', async tag => {
					const errors = await getSingleTsFileResult( './src/test.ts', `
/**
 * @${tag} some content
 */
export const foo = 1;
` );
					expect( errors.messages ).toEqual( [] );
				} );
			} );
		} );
		describe( 'typescript', () => {
			const extraConfig = {
				eslint: {
					env: { node: true },
					rules: {
						'jsdoc/require-jsdoc': 'off' as const,
					},
				},
			};
			it( 'should not trigger typescript result on JS file', async () => {
				const result = await getSingleTsFileResult( './src/foo.js', `
module.exports = {};
`, extraConfig );
				expect( result.messages ).toEqual( [] );
			} );
			describe( 'Naming convention', () => {
				describe.each( [
					[ 'Instance', '' ],
					[ 'Static', 'static' ],
				] )( '%s', ( _, prefix ) => {
					it( 'should warn for naming conventions on class methods', async () => {
						const result = await getSingleTsFileResult( './src/foo.ts', `
export class Foo {
	public ${prefix} bar(): string {
		return 'bar';
	}
	protected ${prefix} baz(): string {
		return 'bar';
	}
	private ${prefix} qux(): string {
		return 'bar';
	}
}
`, extraConfig );
						expect( result.messages ).toEqual( [
							expect.objectContaining( {
								line: 9,
								messageId: 'missingUnderscore',
								message: expect.stringMatching( /`qux`/ ),
								ruleId: '@typescript-eslint/naming-convention',
							} ),
						] );
					} );
					it( 'should warn for naming conventions on class get/set', async () => {
						const result = await getSingleTsFileResult( './src/foo.ts', `
export class Foo {
	public ${prefix} get bar(): string {
		return 'bar';
	}
	public ${prefix} set bar( x: string ): void {
		x += 'a';
	}
	protected ${prefix} get baz(): string {
		return 'bar';
	}
	protected ${prefix} set baz( x: string ): void {
		x += 'a';
	}
	private ${prefix} get qux(): string {
		return 'bar';
	}
	private ${prefix} set qux( x: string ): void {
		x += 'a';
	}
}
`, extraConfig );
						expect( result.messages ).toEqual( [
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
						const result = await getSingleTsFileResult( './src/foo.ts', `
export class Foo {
	public ${prefix} readonly bar = 'bar';
	protected ${prefix} readonly baz = 'bar';
	private ${prefix} readonly qux = 'bar';
}
`, extraConfig );
						expect( result.messages ).toEqual( [
							expect.objectContaining( {
								line: 5,
								messageId: 'missingUnderscore',
								message: expect.stringMatching( /`qux`/ ),
								ruleId: '@typescript-eslint/naming-convention',
							} ),
						] );
					} );
				} );
				it( 'should not warn for naming conventions on same class static', async () => {
					const result = await getSingleTsFileResult( './src/foo.ts', `
export class Foo {
	private static _prop: string;
	private static get _getset(): string {
		return this._prop;
	}
	private static set _getset( val: string ): void {
		this._prop = val;
	}
	private static _method(): string {
		return 'bar';
	}
	public method(){
		let ret = '';
		ret += Foo._prop;
		ret += Foo._getset;
		ret += Foo._method();
		return ret;
	}
}
`, extraConfig );
					expect( result.messages ).toEqual( [] );
				} );
			} );
		} );
	} );
} );
