/**
 * Created by anton.narkevich on 23.01.14.
 */

var fs = require('fs'),
	async = require('async');


/*async.map(['1.txt','2.txt','3.txt'], fs.stat, function(err, results){
	// results is now an array of stats for each file
	console.log(results);
});

async.filter(['1.txt','2.txt','3.txt'], fs.exists, function(results){
	// results now equals an array of the existing files
	console.log(results);

});*/

async.reduce([1,2,3], 0, function(memo, item, callback){
	// pointless async:
	process.nextTick(function(){
		callback(null, memo + item)
	});
}, function(err, result){
	// result is now equal to the last value of memo, which is 6
	console.log(result);
});

describe('', function() {
	
});

l