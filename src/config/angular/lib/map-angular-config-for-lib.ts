import { Linter } from 'eslint';

const mapFile = ( files: string | string[] ): string | string[] => {
	if( typeof files === 'string' ){
		if( files.startsWith( './src' ) ) {
			return [ files, files.replace( /^\.\/src/, './*/src' ) ];
		} else {
			return files;
		}
	} else {
		return files.flatMap( f => mapFile( f ) );
	}
};
const mapExtend = ( extend: string | string[] ): string | string[] => {
	if( typeof extend === 'string' ){
		if( extend.startsWith( '../' ) ) {
			return extend.replace( /^\.\.\//, '../../' );
		} else {
			return extend;
		}
	} else {
		return extend.flatMap( f => mapExtend( f ) );
	}
};
const mapOverride = ( override: Linter.ConfigOverride ): Linter.ConfigOverride => {
	override = { ...override };
	override.files = mapFile( override.files );
	if( override.overrides ){
		override.overrides = override.overrides.map( o => mapOverride( o ) );
	}
	if( override.extends ){
		override.extends = mapExtend( override.extends );
	}
	return override;
};

export const mapAngularConfigForLib = ( config: Linter.Config ): Linter.Config => ( {
	...config,
	overrides: config.overrides?.map( ( o: any ) => mapOverride( o ) ),
} );
