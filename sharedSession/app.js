(function twoSessionsApp() {
	'use strict';

	var express = require('express'),
		http = require('http'),
		fs = require('fs'),
		https = require('https');

	var sessionConfiguration = express.session();

	(function httpApp() {
		var app = express();

		app.configure(function () {
			app.use(express.logger('dev'));
			app.use(express.bodyParser());

			app.use(express.cookieParser('optional cookie secret for session'));
			app.use(sessionConfiguration);

			app.use(app.router);
		});

		app.get('/session', function (req, res) {
			res.end(JSON.stringify(req.session));
		});

		app.get('/set', function (req, res) {
			var currentDate = new Date();

			req.session['App session value'] = currentDate.toString();

			res.redirect('/session');
		});

		http.createServer(app).listen(3000);

		console.log('Listening on port 3000');
	}());

	(function httpsApp() {
		var secureApp = express();

		secureApp.configure(function () {
			secureApp.use(express.logger('dev'));
			secureApp.use(express.bodyParser());

			secureApp.use(express.cookieParser('optional cookie secret for session'));
			secureApp.use(sessionConfiguration);

			secureApp.use(secureApp.router);
		});

		secureApp.get('/session', function (req, res) {
			res.end(JSON.stringify(req.session));
		});

		secureApp.get('/set', function (req, res) {
			var currentDate = new Date();

			req.session['App session value'] = currentDate.toString();

			res.redirect('/session');
		});

		var privateKey = fs.readFileSync('privateKey.key').toString(),
			certificate = fs.readFileSync('certificate.crt').toString();

		var credentials = {
			key: privateKey,
			cert: certificate
		};

		https.createServer(credentials, secureApp).listen(3001);

		console.log('Listening on port 3001');
	}());
}());
