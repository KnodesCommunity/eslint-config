import { MockContext } from '../../utils';

describe( 'Angular', () => {
	describe( 'Config', () => {
		it( 'should not trigger typescript error on JS file', async () => {
			const ctx = new MockContext();
			const testedFile = ctx.addFile( './webpack.config.js', `
module.exports = {};
` );
			const errors = await ctx.getErrors(
				_dir => ( {
					extends: '@knodes/eslint-config/angular',
				} ),
				testedFile );
			expect( errors[0].messages ).toEqual( [] );
		} );
	} );
} );
