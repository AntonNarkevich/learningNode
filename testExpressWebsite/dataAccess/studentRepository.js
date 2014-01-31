/**
 * Created by anton.narkevich on 31.01.14.
 */
'use strict';

var DB_FILE_PATH = './students.json';

var students = require(DB_FILE_PATH),
	fs = require('fs'),
	path = require('path');

console.log(students);

function submitChanges(callback) {
	var filename = path.join(__dirname, DB_FILE_PATH);
	fs.writeFile(filename, JSON.stringify(students), 'utf8', callback);
}

function read(id) {
	return students[id];
}

function readAll() {
	return students;
}

function create(student) {
	students[student.id] = student;
	submitChanges();
}

function remove(id) {
	delete students[id];
	submitChanges();
}

(function doExport() {
	module.exports.submitChanges = submitChanges;
	module.exports.read = read;
	module.exports.readAll = readAll;
	module.exports.create = create;
	module.exports.remove = remove;
}());

