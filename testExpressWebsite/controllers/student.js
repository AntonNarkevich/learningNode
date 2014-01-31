/**
 * Created by anton.narkevich on 30.01.14.
 */
(function studentController() {
	'use strict';

	var repo = require('../dataAccess/studentRepository');

	module.exports.index = function (req, res) {
		var allStudents = repo.readAll();

		res.render('/student/index', {students: allStudents});
	};

	module.exports.update = function (req, res) {
		res.send('update action has been invoked');
	};

	module.exports.custom = function custom(req, res) {
		res.send('some custom action');
	};
	module.exports.custom.verb = 'del';
}());