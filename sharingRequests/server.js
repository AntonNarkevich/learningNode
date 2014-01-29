(function server() {
	var PORT = 8899;

	var net = require('net'),
		fork = require('child_process').fork;

	var subserver = fork('./subserver.js');

	var server = net.createServer();

	server.on('connection', function(soket) {
		soket.end('The request handled by main server');
		console.log('The request handled by main server');
	});

	server.on('error', function(err) {
		console.log(err);
	});

	server.listen(PORT);

	console.log('Server has been started.');
}());