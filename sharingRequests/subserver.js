(function subserver() {
	console.log('Subserver has been started.');

	process.on('message', function(message, server) {
		if (message = 'server') {
			server.on('connection', function(socket) {
				socket.end('Handled by child process.');
				console.log('Handled by child process.');
			})
		}
	})
}());