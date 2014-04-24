'use strict';

var urls = require('./urls.json');
var util = require('util');
var jade = require('jade');
var fs = require('fs');

var reportHtmlString = jade.renderFile('report.jade', urls);

fs.writeFile('report.html', reportHtmlString, function (err) {
	if (err) {
		console.log('Error occured while building the report.');
		console.log(err);
	} else {
		console.log('Report has been successfully built');
	}
});
