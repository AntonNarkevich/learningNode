/**
 * Created by anton.narkevich on 12.02.14.
 */
/*global log4javascript*/
(function logConfig(global) {
	'use strict';

	var LOG_LEVEL = log4javascript.Level.ALL;

	var log = log4javascript.getLogger();
	var appender = new log4javascript.AjaxAppender('http://localhost:8900');
	var layout = new log4javascript.XmlLayout();

	appender.setLayout(layout);

	log.addAppender(appender);
	log.setLevel(LOG_LEVEL);

	(function doExport() {
		global.log = log4javascript.getLogger();
	}());
}(this));