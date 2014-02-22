/**
 * Created with JetBrains WebStorm.
 * User: Neurosis
 * Date: 2/22/14
 * Time: 10:34 AM
 * To change this template use File | Settings | File Templates.
 */
(function oAuth2Test() {
	'use strict';

	var APP_PORT = 8899,
		COOKIE_SECRET = 'the best secret ever';

	var redis = require('redis'),
		util = require('util'),
		express = require('express'),
		passport = require('passport'),
		TwitterStrategy = require('passport-twitter').Strategy,
		http = require('http'),
		path = require('path'),
		flash = require('connect-flash');

	var client = redis.createClient();

	var TWITTER_API_KEY = 'pWsppRmUzmBpfFATg7Q',
		TWITTER_API_SECRET = 'xySc0vdSiEylNXb3IU7AhLChpYlzMNFgieyF2ustbo';

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		console.log(id);

		client.hgetall(id, function (err, userInfo) {
			if (err) {
				return done(err);
			}

			if (!userInfo) {
				return done({message: 'User information not found'});
			}

			return done(null, userInfo);
		});
	});

	passport.use(new TwitterStrategy(
		{
			consumerKey: TWITTER_API_KEY,
			consumerSecret: TWITTER_API_SECRET,
			callbackURL: 'http://localhost:' + APP_PORT + '/auth/callback'
		},
		function (token, tokenSecret, profile, done) {
			var id = profile.id;

			client.hmset(id, profile, function () {
				done(null, profile);
			});
		}
	));

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
		}
	}

	var app = express();

	app.configure(function () {
		app.set('views', path.join(__dirname, '/views'));
		app.set('view engine', 'jade');

		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser(COOKIE_SECRET));
		app.use(express.session());

		app.use(passport.initialize());
		app.use(passport.session());

		app.use(flash());

		app.use(app.router);
		app.use(express.static(path.join(__dirname, '/public')));
	});

	app.get('/', function (req, res) {
		res.render('index', {title: 'Index page'});
	});

	app.get('/auth', passport.authenticate('twitter'), function (req, res) {
	});

	app.get('/auth/callback', passport.authenticate('twitter'), function (req, res) {
		res.redirect('/admin');
	});

	app.get('/admin', ensureAuthenticated, function(req,res) {
		var userInfo = req.user;

		res.render('admin', {title:'Admin page', userInfo: util.inspect(userInfo)});
	});

	http.createServer(app).listen(APP_PORT);

	console.log('Started server at localhost:' + APP_PORT);

}());