'use strict';

var cp = require('child_process');
var child = cp.fork('./worker');

child.on('message', function (m) {
	// Receive results from child process
	console.log('received from worker: ' + m);
});

// Send child process some work
child.send('Please up-case this string');

child.on('close', function (code) {
	console.log('childe exit code ' + code);
});