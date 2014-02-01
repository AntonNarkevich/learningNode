var child = require('child_process').fork('sub.js');

// Open up the server object and send the handle.
var server = require('net').createServer();
server.on('connection', function (socket) {
	setTimeout(function () {
		socket.end('handled by parent');
		console.log('handled by parent');
	}, 200);

});
server.listen(1337, function () {
	child.send('server', server);
});

