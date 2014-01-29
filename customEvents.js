var util = require('util');
var eventEmitter = require('events').EventEmitter;

function Timer() {
	var self = this;
	
	this.watch = function(interval) {	
		var counter = 0;
	
		setInterval(function() {
			self.emit('timer', counter);
			counter += 1;
		}, interval);
	};
}

util.inherits(Timer, eventEmitter);

var timer = new Timer();
timer.watch(100);

timer.on('timer', function(time) {
	console.log('Out timer event has been raised ' + time + ' time');
});
