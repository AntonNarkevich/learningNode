/*jslint nomen: true*/
/*global __dirname*/
/*jslint nomen: false*/
(function staticWebServer() {
	'use strict';

	var http = require('http'),
		fs = require('fs'),
		async = require('async'),
		mime = require('mime'),
		path = require('path');

	var port = 1234,
		server;

	server = http.createServer(function (req, res) {
		console.log('Request url is: ' + req.url);

		/*jslint nomen: true*/
		var filename = path.join(__dirname, req.url);
		/*jslint nomen: false*/

		async.waterfall([
			function checkFile(callback) {
				fs.stat(filename, function (err, stats) {
					if (err) {
						//File not found
						res.writeHead(404);
						res.write('File not found. Bad request!');
						res.end();
					}
					else {
						if (stats.isFile()) {
							//Respond with a file
							callback();
						}
						else {
							//It is a folder
							res.writeHead(403);
							res.end('Folders are forbidden');
						}
					}
				});
			},
			function respondFile(testString, callback) {
				var fileStream, type;

				type = mime.lookup(filename);
				console.log('File type is: ' + type);
				res.setHeader('Content-Type', type);

				console.log(filename);
				fileStream = fs.createReadStream(filename);

				fileStream.on('open', function () {
					fileStream.pipe(res);
				});
				fileStream.on('error', function (err) {
					console.log(err);
				});
			}
		], function (err) {
			console.log(err);
		});
	});

	server.listen(port);
	console.log('Started server at ' + port);
}());