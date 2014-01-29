/**
 * Created by anton.narkevich on 28.01.14.
 */
(function mainServer() {
	'use strict';

	var LOG_FILENAME = 'subserverLog.txt';

	var http = require('http'),
		httpProxy = require('http-proxy'),
		portConfig = require('./portConfig.json'),
		spawn = require('child_process').spawn,
		fs = require('fs');

	//Must use Sync here to pass wait while descriptor is created
	//and open event fires
	var log = fs.openSync(LOG_FILENAME, 'a');

	//Starting subservers
	var staticServer = spawn(process.env.comspec, ['/c', 'node', 'static.js'],
			{stdio: ['ignore', log, log]}),
		dynamicServer = spawn(process.env.comspec, ['/c', 'node', 'dynamic.js'],
			{stdio: ['ignore', log, log]});

	var proxy = httpProxy.createProxyServer();

	http.createServer(function (req, res) {
		if (req.url.match(/\/dynamic/)) {
			proxy.web(req, res, {
				target: {
					host: 'localhost',
					port: portConfig.dynamic
				}
			});

			console.log('Redirected to dynamic');
		}
		else {
			proxy.web(req, res, {
				target: {
					host: 'localhost',
					port: portConfig.static
				}
			});

			console.log('Redirected to static');
		}

	}).listen(portConfig.proxy);

	console.log('Created proxy server at localhost: ' + portConfig.proxy);
}());