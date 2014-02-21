/**
 * Created by anton.narkevich on 20.02.14.
 */
(function authenticationApp() {
	'use strict';

	var USERS = {
		'vasia': 'vas pass',
		'petia': 'pet pass'
	};

	var express = require('express'),
		http = require('http'),
		fs = require('fs'),
		https = require('https'),
		path = require('path'),
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		flash = require('connect-flash');

	passport.serializeUser(function (user, done) {
		done(null, user.name);
	});

	passport.deserializeUser(function (name, done) {
		var password = USERS[name];

		if (password) {
			var user = {
				name: name,
				pass: password
			};

			done(null, user);
		} else {
			done({message: 'Can\'t deserialize, user not found'});
		}
	});

	passport.use(new LocalStrategy(function (username, password, done) {
		console.log('LocalStrategy config function has been called.');

		var truePassword = USERS[username];

		if (password === truePassword) {
			var user = {
				name: username,
				pass: password
			};

			return done(null, user);
		}

		var errMessage = truePassword ? 'Wrong passord' : 'User not found';

		return done(null, false, {message: errMessage});
	}));

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			next();

			return;
		}

		res.redirect('/login');
	}


	/*Common configurations for http and https servers*/
	var sessionConfiguration = express.session();
//		passportConfiguration = passport.initialize(),
//		passportSessionConfiguration = passport.session(),
//		flashConfiguration = flash();

	var app = express();

	app.configure(function () {
		app.set('views', path.join(__dirname, '/views'));
		app.set('view engine', 'jade');

		app.use(express.logger('dev'));
		app.use(express.bodyParser());

		app.use(express.cookieParser('optional cookie secret for session'));
		app.use(sessionConfiguration);

		app.use(passport.initialize());
		app.use(passport.session());
		app.use(flash());

		app.use(app.router);

		app.use(express.static(path.join(__dirname, '/public')));
	});

	app.get('/', function (req, res) {
		res.render('index', {title: 'index page', user: req.user});
	});

	app.get('/login', function (req, res) {
		var username = req.user ? req.user.name : '';

		res.render('login', {title: 'login page', username: username, message: req.flash('error')});
	});

	app.get('/admin', ensureAuthenticated, function (req, res) {
		res.render('admin', { title: 'Admin page' });
	});

	http.createServer(app).listen(3000);

	console.log('Listening on port 3000');


	/*Dancing with 2 servers and single session*/
	var secureApp = express();

	secureApp.configure(function () {
		secureApp.use(express.logger('dev'));
		secureApp.use(express.bodyParser());

		secureApp.use(express.cookieParser('optional cookie secret for session'));
		secureApp.use(sessionConfiguration);

		secureApp.use(passport.initialize());
		secureApp.use(passport.session());
		secureApp.use(flash());

		secureApp.use(app.router);

		secureApp.use(express.static(path.join(__dirname, '/public')));
	});

	secureApp.post('/login', passport.authenticate('local', {failureRedirect: 'http://localhost:3000/login', failureFlash: true}), function (req, res) {
		res.redirect('http://localhost:3000');
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