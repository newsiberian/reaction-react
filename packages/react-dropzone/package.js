Package.describe({
	summary: 'react-dropzone for Meteor',
	version: '3.0.0',
	name: 'den:react-dropzone'
});

Package.onUse(function (api) {
	api.versionsFrom('1.2.1');
	api.use('react-runtime');
	api.use('universe:modules');
	api.use('jsx');
	api.addFiles('dropzone.import.jsx');
	api.addFiles('attr-accept.import.js');
	api.export('_Dropzone');
});
