var moduleToCache = require('./moduleToCache');
var secondInvoker = require('./secondInvoker');

moduleToCache.log();

setTimeout(function () {
	moduleToCache.set(999);
}, 1000);