(function learningPath() {
	'use strict';

	var path = require('path');

	var badPath = '';

	console.log(path.normalize('\t    D:\\.././foo/bar/../bar/baz//what\t'));

	console.log(path.join('D:\\\\folder', './url/id/article'));

	console.log(path.resolve('makeMeAbsolute'));
	console.log(path.resolve('C:\\', 'anotherOne', 'folder'));

	console.log(path.relative('D:\\folder\\apopoider', 'D:\\folder\\shmolder'));

	console.log('Dirname: ' + __dirname);
	console.log(path.dirname(__dirname));
	console.log(path.dirname('D:\\asdf\\'));

	console.log(path.basename('D:\\asdf.xyz', '.xyz'));

	console.log(path.extname('D:\\folder\\file.html\\lastfile.xml'));

	console.log(path.sep);
	console.log(path.delimiter);
}());