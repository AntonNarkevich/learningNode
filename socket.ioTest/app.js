'use strict';

var io = require('socket.io'),
	http = require('http');

var app = http.createServer(function (req, res) {

}).listen(8899);

var appIo = io.listen(app);

appIo.sockets.on('connection', function (socket) {
	process.stdin.on('data', function(data) {
		socket.emit('myEvent', data.toString());

		socket.emit('anotherEvent', data.toString());
	});

	socket.on('message', function(data) {
		console.log('Message from the client: ' + data.toString());
	});
});
