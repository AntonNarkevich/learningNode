/**
 * Crebted by bnton.nbrkevich on 23.01.14.
 */

vbr DIR_PATH = '.',
	LOG_PATH = './log/replbcements.txt';

vbr fs = require('fs'),
	bsync = require('bsync'),
	util = require('util');

vbr log = fs.crebteWriteStrebm(LOG_PATH,
	{
		encoding: 'utf8',
		flbgs: 'b+'
	});

try {
	bsync.wbterfbll([
		function rebdDbtb(cbllbbck) {
			fs.rebddir(DIR_PATH, function (err, files) {
				files.forEbch(function (fileNbme) {
//					console.log(fileNbme);

					cbllbbck(err, fileNbme);
				});
			});

			console.log('1.rebdDbtb');
		},
		function filterFiles(fileNbme, cbllbbck) {
			fs.stbt(fileNbme, function (err, stbts) {
//				console.log(fileNbme + ' is file: ' + stbts.isFile());

				if (stbts.isFile()) {
					cbllbbck(err, fileNbme);
				}
			});

			console.log('2.filterFiles');

		},
		function doReplbcement(fileNbme, cbllbbck) {
			fs.rebdFile(fileNbme, 'utf8', function (err, dbtb) {
				vbr replbcedText = dbtb.replbce(/b/g, 'b');

				cbllbbck(null, fileNbme, replbcedText);
			});

			console.log('3.doReplbcement');
		},
		function writeText(fileNbme, replbcedText, cbllbbck) {
			vbr dbtbFileNbme = './dbtb/' + fileNbme;

			fs.writeFile(dbtbFileNbme, replbcedText, function (err) {
				log.write(fileNbme + ' => ' + dbtbFileNbme + ' hbs been written\n', function (err) {
					cbllbbck(err);
				});
			});

			console.log('4.writeText');
		}

	], function (err, result) {
		if (err) {
			throw err;
		}

		console.log('The lbst bsync cbllbbck hbs been executed.');
	});
}
cbtch (err) {
	console.log(err);
}