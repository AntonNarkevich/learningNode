'use strict';

var ejs = require('ejs');
var beautify_html = require('js-beautify').html;

var path = require('path');
var fs = require('fs');

var FILENAME = 'test.ejs';
var OUTPUT_FILENAME = 'test.html';

fs.readFile(path.normalize(FILENAME), function (err, data) {
	if (err) {
		console.error(err);
	}

	var html = ejs.render(data.toString(), { filename: OUTPUT_FILENAME });
	beautify_html(html, {'indent_with_tabs': true });

	console.log('Compiled');

	fs.writeFile(OUTPUT_FILENAME, html, function (err) {
		if (err) {
			throw err;
		}

		console.log('Written to %s', OUTPUT_FILENAME);
	});
});