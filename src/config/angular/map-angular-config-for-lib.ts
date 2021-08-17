import { dirname, relative } from 'path';

import { resolve } from 'path/posix';

import { Linter } from 'eslint';

const mapFile = ( files: string | string[] ): string | string[] => {
	if( typeof files === 'string' ){
		if( files.startsWith( './src' ) ) {
			return [ files, files.replace( /^\.\/src/, './**/src' ) ];
		} else {
			return files;
		}
	} else {
		return files.flatMap( f => mapFile( f ) );
	}
};
const mapExtend = ( extend: string | string[], replaceImport: ( file: string ) => string  ): string | string[] => {
	if( typeof extend === 'string' ){
		return replaceImport( extend );
	} else {
		return extend.flatMap( f => mapExtend( f, replaceImport ) );
	}
};
const mapOverride = ( override: Linter.ConfigOverride, replaceImport: ( file: string ) => string ): Linter.ConfigOverride => {
	override = { ...override };
	override.files = mapFile( override.files );
	if( override.overrides ){
		override.overrides = override.overrides.map( o => mapOverride( o, replaceImport ) );
	}
	if( override.extends ){
		override.extends = mapExtend( override.extends, replaceImport );
	}
	return override;
};

export const mapAngularConfigForLib = ( overridePath: string, baseConfigRelative: string ): Linter.Config => {
	const baseConfigPath = resolve( dirname( overridePath ), baseConfigRelative );
	// eslint-disable-next-line @typescript-eslint/no-var-requires -- will be transpiled as-is.
	const baseConfig = require( baseConfigPath );
	const replaceImport = ( file: string ): string => {
		const actualTarget = resolve( dirname( baseConfigPath ), file );
		return relative( dirname( overridePath ), actualTarget );
	};
	return {
		...baseConfig,
		overrides: baseConfig.overrides?.map( ( o: any ) => mapOverride( o, replaceImport ) ),
		settings: {
			unitTestPatterns: mapFile( baseConfig.settings?.unitTestPatterns ?? [] ),
			e2eTestPattern: baseConfig.settings?.e2eTestPattern,
		},
	};
};
