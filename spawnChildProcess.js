'use strict';

var spawn = require('child_process').spawn;
var cp = spawn(process.env.comspec, ['/c', 'dir']);

cp.stdout.on('data', function (data) {
	console.log(data.toString());
});

cp.stderr.on('data', function (data) {
	console.error(data.toString());
});

cp.on('close', function (code) {
	console.log('exit code: ' + code);
});
