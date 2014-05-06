'use strict';

var webshot = require('webshot');
var urls = require('./urls.json');
var util = require('util');
var argv = require('optimist').argv;

var options = {
	screenSize: {
		width: 1024,
		height: 1300
	},
	renderDelay: argv.d || 20000
};

argv._.forEach(function(linkIndex) {
	var url = urls[linkIndex];

	webshot(url, util.format('screenshots/%s.png', linkIndex), options, function(err) {
		if (err) {
			console.error('[%d] Error occured processing %s.', linkIndex, url);
			console.error(err);
		} else {
			console.log('[%d] Screenshot of %s captured.', linkIndex, url);
		}
	});
});
