/**
 * Created by anton.narkevich on 28.01.14.
 */
(function staticServer() {
	'use strict';

	var connect = require('connect'),
		http = require('http'),
		portConfig = require('./portConfig.json');

	var app = connect()
		.use(connect.favicon())
		.use(connect.logger('dev'))
		.use(connect.static(__dirname));

	http.createServer(app).listen(portConfig.static);

	console.log('Created static server at: ' + portConfig.static);
}());