/**
 * Created by anton.narkevich on 23.01.14.
 */

var DIR_PATH = '.',
	LOG_PATH = './log/replacements.txt';

var fs = require('fs'),
	async = require('async'),
	util = require('util');

var log = fs.createWriteStream(LOG_PATH,
	{
		encoding: 'utf8',
		flags: 'a+'
	});

try {
	async.waterfall([
		function readData(callback) {
			fs.readdir(DIR_PATH, function (err, files) {
				files.forEach(function (fileName) {
//					console.log(fileName);

					callback(err, fileName);
				});
			});

			console.log('1.readData');
		},
		function filterFiles(fileName, callback) {
			fs.stat(fileName, function (err, stats) {
//				console.log(fileName + ' is file: ' + stats.isFile());

				if (stats.isFile()) {
					callback(err, fileName);
				}
			});

			console.log('2.filterFiles');

		},
		function doReplacement(fileName, callback) {
			fs.readFile(fileName, 'utf8', function (err, data) {
				var replacedText = data.replace(/a/g, 'b');

				callback(null, fileName, replacedText);
			});

			console.log('3.doReplacement');
		},
		function writeText(fileName, replacedText, callback) {
			var dataFileName = './data/' + fileName;

			fs.writeFile(dataFileName, replacedText, function (err) {
				log.write(fileName + ' => ' + dataFileName + ' has been written\n', function (err) {
					callback(err);
				});
			});

			console.log('4.writeText');
		}

	], function (err, result) {
		if (err) {
			throw err;
		}

		console.log('The last async callback has been executed.');
	});
}
catch (err) {
	console.log(err);
}