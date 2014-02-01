process.on('message', function(m, server) {
	if (m === 'server') {
		server.on('connection', function (socket) {
			setTimeout(function(){
				socket.end('handled by child');
				console.log('handled by child');
			}, 200);
		});
	}
});