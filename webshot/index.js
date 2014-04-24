'use strict';

var webshot = require('webshot');
var urls = require('./urls.json');
var util = require('util');

urls.forEach(function(url, index) {
	var options = {
		screenSize: {
			width: 1024,
			height: 1300
		},
		renderDelay: 60000
	};

	webshot(url, util.format('screenshots/%s.png', index), options, function(err) {
		if (err) {
			console.error('Error occured processing %s.', url);
			console.error(err);
		} else {
			console.log('Screenshot of %s captured.', url);
		}
	});
});
