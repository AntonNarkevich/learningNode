/**
 * Created by anton.narkevich on 30.01.14.
 */
(function studentController() {
	'use strict';

	var path = require('path'),
		repo = require('../dataAccess/studentRepository');

	module.exports.index = function (req, res) {
		var allStudents = repo.readAll();

		res.render(path.normalize('/student/index'), {students: allStudents});
	};

	module.exports.destroy = function (req, res) {
		repo.remove(req.params.id);

		res.redirect('/student');
	};

	module.exports.new = function (req, res) {
		res.render(path.normalize('/student/create'));
	};

	module.exports.create = function (req, res) {
		var student = {
			id: req.body.id,
			name: req.body.name,
			age: req.body.age
		};

		console.log(student);

		repo.create(student);
		res.redirect('/student');
	};

	module.exports.show = function(req, res) {
		var student = repo.read(req.params.id);

		res.render(path.normalize('/student/details'), student);
	};

}());