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
		path = require('path'),
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;

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

		return done(null, false, {msg: errMessage});
	}));

	var app = express();

	app.configure(function () {
		app.set('views', path.join(__dirname, '/views'));
		app.set('view engine', 'jade');

//		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
//
//		app.use(express.cookieParser('keyboard cat'));
//		app.use(express.session());

		app.use(passport.initialize());
//		app.use(passport.session());

		app.use(app.router);

		app.use(express.static(path.join(__dirname, '/public')));
	});

	app.get('/', function (req, res) {
		res.render('index', { title: 'index page', user: req.user});
	});

	app.get('/login', function (req, res) {
		var username = req.user ? req.user.username : '';

		res.render('login', {title: 'login page', username: username});
	});

	app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function (req, res) {
		res.redirect('/');
	});

	http.createServer(app).listen(3000);

	console.log('Listening on port 3000');
}());