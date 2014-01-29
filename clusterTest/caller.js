/**
 * Created by anton.narkevich on 29.01.14.
 */
(function caller() {
	var http = require('http');

	var i;

	for (i = 0; i < 100; i += 1) {
		http.get('http://localhost:8899', function (res) {
			console.log('Response has been recieved');

			res.on('data', function (chunk) {
				console.log('Chunk: ' + chunk);
			});
		});
	}
}());