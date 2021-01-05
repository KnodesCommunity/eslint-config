export = {
	extends: './ts',
	overrides: [
		{ files: [ '*.ts{x,}' ], extends: '../config-fragments/plugins/rxjs' },
	],
};
