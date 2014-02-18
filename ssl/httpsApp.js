(function httpsApp() {
	'use strict';

	var HTTPS_PORT = 444;

	var fs = require('fs'),
		https = require('https');

	var privateKey = fs.readFileSync('privateKey.key').toString(),
		certificate = fs.readFileSync('certificate.crt').toString();

	console.log(privateKey);
	console.log(certificate);

	var options = {
		key: privateKey,
		cert: certificate
	};

	https.createServer(options, function (req, res) {
		var body = "";

		req.on('data', function (chunk) {
			body += chunk;
		});
		req.on('end', function () {
			console.log('POSTed: ' + body);
			res.writeHead(200);
			res.end('Hello https World\n');
		});
	}).listen(HTTPS_PORT);

	console.log('Running https server at ' + HTTPS_PORT);
}());