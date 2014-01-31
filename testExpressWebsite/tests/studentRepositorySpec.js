/**
 * Created by anton.narkevich on 31.01.14.
 */
describe('studentRepository', function () {
	it('should not fail on creation', function (done) {
		var repo = require('../dataAccess/studentRepository');

		console.log('it works');
	});

	it('should return students object', function (done) {
		var repo = require('../dataAccess/studentRepository'),
			util = require('util');

		var students = repo.readAll();
		console.log('students value is: ' + util.inspect(students));

		expect(students).toBeDefined();
	});

});