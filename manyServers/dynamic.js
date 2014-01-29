/**
 * Created by anton.narkevich on 28.01.14.
 */
(function dynamicServer() {
	'use strict';

	var crossroads = require('crossroads'),
		http = require('http'),
		util = require('util'),
		portConfig = require('./portConfig.json');

	crossroads.addRoute('/dynamic/{id}', function (req, res, id) {
		console.log('Route matches. Id: ' + id);
		res.end('Dynamic processing. Id: ' + id);
	});

	crossroads.bypassed.add(function defaultRoute(req, res) {
		console.log('Bypassed has been called');
		res.end('Default route. Route not found');
	});

	http.createServer(function (req, res) {
		res.write(util.inspect(req.headers) + '\n');

		crossroads.parse(req.url, [req, res]);
	}).listen(portConfig.dynamic);

	console.log('Created dynamic server at localhost:' + portConfig.dynamic);
}());