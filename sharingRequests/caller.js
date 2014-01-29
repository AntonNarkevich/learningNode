/**
 * Created by anton.narkevich on 28.01.14.
 */
(function caller() {
	var net = require('net');

	for (i = 0; i < 1000; i += 1) {
		var client = net.connect({port: 8899},
			function () { //'connect' listener
				console.log('client connected');
				client.write('world!\r\n');
			});
		client.on('data', function (data) {
			console.log(data.toString());
			client.end();
		});
		client.on('end', function () {
			console.log('client disconnected');
		});
	}


}());