import angular from './angular';

export = {
	extends: './angular',
	overrides: [
		{
			files: angular.overrides[0].files,
			env: { jest: true, jasmine: false },
		},
	],
};
