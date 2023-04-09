import { dirname, resolve } from 'path';

import { ESLint, Linter } from 'eslint';
import { globbySync } from 'globby';
import { vol } from 'memfs';
const realFs = jest.requireActual( 'fs' ) as typeof import( 'fs' );
const realFsPromises = jest.requireActual( 'fs/promises' ) as typeof import( 'fs/promises' );

const allSrc = globbySync( '**/*.ts', { cwd: resolve( __dirname, '../../src' ), fs: realFs } );
allSrc.forEach( src => {
	jest.mock(
		`@knodes/eslint-config/${src.replace( '.ts', '.js' )}`,
		() => jest.requireActual( resolve( __dirname, '../../src', src ) ),
		{ virtual: true } );
} );
jest.mock( 'fs', () => jest.requireActual( 'unionfs' ).ufs
	.use( jest.requireActual( 'memfs' ).vol )
	.use( jest.requireActual( 'fs' ) ) );

const fakeModule = resolve( __dirname, '../node_modules/@knodes/eslint-config' );
jest.mock( 'import-fresh/node_modules/resolve-from', () => {
	const actual = jest.requireActual( 'import-fresh/node_modules/resolve-from' );
	return ( from: string, module: string ) => {
		if( module.startsWith( fakeModule ) ){
			return `@knodes/eslint-config${module.replace( fakeModule, '' )}`;
		}
		return actual( from, module );
	};
} );

// Override eslint resolve
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires -- using transient dependency hidden export
const EslintModuleResolver = require( '@eslint/eslintrc' ).Legacy.ModuleResolver;
const EslintModuleResolverBaseResolve = EslintModuleResolver.resolve;
EslintModuleResolver.resolve = ( moduleName: string, relativeToPath: string ) => {
	const customModuleMatch = moduleName.match( /^@knodes\/eslint-config(?:\/(.*))?$/ );
	if( customModuleMatch ){
		if( customModuleMatch[1].startsWith( 'config-fragments' ) ){
			return resolve( fakeModule, `${customModuleMatch[1]}.js` );
		} else {
			return resolve( fakeModule, `config/${customModuleMatch[1]}.js` );
		}
	} else if( relativeToPath.startsWith( fakeModule ) && moduleName.match( /^\.{1,2}\// ) ){
		return resolve( dirname( relativeToPath ), `${moduleName}.js` );
	}
	return EslintModuleResolverBaseResolve( moduleName, relativeToPath );
};

const mockFileSym: unique symbol = Symbol();
export type MockFile = string & {__sym__: typeof mockFileSym};
export type TestFileParam = MockFile | string

const getCallerFile = () => {
	const originalFunc = Error.prepareStackTrace;

	let callerfile = '';
	const err = new Error();

	Error.prepareStackTrace = ( _err: any, stack: NodeJS.CallSite[] ) => stack;

	const stack = ( err.stack as any as any[] );
	const currentfile = stack.shift().getFileName();

	while ( stack.length ) {
		callerfile = stack.shift().getFileName();

		if( currentfile !== callerfile ) break;
	}

	Error.prepareStackTrace = originalFunc;

	return callerfile;
};

export class MockContext {
	private readonly _files = new Map<string, Promise<string>>();

	/**
	 * Register a file with its text content in the test context, and return the file relative path.
	 *
	 * @param file - The file relative path in the root.
	 * @param content - The file content.
	 * @returns the file relative path.
	 */
	public addFile( file: string, content: string ): MockFile {
		this._files.set( file, Promise.resolve( content ) );
		return file as any;
	}

	/**
	 * Register a real file from the fixtures folder or the given path, and return the file relative path.
	 *
	 * @param file - The file relative path in the root.
	 * @param relPathFromTest - The real file path. If not provided, defaults to `./fixtures/${file}`.
	 * @returns the file relative path.
	 */
	public addReal( file: string, relPathFromTest = `./fixtures/${file}` ): MockFile {
		const content = realFsPromises.readFile( resolve( getCallerFile(), '..', relPathFromTest ), 'utf-8' );
		this._files.set( file, content );
		return file as any;
	}

	/**
	 * Run the linter and return the errors.
	 *
	 * @param configFactory - A function called with the test root dir as parameter, that returns the config.
	 * @param files - A list of files to lint.
	 * @returns the linting errors.
	 */
	public async getErrors( configFactory: () => Linter.Config, ...files: [MockFile, ...MockFile[]] ): Promise<ESLint.LintResult[]> {
		await this._setupDir();

		try {
			const cli = new ESLint( {
				baseConfig: { ...configFactory() },
				useEslintrc: false,
				errorOnUnmatchedPattern: true,
			} );
			return await cli.lintFiles( files );
		} finally {
			this._cleanupDir();
		}
	}

	/**
	 * Initialize the test directory (create dir, write files).
	 */
	private async _setupDir(){
		await Promise.all( [ ...this._files.entries() ].map( async( [ file, content ] ) => {
			vol.fromJSON( {
				[file]: await content,
			} );
		} ) );
	}

	/**
	 * Cleanup the test directory.
	 */
	private _cleanupDir() {
		vol.reset();
	}
}
