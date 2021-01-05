export = {
	extends: './ts-base',
	overrides: [
		{ files: [ '*.ts{x,}' ], extends: '../config-fragments/plugins/rxjs' },
	],
};
