/**
 * Created by anton.narkevich on 30.01.14.
 */
(function studentController() {
	'use strict';

	module.exports.index = function (req, res) {
		res.send('index action has been invoked');
	};

	module.exports.update = function (req, res) {
		res.send('update action has been invoked');
	};

	module.exports.custom = function custom(req, res) {
		res.send('some custom action');
	};
	module.exports.custom.verb = 'del';
}());