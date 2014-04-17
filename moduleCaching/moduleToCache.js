var invocationCounter = 0;

module.exports = { log: function () {
		invocationCounter += 1;

		console.log('The function has been invoked %d time.', invocationCounter);
	},
	set: function (value) {
		invocationCounter = value;
	}};