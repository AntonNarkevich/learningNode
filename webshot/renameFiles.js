var fs = require('fs');
var urls = require('./urls.json');
var path = require('path');

urls.forEach(function(url, index) {

	var oldPath = path.join(__dirname, '/screenshots', index + '.png');
	var newPath = path.join(__dirname, '/screenshots', encodeURIComponent(url) + '.png');

	fs.rename(oldPath, newPath, function(err) {
		if (err) {
			console.log('Error processing %d', index);
		}

		console.log('%s renamed to %s', oldPath, newPath);
	});

});

