/**
 * Created by anton.narkevich on 27.01.14.
 */
(function connectTest() {
	'use strict';

	var PORT = 1234,
		OPEN_COOKIE_NAME = 'username-cookie';

	var connect = require('connect'),
		http = require('http'),
		path = require('path');

	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.cookieParser())
		.use(function (req, res, next) {
			var date, username, cookies, cookieValue;

			cookieValue = req.cookies[OPEN_COOKIE_NAME];

			if (cookieValue) {
				console.log('read cookie value: ' + cookieValue);
			}
			else {
				date = new Date();
				username = 'Vasia ' + date.toString();

				res.cookie[OPEN_COOKIE_NAME] = username;

				console.log('Set cookie value: ' + username);
			}

			next();
		})
		.use(connect.static(__dirname));

	http.createServer(app).listen(PORT);
	console.log('Started server at ' + PORT);
}());
