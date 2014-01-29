/**
 * Created by anton.narkevich on 28.01.14.
 */
(function simpleRedirection() {
	'use strict';

	var httpProxy = require('http-proxy'),
		path = require('path'),
		portConfig = require('./portConfig.json');

	httpProxy.createServer({target: 'http://www.amazon.com/'})
		.listen(portConfig.proxy);

	console.log('Created proxy server at localhost: ' + portConfig.proxy);
}());