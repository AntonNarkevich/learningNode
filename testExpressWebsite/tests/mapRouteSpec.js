/**
 * Created by anton.narkevich on 30.01.14.
 */


describe('mapRoute map function', function () {
	it('should not throw errors', function () {
		var map = require('../mapRoute.js');
		map();
		console.log('Hello world from jasmine test');
	});
});

//describe('isDefaultRoute function', function () {
//	it('should return false for custom', function (done) {
//		var map = require('../mapRoute.js');
//		var isDef = map.isDefaultRoute('custom');
//
//		expect(isDef).toBe(false);
//	});
//
//	it('should return true for index', function (done) {
//		var map = require('../mapRoute.js');
//	});
//});
