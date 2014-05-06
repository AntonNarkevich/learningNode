'use strict';

var urls = require('./urls.json');
var customHtmlPageNumbers = require('./customHtmlPageNumbers.json');
var jade = require('jade');
var fs = require('fs');
var _ = require('underscore');

var loadsOfCustomContentPages = _(customHtmlPageNumbers.loadsOfCustomContent).map(function(pageNumber) {
	return {
		number: pageNumber,
		url: urls[pageNumber]
	};
});

var justAlignImage = _(customHtmlPageNumbers.justAlignImage).map(function(pageNumber) {
	return {
		number: pageNumber,
		url: urls[pageNumber]
	};
});

loadsOfCustomContentPages.forEach(function(element) {
	console.log(element.url);
});