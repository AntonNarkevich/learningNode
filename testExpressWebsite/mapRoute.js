/**
 * Created by anton.narkevich on 30.01.14.
 */
(function mapRoute() {
	'use strict';

	var fs = require('fs'),
		path = require('path'),
		_ = require('underscore'),
		util = require('util');

	/**
	 * Path to folder with .js controllers
	 * @type {string}
	 */
	var CONTROLLERS_FOLDER = './controllers';

	/**
	 * Set of default routes in the following format:
	 * actionName - controller should have method named like this
	 * route - route where prefix will be replaced with controller name
	 * verb - Express app method name which represent http verb.
	 * i.e. del instead of DELETE.
	 * @type {*[]}
	 */
	var DEFAULT_ROUTES = {
		index: {
			route: '/prefix',
			verb: 'get'
		},
		new: {
			route: '/prefix/new',
			verb: 'get'
		},
		create: {
			route: '/prefix',
			verb: 'post'
		},
		show: {
			route: '/prefix/:id',
			verb: 'get'
		},
		edit: {
			route: '/prefix/:id/edit',
			verb: 'get'
		},
		update: {
			route: '/prefix/:id',
			verb: 'put'
		},
		destroy: {
			route: '/prefix/:id',
			verb: 'del'
		}
	};

	/**
	 * Maps all controller methods to special routes
	 * for REST methods uses special verbs.
	 * For other - GET verb.
	 * @param app
	 * Express app
	 * @param prefix
	 * Prefix for REST operations e.g. /prefix/index
	 * @param controllerFileName
	 * Abs path to the controller module
	 */
	function registerRoutes(app, prefix, controllerFileName) {
		var controller = require(controllerFileName),
			actions = _.functions(controller);

		console.log('Registring: ' + controllerFileName);

		actions.forEach(function (actionName) {
			var route, verb;

			var routeInfo = DEFAULT_ROUTES[actionName],
				action = controller[actionName];

			if (routeInfo) {
				//The actin is default
				route = routeInfo.route.replace(/^\/prefix/, '/' + prefix);
				verb = routeInfo.verb;

				app[verb](route, action);

				console.log('Registered: ' + verb + ' ' + route);
			}
			else {
				route = action['route'] || '/' + prefix + '/' + actionName;
				verb = action['verb'] || 'get';

				app[verb](route, action);

				console.log('Registered: ' + verb + ' ' + route);
			}
		});
	}

	/**
	 * Gets all the controllers and maps to the REST
	 * routes
	 * @param app
	 * Express app parameter
	 */
	module.exports = function map(app) {
		fs.readdir(CONTROLLERS_FOLDER, function (err, files) {
			if (!err) {
				var jsFiles = files.filter(function (file) {
					return file.match(/\.js$/);
				});

				console.log('Found controllers: ' + jsFiles);

				jsFiles.forEach(function (file) {
					var controllerName = path.basename(file, '.js'),
						absFileName = path.join(__dirname, CONTROLLERS_FOLDER, file);

					registerRoutes(app, controllerName, absFileName);
				});
			}
			else {
				console.log(err);

				throw err;
			}
		});
	};
}());