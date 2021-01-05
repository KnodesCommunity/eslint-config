import angular from './angular';

export = {
	extends: './angular',
	overrides: [
		{
			files: [ angular.settings.unitTestPattern ],
			env: { jest: true, jasmine: false },
		},
	],
};
