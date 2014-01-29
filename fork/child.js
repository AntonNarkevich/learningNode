(function childProcess() {
	'use strict';

	process.on('message', function(message) {
		console.log('Child got a message:\n' + message);

		process.send('I got it parent. You\'ve written: ' + message);
	});
}());