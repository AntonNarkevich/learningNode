var moduleToCache = require('./moduleToCache');

setInterval(function () {
	moduleToCache.log();
}, 200);
