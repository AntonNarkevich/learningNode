(function testModule() {
	module.exports = function helloWorld() {
		console.log('Hello world');
	}

	module.exports.someFunction = function someFunction() {
		console.log('someFunction');
	}
}());