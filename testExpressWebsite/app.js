(function appMain() {
	'use strict';

	var express = require('express');
	var http = require('http');
	var path = require('path');
	var mapRoute = require('./mapRoute');
	var lessMiddleware = require('less-middleware');

	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(lessMiddleware({
		src:'../less',
		dest: '/stylesheets',
		root: path.join(__dirname + '/public'),
//		compress: true,
		debug: true
//		optimization: 2,
//		yuicompress: true
	}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'bower_components')));


	// development only
	if ('development' === app.get('env')) {
		app.use(express.errorHandler());
	}

	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});

	mapRoute(app);
}());

