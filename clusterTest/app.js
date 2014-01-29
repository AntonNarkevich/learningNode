/**
 * Created by anton.narkevich on 29.01.14.
 */
(function clusterTest() {
	var PORT = 8899;

	var cluster = require('cluster'),
		http = require('http'),
		os = require('os');

	var cpuCount = os.cpus().length,
		i;

	if (cluster.isMaster) {
		console.log('Master cluster process is working.');

		for (i = 0; i < cpuCount; i++) {
			cluster.fork();
		}

		cluster.on('exit', function (worker, code, signal) {
			console.log('Exited worker: ' + worker.process.pid);
		});

		cluster.on('disconnect', function(worker) {
			console.log('Disconnected worker: ' + worker.process.pid);
		});
	}
	else {
		console.log('Worker cluster process ' + process.pid + ' is working.');

		http.createServer(function (req, res) {
			res.writeHead(200);
			res.end('Child process ' + process.pid + ' handled the request.');
			console.log('Child process ' + process.pid + ' handled the request.');
		}).listen(PORT);
	}
}());