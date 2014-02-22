/*global io*/
(function (io, global) {
	'use strict';

	var socket = io.connect('http://localhost:8899');
	var outputParagraph = document.getElementById('outputParagraph');

	socket.on('myEvent', function (data) {
		console.log('myEvent: ' + data);
	});

	socket.on('anotherEvent', function (data) {
		console.log('anotherEvent: ' + data);
	});

	(function doExport() {
		global.sendMessageToServer = function(message) {
			socket.send(message);
		};
	}());
}(io, this));

