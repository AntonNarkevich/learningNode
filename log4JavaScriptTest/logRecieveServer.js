/**
 * Created by anton.narkevich on 12.02.14.
 */
'use strict';

var PORT = 8900;

var http = require('http'),
	qs = require('querystring');

http.createServer(function(req, resp) {
	var postData = '',
		postParameters;

	if (req.method === 'POST') {
		req.on('data', function (data) {
			postData += data;
		});

		req.on('end', function () {
			postParameters = qs.parse(postData);
			console.log(postParameters);

			resp.end('Your POST request has been processed');
		});
	} else {
		resp.end('Your GET request has been processed');
	}

}).listen(PORT);