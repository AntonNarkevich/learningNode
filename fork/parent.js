/**
 * Created by anton.narkevich on 28.01.14.
 */
(function parentProcess() {
	var fork = require('child_process').fork;

	var child = fork('./child.js');

	child.on('message', function (message) {
		console.log('Parent got a message:\n' + message);
	});

	child.send('Hello child');
	child.send('I\'m going to kill you');

	setTimeout(function() {
		child.kill();
	}, 1000)
}());