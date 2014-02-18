(function httpApp() {
	'use strict';

	var HTTP_PORT = 8890;

	var http = require('http');

	http.createServer(function (req, res) {
		var body = "";

		req.on('data', function (chunk) {
			body += chunk;
		});
		req.on('end', function () {
			console.log('POSTed: ' + body);
			res.writeHead(200);
			res.end('Hello http World\n');
		});
	}).listen(HTTP_PORT);

	console.log('Running http server at ' + HTTP_PORT);
}());